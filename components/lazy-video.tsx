"use client"

import { useEffect, useRef, useState } from "react"

type LazyVideoProps = {
  src: string
  poster: string
  className?: string
  controls?: boolean
}

/*
 * Video che si scarica solo quando sta per entrare nello schermo
 * e si mette in pausa quando esce. Fino ad allora mostra solo il poster.
 */
export function LazyVideo({ src, poster, className, controls = true }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      controls={controls}
      className={className}
    />
  )
}
