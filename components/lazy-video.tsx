"use client"

import { useEffect, useRef, useState } from "react"

type LazyVideoProps = {
  src: string
  poster: string
  /** proporzioni del video, es. "4/5" o "16/9": riserva lo spazio prima del caricamento */
  aspect: string
  className?: string
  controls?: boolean
}

/*
 * Video che non scarica nulla finché non si avvicina allo schermo:
 * - a ~800px di distanza carica il poster
 * - quando è visibile carica il video e lo fa partire
 * - quando esce dallo schermo si mette in pausa
 */
export function LazyVideo({ src, poster, aspect, className, controls = true }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [showPoster, setShowPoster] = useState(false)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPoster(true)
          near.disconnect()
        }
      },
      { rootMargin: "800px 0px" },
    )

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: "100px 0px" },
    )

    near.observe(el)
    visible.observe(el)
    return () => {
      near.disconnect()
      visible.disconnect()
    }
  }, [])

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={showPoster ? poster : undefined}
      preload="none"
      muted
      loop
      playsInline
      controls={controls}
      style={{ aspectRatio: aspect }}
      className={className}
    />
  )
}
