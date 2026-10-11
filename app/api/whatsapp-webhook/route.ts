import { NextRequest, NextResponse } from "next/server"
import crypto from "node:crypto"

// Webhook WhatsApp Business Cloud API per il pilota "modifiche via WhatsApp".
// Riceve i messaggi del titolare, li trasforma in una issue GitHub con la
// label "whatsapp-request" sul repo di questo stesso sito — da lì parte
// .github/workflows/claude-content-request.yml (vedi CLAUDE.md).
//
// Riceve messaggi SOLO dal numero in WHATSAPP_OWNER_PHONE (confronto
// sull'ultimo pezzo del wa_id, ignorando differenze di formattazione).
// Qualsiasi altro mittente viene ignorato silenziosamente (200 OK comunque:
// Meta si aspetta sempre un 200 rapido, altrimenti ritenta e/o disattiva il
// webhook).
//
// Variabili d'ambiente richieste (da impostare su Vercel):
// - WHATSAPP_VERIFY_TOKEN   stringa a scelta, usata nella verifica iniziale
//                           del webhook lato Meta (GET)
// - WHATSAPP_APP_SECRET     App Secret di Meta, per validare la firma
//                           X-Hub-Signature-256 di ogni richiesta POST
// - WHATSAPP_ACCESS_TOKEN   token per chiamare la Graph API (rispondere,
//                           scaricare i vocali)
// - WHATSAPP_PHONE_NUMBER_ID  id del numero business da cui rispondere
// - WHATSAPP_OWNER_PHONE    numero del titolare autorizzato a fare richieste
//                           (whitelist a una sola voce per questo pilota)
// - OPENAI_API_KEY          per la trascrizione dei vocali (Whisper)
// - GH_WEBHOOK_TOKEN        token GitHub (PAT) con permesso di creare issue
//                           su gofooditalia/villapensabene

const GITHUB_OWNER = "gofooditalia"
const GITHUB_REPO = "villapensabene"
const GRAPH_API_VERSION = "v21.0"

function normalizePhone(phone: string) {
  return phone.replace(/[^\d]/g, "")
}

function timingSafeEqualHex(a: string, b: string) {
  const bufA = Buffer.from(a, "hex")
  const bufB = Buffer.from(b, "hex")
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

function verifySignature(rawBody: string, signatureHeader: string | null, appSecret: string) {
  if (!signatureHeader?.startsWith("sha256=")) return false
  const expected = crypto.createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex")
  const provided = signatureHeader.slice("sha256=".length)
  return timingSafeEqualHex(expected, provided)
}

// GET: handshake di verifica richiesto da Meta quando configuri l'URL del
// webhook nel pannello sviluppatori.
export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode")
  const token = req.nextUrl.searchParams.get("hub.verify_token")
  const challenge = req.nextUrl.searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 })
  }
  return new NextResponse("Forbidden", { status: 403 })
}

interface WhatsAppMessage {
  from: string
  id: string
  timestamp: string
  type: string
  text?: { body: string }
  audio?: { id: string; mime_type: string }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  console.log("[whatsapp-webhook] richiesta POST ricevuta, lunghezza body:", rawBody.length)

  const appSecret = process.env.WHATSAPP_APP_SECRET
  const signatureHeader = req.headers.get("x-hub-signature-256")
  if (!appSecret || !verifySignature(rawBody, signatureHeader, appSecret)) {
    console.error(
      "[whatsapp-webhook] firma non valida.",
      "appSecret presente:", !!appSecret,
      "header presente:", !!signatureHeader,
      "lunghezza rawBody:", rawBody.length
    )
    return new NextResponse("Invalid signature", { status: 401 })
  }

  let payload: any
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return new NextResponse("Bad request", { status: 400 })
  }

  // Meta si aspetta un 200 rapido. Il lavoro vero lo facciamo prima di
  // rispondere perché il volume atteso è bassissimo (un solo cliente
  // pilota) — niente coda/background job per ora.
  try {
    const messages: WhatsAppMessage[] =
      payload?.entry?.[0]?.changes?.[0]?.value?.messages ?? []

    for (const message of messages) {
      await handleIncomingMessage(message)
    }
  } catch (err) {
    console.error("[whatsapp-webhook] errore nel processare il messaggio:", err)
    // Rispondiamo comunque 200: un errore nostro non deve far ritentare
    // Meta all'infinito lo stesso messaggio.
  }

  return new NextResponse("OK", { status: 200 })
}

async function handleIncomingMessage(message: WhatsAppMessage) {
  const ownerPhone = process.env.WHATSAPP_OWNER_PHONE
  if (!ownerPhone || normalizePhone(message.from) !== normalizePhone(ownerPhone)) {
    console.warn(`[whatsapp-webhook] messaggio ignorato da numero non autorizzato: ${message.from}`)
    return
  }

  let requestText: string | null = null

  if (message.type === "text" && message.text?.body) {
    requestText = message.text.body
  } else if (message.type === "audio" && message.audio?.id) {
    requestText = await transcribeVoiceNote(message.audio.id)
  }

  if (!requestText || !requestText.trim()) {
    await sendWhatsAppReply(
      message.from,
      "Non sono riuscito a leggere il messaggio (serve testo o un vocale). Puoi riprovare?"
    )
    return
  }

  const issueUrl = await createGithubIssue(requestText)
  await sendWhatsAppReply(
    message.from,
    `Ricevuto! Ho aperto una richiesta: ${issueUrl}\nTi avviso qui appena la modifica è pronta da approvare.`
  )
}

async function transcribeVoiceNote(mediaId: string): Promise<string | null> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
  const openaiKey = process.env.OPENAI_API_KEY
  if (!accessToken || !openaiKey) {
    console.error("[whatsapp-webhook] WHATSAPP_ACCESS_TOKEN o OPENAI_API_KEY mancanti")
    return null
  }

  // 1. Risolvi l'URL di download del media (scade dopo poco, va richiesto
  //    ogni volta, non va cacheato).
  const mediaInfoRes = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${mediaId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!mediaInfoRes.ok) {
    console.error("[whatsapp-webhook] impossibile risolvere il media:", await mediaInfoRes.text())
    return null
  }
  const mediaInfo = await mediaInfoRes.json()

  // 2. Scarica il file audio.
  const audioRes = await fetch(mediaInfo.url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!audioRes.ok) {
    console.error("[whatsapp-webhook] download audio fallito:", await audioRes.text())
    return null
  }
  const audioBlob = await audioRes.blob()

  // 3. Trascrivi con Whisper (OpenAI).
  const form = new FormData()
  form.append("file", audioBlob, "voice-note.ogg")
  form.append("model", "whisper-1")
  form.append("language", "it")

  const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${openaiKey}` },
    body: form,
  })
  if (!whisperRes.ok) {
    console.error("[whatsapp-webhook] trascrizione fallita:", await whisperRes.text())
    return null
  }
  const result = await whisperRes.json()
  return result.text ?? null
}

async function createGithubIssue(requestText: string): Promise<string> {
  const token = process.env.GH_WEBHOOK_TOKEN
  if (!token) throw new Error("GH_WEBHOOK_TOKEN mancante")

  const title = requestText.length > 70 ? `${requestText.slice(0, 67)}...` : requestText

  const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body: requestText,
      labels: ["whatsapp-request"],
    }),
  })

  if (!res.ok) {
    throw new Error(`Creazione issue GitHub fallita: ${res.status} ${await res.text()}`)
  }

  const issue = await res.json()
  return issue.html_url as string
}

async function sendWhatsAppReply(to: string, body: string) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!accessToken || !phoneNumberId) {
    console.error("[whatsapp-webhook] WHATSAPP_ACCESS_TOKEN o WHATSAPP_PHONE_NUMBER_ID mancanti, risposta non inviata")
    return
  }

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    }
  )
  if (!res.ok) {
    console.error("[whatsapp-webhook] invio risposta WhatsApp fallito:", await res.text())
  }
}
