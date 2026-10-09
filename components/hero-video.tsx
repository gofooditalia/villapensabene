"use client"

import { useEffect, useRef } from "react"

/*
 * Video di sfondo dell'hero.
 * - Scarica UNA sola versione (desktop o mobile) in base alla larghezza dello schermo.
 * - Parte solo dopo che la pagina è stata caricata, così non rallenta il primo caricamento.
 * - Con connessioni lente o "risparmio dati" non scarica il video e resta l'immagine.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }).connection
    if (conn?.saveData || ["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "")) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const start = () => {
      timer = setTimeout(() => {
        const isDesktop = window.matchMedia("(min-width: 768px)").matches
        el.src = isDesktop ? "/bg-video.mp4" : "/bg-video-mobile.mp4"
        el.play().catch(() => {})
      }, 1200)
    }

    if (document.readyState === "complete") start()
    else window.addEventListener("load", start, { once: true })

    return () => {
      window.removeEventListener("load", start)
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <picture>
        <source media="(min-width: 768px)" srcSet="/posters/bg-video.jpg" />
        <img
          src="/posters/bg-video-mobile.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </>
  )
}
