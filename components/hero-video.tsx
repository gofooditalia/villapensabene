"use client"

import { useEffect, useRef } from "react"

/*
 * Video di sfondo dell'hero: scarica UNA sola versione (desktop o mobile)
 * in base alla larghezza dello schermo. Il poster è un'immagine normale
 * sotto al video, così la pagina mostra subito qualcosa.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const isDesktop = window.matchMedia("(min-width: 768px)").matches
    el.src = isDesktop ? "/bg-video.mp4" : "/bg-video-mobile.mp4"
    el.play().catch(() => {})
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
