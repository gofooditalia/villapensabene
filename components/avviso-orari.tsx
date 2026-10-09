"use client"

import { useEffect, useState } from "react"
import { X, CalendarClock } from "lucide-react"

/*
 * Avviso temporaneo per variazioni d'orario.
 * Si nasconde da solo dopo la data `fino` (ora di Roma): non serve ripubblicare il sito per toglierlo.
 * Per un nuovo avviso: aggiorna `avviso` sotto (oppure imposta `avviso = null`).
 */
const avviso: { titolo: string; testo: string; fino: string } | null = {
  titolo: "Variazione orari questa settimana",
  testo: "Lunedì 12 ottobre siamo APERTI a cena · Martedì 13 ottobre CHIUSI per manutenzione straordinaria.",
  fino: "2026-10-14T00:00:00+02:00",
}

export function AvvisoOrari() {
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    if (avviso && new Date() < new Date(avviso.fino)) setVisibile(true)
  }, [])

  if (!avviso || !visibile) return null

  return (
    <div
      role="status"
      className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md z-[60] flex items-start gap-3 rounded-2xl bg-accent text-accent-foreground shadow-2xl px-5 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <CalendarClock className="shrink-0 mt-0.5" size={22} />
      <div className="text-sm leading-snug">
        <p className="font-bold uppercase tracking-wide mb-1">{avviso.titolo}</p>
        <p>{avviso.testo}</p>
      </div>
      <button
        onClick={() => setVisibile(false)}
        aria-label="Chiudi avviso"
        className="shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  )
}
