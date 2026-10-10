"use client"

import { useEffect, useState } from "react"
import { X, CalendarClock } from "lucide-react"
import { siteConfig } from "@/data/site.config"

// Avviso temporaneo per variazioni d'orario: definito in data/site.config.ts
// (hours.notice). Si nasconde da solo dopo `until` (ora di Roma): non serve
// ripubblicare il sito per toglierlo. Per un nuovo avviso aggiorna quel
// campo (o impostalo a null) — non modificare questo file.
const avviso = siteConfig.hours.notice

export function AvvisoOrari() {
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    if (avviso && new Date() < new Date(avviso.until)) setVisibile(true)
  }, [])

  if (!avviso || !visibile) return null

  return (
    <div
      role="status"
      className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md z-[60] flex items-start gap-3 rounded-2xl bg-accent text-accent-foreground shadow-2xl px-5 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <CalendarClock className="shrink-0 mt-0.5" size={22} />
      <div className="text-sm leading-snug">
        <p className="font-bold uppercase tracking-wide mb-1">{avviso.title}</p>
        <p>{avviso.message}</p>
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
