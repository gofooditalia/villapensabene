"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/data/site.config"
import { getVisibleFestivities, isFestiveDecorOn } from "@/lib/site-helpers"

// Addobbi natalizi della testata: neve leggera + richiamo alla sezione Feste.
// Si accendono/spengono da data/site.config.ts (festivities.decorActive e
// festivities.decorUntil): non serve toccare questo file a fine feste.

// Posizioni fisse (niente Math.random: stesso risultato a ogni caricamento).
const FLAKES = [
  { left: 4, size: 10, duration: 14, delay: 0 },
  { left: 11, size: 16, duration: 19, delay: 6 },
  { left: 19, size: 9, duration: 12, delay: 3 },
  { left: 27, size: 14, duration: 17, delay: 9 },
  { left: 35, size: 11, duration: 15, delay: 1 },
  { left: 43, size: 18, duration: 21, delay: 7 },
  { left: 51, size: 10, duration: 13, delay: 4 },
  { left: 59, size: 15, duration: 18, delay: 11 },
  { left: 67, size: 9, duration: 12, delay: 2 },
  { left: 75, size: 17, duration: 20, delay: 8 },
  { left: 83, size: 12, duration: 16, delay: 5 },
  { left: 91, size: 14, duration: 18, delay: 10 },
  { left: 96, size: 10, duration: 14, delay: 12 },
]

function useNow() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
  }, [])
  return now
}

export function FestiveSnow() {
  const now = useNow()
  // Solo dopo il mount: la neve è puro abbellimento, non serve nell'HTML iniziale.
  if (!now || !isFestiveDecorOn(siteConfig, now)) return null

  return (
    <div aria-hidden="true" className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      {FLAKES.map((flake, i) => (
        <span
          key={i}
          className="vp-snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `-${flake.delay}s`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  )
}

export function FestiveHeroCta() {
  const now = useNow()
  if (!isFestiveDecorOn(siteConfig, now)) return null
  if (getVisibleFestivities(siteConfig, now).length === 0) return null

  return (
    <div className="mb-8 flex justify-center">
      <a
        href={`#${siteConfig.festivities.sectionId}`}
        className="inline-flex items-center gap-2 rounded-full bg-[#8e1220] hover:bg-[#75101b] border border-[#deb054]/70 text-white px-6 py-3 text-base md:text-lg font-bold shadow-2xl transition-transform hover:scale-105 active:scale-95"
      >
        {siteConfig.festivities.heroCtaLabel}
      </a>
    </div>
  )
}
