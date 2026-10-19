import { NextRequest, NextResponse } from "next/server"
import crypto from "node:crypto"

// Webhook Telegram Bot API per il pilota "modifiche via messaggio".
// Secondo canale d'ingresso, parallelo a app/api/whatsapp-webhook/route.ts:
// stessa pipeline a valle (issue GitHub → .github/workflows/claude-content-request.yml
// → notifica finale), cambia solo il canale. Nato perché l'invio su WhatsApp
// è bloccato finché Meta non approva il nome visualizzato del numero
// (errore 131037); Telegram non richiede approvazioni.
//
// Riceve richieste SOLO dagli utenti in TELEGRAM_OWNER_IDS (whitelist di ID
// utente Telegram numerici). A un utente non autorizzato il bot risponde
// con il suo ID: serve in fase di setup per sapere quale ID aggiungere alla
// whitelist, e non espone nulla oltre all'ID dell'utente stesso.
//
// Variabili d'ambiente richieste (da impostare su Vercel):
// - TELEGRAM_BOT_TOKEN       token del bot, da @BotFather
// - TELEGRAM_WEBHOOK_SECRET  stringa a scelta (solo A-Z a-z 0-9 _ -), passata
//                            come secret_token a setWebhook: Telegram la
//                            rimanda in ogni richiesta nell'header
//                            X-Telegram-Bot-Api-Secret-Token
// - TELEGRAM_OWNER_IDS       ID utente autorizzati, separati da virgola
// - OPENAI_API_KEY           per la trascrizione dei vocali (Whisper)
// - GH_WEBHOOK_TOKEN         token GitHub (PAT) con permesso di creare issue

const GITHUB_OWNER = "gofooditalia"
const GITHUB_REPO = "villapensabene"

interface TelegramMessage {
  message_id: number
  from?: { id: number; first_name?: string }
  chat: { id: number; type: string }
  text?: string
  voice?: { file_id: string; mime_type?: string }
  audio?: { file_id: string; mime_type?: string }
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export async function POST(req: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  const provided = req.headers.get("x-telegram-bot-api-secret-token") ?? ""
  if (!secret || !safeEqual(secret, provided)) {
    console.error("[telegram-webhook] secret non valido. secret configurato:", !!secret)
    return new NextResponse("Unauthorized", { status: 401 })
  }

  let update: any
  try {
    update = await req.json()
  } catch {
    return new NextResponse("Bad request", { status: 400 })
  }

  // Telegram ritenta finché non riceve 200: un errore nostro non deve
  // generare richieste duplicate, quindi rispondiamo sempre 200.
  try {
    const message: TelegramMessage | undefined = update?.message
    if (message) await handleIncomingMessage(message)
  } catch (err) {
    console.error("[telegram-webhook] errore nel processare il messaggio:", err)
  }

  return new NextResponse("OK", { status: 200 })
}

function getAuthorizedIds(): string[] {
  return (process.env.TELEGRAM_OWNER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter((id) => /^\d+$/.test(id))
}

async function handleIncomingMessage(message: TelegramMessage) {
  // Solo chat private: in un gruppo chiunque potrebbe scrivere al bot.
  if (message.chat.type !== "private" || !message.from) return

  const userId = String(message.from.id)
  const chatId = message.chat.id

  if (!getAuthorizedIds().includes(userId)) {
    console.warn(`[telegram-webhook] messaggio ignorato da utente non autorizzato: ${userId}`)
    await sendTelegramReply(
      chatId,
      `Questo bot è riservato. Il tuo ID Telegram è ${userId}: comunicalo a chi gestisce il sito per essere abilitato.`
    )
    return
  }

  if (message.text?.startsWith("/start")) {
    await sendTelegramReply(
      chatId,
      "Ciao! 👋 Ti aiuto a cambiare il sito villapensabene.it. Scrivimi o mandami un vocale con la modifica che vuoi. Es: 'cambia il prezzo della Margherita a 9 euro'"
    )
    return
  }

  let requestText: string | null = null
  if (message.text) {
    requestText = message.text
  } else {
    const fileId = message.voice?.file_id ?? message.audio?.file_id
    if (fileId) requestText = await transcribeVoiceNote(fileId)
  }

  if (!requestText || !requestText.trim()) {
    await sendTelegramReply(
      chatId,
      "Non sono riuscito a leggere il messaggio (serve testo o un vocale). Puoi riprovare?"
    )
    return
  }

  await createGithubIssue(requestText, chatId)
  await sendTelegramReply(chatId, "Ricevuto! ✅ Ci sto lavorando, ti avviso appena è pronta 🙂")
}

async function transcribeVoiceNote(fileId: string): Promise<string | null> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const openaiKey = process.env.OPENAI_API_KEY
  if (!botToken || !openaiKey) {
    console.error("[telegram-webhook] TELEGRAM_BOT_TOKEN o OPENAI_API_KEY mancanti")
    return null
  }

  // 1. Risolvi il percorso del file sui server Telegram.
  const fileRes = await fetch(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${encodeURIComponent(fileId)}`
  )
  const fileInfo = await fileRes.json().catch(() => null)
  if (!fileRes.ok || !fileInfo?.ok || !fileInfo.result?.file_path) {
    console.error("[telegram-webhook] getFile fallito:", JSON.stringify(fileInfo))
    return null
  }

  // 2. Scarica l'audio (i vocali Telegram sono OGG/Opus, accettati da Whisper).
  const audioRes = await fetch(
    `https://api.telegram.org/file/bot${botToken}/${fileInfo.result.file_path}`
  )
  if (!audioRes.ok) {
    console.error("[telegram-webhook] download audio fallito:", audioRes.status)
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
    console.error("[telegram-webhook] trascrizione fallita:", await whisperRes.text())
    return null
  }
  const result = await whisperRes.json()
  return result.text ?? null
}

async function createGithubIssue(requestText: string, chatId: number) {
  const token = process.env.GH_WEBHOOK_TOKEN
  if (!token) throw new Error("GH_WEBHOOK_TOKEN mancante")

  const title = requestText.length > 70 ? `${requestText.slice(0, 67)}...` : requestText

  // Come per WhatsApp: l'ID della chat va in una label, non nel corpo, così
  // la Action sa a chi rispondere senza che finisca nel testo per Claude.
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
      labels: ["telegram-request", `tg-sender-${chatId}`],
    }),
  })

  if (!res.ok) {
    throw new Error(`Creazione issue GitHub fallita: ${res.status} ${await res.text()}`)
  }
}

async function sendTelegramReply(chatId: number, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  if (!botToken) {
    console.error("[telegram-webhook] TELEGRAM_BOT_TOKEN mancante, risposta non inviata")
    return
  }

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
  if (!res.ok) {
    console.error("[telegram-webhook] invio risposta Telegram fallito:", await res.text())
  }
}
