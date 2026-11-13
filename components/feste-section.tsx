"use client"

import { useEffect, useState } from "react"
import { CalendarHeart, Wine, MessageCircle, Calendar } from "lucide-react"
import { siteConfig, type Festivity } from "@/data/site.config"
import { getVisibleFestivities } from "@/lib/site-helpers"

// Sezione "Feste": tutti i contenuti arrivano da data/site.config.ts
// (festivities). Per aggiungere un menu o una nuova festività NON modificare
// questo file: basta compilare/aggiungere una voce in festivities.items.
// Ogni scheda sparisce da sola dopo il proprio `hideAfter`.

// Avvisa il form di prenotazione (components/contact-section.tsx) di
// preselezionare evento, data e orario di questa festività.
function preselectReservation(festivity: Festivity) {
  if (!festivity.reservationValue) return
  window.dispatchEvent(
    new CustomEvent("vp:prenota", {
      detail: {
        event: festivity.reservationValue,
        date: festivity.date,
        time: festivity.reservationTimes?.[0] ?? "",
      },
    })
  )
}

function infoUrl(festivity: Festivity) {
  const text = `Ciao! Vorrei informazioni su: ${festivity.title} (${festivity.dateLabel}).`
  return `https://wa.me/${siteConfig.business.whatsappNumber}?text=${encodeURIComponent(text)}`
}

function FestivityWithMenus({ festivity }: { festivity: Festivity }) {
  return (
    <article className="rounded-3xl bg-[#fbf3e4] text-[#2a1a12] shadow-2xl overflow-hidden border border-[#deb054]/60">
      <header className="text-center px-6 pt-10 pb-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-[#8e1220] text-white px-5 py-1.5 text-sm font-bold uppercase tracking-wider shadow-md">
          <CalendarHeart size={16} /> {festivity.dateLabel}
        </p>
        <h3 className="font-serif text-3xl md:text-5xl font-bold mt-5 text-[#8e1220]">
          {festivity.title} {festivity.emoji}
        </h3>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-[#2a1a12]/75">
          {festivity.description}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 px-4 md:px-10 pb-8">
        {festivity.menus.map((menu) => (
          <div
            key={menu.id}
            className="relative rounded-2xl bg-white/70 border border-[#deb054]/50 p-6 md:p-8 flex flex-col"
          >
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#deb054]/50">
              <h4 className="font-serif text-2xl font-bold">{menu.title}</h4>
              <span className="shrink-0 rounded-full bg-[#8e1220] text-white px-5 py-1.5 font-bold text-xl shadow-md">
                {menu.price}
              </span>
            </div>
            <div className="space-y-5 flex-grow">
              {menu.courses.map((course) => (
                <div key={course.label}>
                  <h5 className="text-[#8e1220] font-bold uppercase tracking-widest text-xs mb-2">{course.label}</h5>
                  <ul className="space-y-1.5">
                    {course.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm md:text-[15px] leading-snug">
                        <span className="mt-[7px] w-1.5 h-1.5 shrink-0 rounded-full bg-[#deb054]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="px-6 pb-10 flex flex-col items-center gap-5">
        {festivity.drinksNote && (
          <p className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#2a1a12]/80 text-center">
            <Wine size={18} className="text-[#8e1220] shrink-0" /> {festivity.drinksNote}
          </p>
        )}
        <a
          href="#prenota"
          onClick={() => preselectReservation(festivity)}
          className="inline-flex items-center gap-3 rounded-full bg-[#8e1220] hover:bg-[#75101b] text-white px-8 py-4 text-lg font-bold shadow-xl transition-transform hover:scale-105 active:scale-95"
        >
          <Calendar size={20} /> Prenota il tuo tavolo
        </a>
      </footer>
    </article>
  )
}

function FestivityComingSoon({ festivity }: { festivity: Festivity }) {
  return (
    <article className="rounded-2xl bg-white/[0.07] border border-[#deb054]/40 p-6 md:p-8 text-center flex flex-col items-center backdrop-blur-sm">
      <span className="text-4xl mb-3" aria-hidden="true">
        {festivity.emoji}
      </span>
      <p className="text-[#deb054] font-bold uppercase tracking-widest text-xs mb-2">{festivity.dateLabel}</p>
      <h3 className="font-serif text-2xl font-bold text-white mb-3">{festivity.title}</h3>
      <p className="text-white/75 text-sm leading-relaxed mb-2">{festivity.description}</p>
      {festivity.comingSoonText && (
        <p className="text-white/60 text-sm leading-relaxed italic mb-6">{festivity.comingSoonText}</p>
      )}
      <a
        href={infoUrl(festivity)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 rounded-full border border-[#deb054] text-[#deb054] hover:bg-[#deb054] hover:text-[#3a0e0d] px-6 py-2.5 text-sm font-bold transition-colors"
      >
        <MessageCircle size={16} /> Chiedi informazioni
      </a>
    </article>
  )
}

export function FesteSection() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
  }, [])

  const festivities = siteConfig.festivities
  const visible = getVisibleFestivities(siteConfig, now)
  if (visible.length === 0) return null

  const withMenus = visible.filter((f) => f.menus.length > 0)
  const comingSoon = visible.filter((f) => f.menus.length === 0)

  return (
    <section
      id={festivities.sectionId}
      className="scroll-mt-20 relative py-20 text-white overflow-hidden"
      style={{ background: "linear-gradient(160deg, #6b1620 0%, #4a1210 55%, #3a0e0d 100%)" }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#deb054]/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#deb054]/10 blur-3xl pointer-events-none"
      />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#deb054] font-medium tracking-widest uppercase text-sm mb-2 block">
            {festivities.badge}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">{festivities.title}</h2>
          <div className="h-1 w-20 bg-[#deb054] mx-auto mb-6" />
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">{festivities.description}</p>
        </div>

        <div className="space-y-10 max-w-5xl mx-auto">
          {withMenus.map((festivity) => (
            <FestivityWithMenus key={festivity.id} festivity={festivity} />
          ))}
        </div>

        {comingSoon.length > 0 && (
          <div
            className={
              "grid gap-6 max-w-5xl mx-auto " +
              (comingSoon.length >= 3 ? "md:grid-cols-3" : comingSoon.length === 2 ? "md:grid-cols-2" : "max-w-md") +
              (withMenus.length > 0 ? " mt-10" : "")
            }
          >
            {comingSoon.map((festivity) => (
              <FestivityComingSoon key={festivity.id} festivity={festivity} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
