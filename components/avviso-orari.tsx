"use client"

import { useEffect, useState } from "react"
import { X, CalendarClock } from "lucide-react"
import { siteConfig } from "@/data/site.config"

// Avvisi temporanei per variazioni d'orario: definiti in data/site.config.ts
// (hours.notices, un array). Ognuno si nasconde da solo dopo il proprio
// `until` (ora di Roma): non serve ripubblicare il sito per toglierlo. Per
// un nuovo avviso AGGIUNGI una entry con un id nuovo — più avvisi possono
// coesistere, impilati — non modificare questo file.
const avvisi = siteConfig.hours.notices

export function AvvisoOrari() {
  const [dismissedIds, setDismissedIds] = useState<string[]>([])
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
  }, [])

  if (!now) return null

  const visibili = avvisi.filter((avviso) => now < new Date(avviso.until) && !dismissedIds.includes(avviso.id))

  if (visibili.length === 0) return null

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md z-[60] flex flex-col gap-3">
      {visibili.map((avviso) => (
        <div
          key={avviso.id}
          role="status"
          className="flex items-start gap-3 rounded-2xl bg-accent text-accent-foreground shadow-2xl px-5 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <CalendarClock className="shrink-0 mt-0.5" size={22} />
          <div className="text-sm leading-snug">
            <p className="font-bold uppercase tracking-wide mb-1">{avviso.title}</p>
            <p>{avviso.message}</p>
          </div>
          <button
            onClick={() => setDismissedIds((prev) => [...prev, avviso.id])}
            aria-label="Chiudi avviso"
            className="shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  )
}
