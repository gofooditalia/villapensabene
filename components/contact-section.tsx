"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail } from "lucide-react"
import { siteConfig } from "@/data/site.config"
import { isFestivityVisible, isPromoActive } from "@/lib/site-helpers"

const DEFAULT_TIMES = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"]

export function ContactSection() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
  }, [])

  const festivities = siteConfig.festivities.active ? siteConfig.festivities.items : []

  const visibleEventOptions = siteConfig.reservationEventOptions.filter((option) => {
    if (!option.relatedPromoId) return true
    // Voce legata a una festività: sparisce quando la festività è passata.
    const festivity = siteConfig.festivities.items.find((f) => f.id === option.relatedPromoId)
    if (festivity) return siteConfig.festivities.active && isFestivityVisible(festivity, now)
    return isPromoActive(siteConfig, option.relatedPromoId)
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    date: "",
    time: "",
    guests: "2 persone",
    exactGuests: "",
    hasChildren: "NO",
    childrenCount: "",
    message: "",
  })

  // Se l'evento scelto è una festività con orari propri (es. un pranzo), il
  // form propone quelli al posto degli orari serali standard.
  const selectedFestivity = festivities.find((f) => f.reservationValue && f.reservationValue === formData.event)
  const timeOptions = selectedFestivity?.reservationTimes?.length ? selectedFestivity.reservationTimes : DEFAULT_TIMES

  // Il tasto "Prenota" di una scheda della sezione Feste preseleziona qui
  // evento, data e orario (vedi components/feste-section.tsx).
  useEffect(() => {
    const onPreselect = (e: Event) => {
      const detail = (e as CustomEvent<{ event?: string; date?: string; time?: string }>).detail
      if (!detail?.event) return
      setFormData((prev) => ({
        ...prev,
        event: detail.event ?? prev.event,
        date: detail.date ?? prev.date,
        time: detail.time ?? prev.time,
      }))
    }
    window.addEventListener("vp:prenota", onPreselect)
    return () => window.removeEventListener("vp:prenota", onPreselect)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => {
      const next = { ...prev, [id]: value }
      if (id === "event") {
        // Cambiando evento, l'orario scelto potrebbe non essere più tra quelli proposti.
        const festivity = festivities.find((f) => f.reservationValue && f.reservationValue === value)
        const times = festivity?.reservationTimes?.length ? festivity.reservationTimes : DEFAULT_TIMES
        if (!times.includes(next.time)) next.time = ""
        if (festivity) next.date = festivity.date
      }
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, date, time, guests, exactGuests, message, phone, hasChildren, childrenCount, event } = formData

    const finalGuests = guests === "5+ persone" && exactGuests ? `${exactGuests} persone` : guests
    const childrenInfo = hasChildren === "SI" && childrenCount ? `\nBambini: ${childrenCount}` : ""

    const whatsappMessage = `Prenotazione Tavolo - Villa Pensabene
-------------------------
Nome: ${name}
Formula: ${event}
Data: ${date}
Ora: ${time}
Ospiti Adulti: ${finalGuests}${childrenInfo}
Telefono Cliente: ${phone}
-------------------------
Allergie/Note: ${message || "Nessuna segnalazione"}`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/${siteConfig.business.whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="prenota" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Prenota un Tavolo</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {"Assicurati il tuo posto in Villa per una serata indimenticabile. Riceverai conferma immediata su WhatsApp."}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Reservation Form */}
          <Card className="p-8 bg-card shadow-xl border border-border/50">
            <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">Modulo di Prenotazione</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* ... form fields remain same ... */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Nome e Cognome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  placeholder="Mario Rossi"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  placeholder="mario.rossi@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                  Telefono
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  placeholder="+39 123 456 7890"
                />
              </div>
              <div>
                <label htmlFor="event" className="block text-sm font-medium mb-2 text-foreground">
                  Servizio / Evento
                </label>
                <select
                  id="event"
                  required
                  value={formData.event}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                >
                  <option value="" disabled>Indica motivo della visita</option>
                  {visibleEventOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2 text-foreground">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-2 text-foreground">
                    Orario
                  </label>
                  <select
                    id="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  >
                    <option value="" disabled>Seleziona orario</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={formData.guests === "5+ persone" ? "grid grid-cols-2 gap-4" : ""}>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-2 text-foreground">
                    Numero Ospiti (Adulti)
                  </label>
                  <select
                    id="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  >
                    <option value="1 persona">1 persona</option>
                    <option value="2 persone">2 persone</option>
                    <option value="3 persone">3 persone</option>
                    <option value="4 persone">4 persone</option>
                    <option value="5+ persone">5+ persone</option>
                  </select>
                </div>
                {formData.guests === "5+ persone" && (
                  <div className="animate-in fade-in zoom-in slide-in-from-left-2 duration-300">
                    <label htmlFor="exactGuests" className="block text-sm font-medium mb-2 text-accent">
                      Specificare Numero *
                    </label>
                    <input
                      type="number"
                      id="exactGuests"
                      min="5"
                      required
                      value={formData.exactGuests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-accent/5 text-foreground"
                      placeholder="Es: 8"
                    />
                  </div>
                )}
              </div>
              <div className={formData.hasChildren === "SI" ? "grid grid-cols-2 gap-4" : ""}>
                <div>
                  <label htmlFor="hasChildren" className="block text-sm font-medium mb-2 text-foreground">
                    Ci sono bambini?
                  </label>
                  <select
                    id="hasChildren"
                    value={formData.hasChildren}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  >
                    <option value="NO">No</option>
                    <option value="SI">Sì</option>
                  </select>
                </div>
                {formData.hasChildren === "SI" && (
                  <div className="animate-in fade-in zoom-in slide-in-from-left-2 duration-300">
                    <label htmlFor="childrenCount" className="block text-sm font-medium mb-2 text-accent">
                      Quanti bambini? *
                    </label>
                    <input
                      type="number"
                      id="childrenCount"
                      min="1"
                      required
                      value={formData.childrenCount}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-accent/5 text-foreground"
                      placeholder="Es: 2"
                    />
                  </div>
                )}
              </div>
              {formData.hasChildren === "SI" && (() => {
                const adults = formData.guests === "5+ persone"
                  ? (parseInt(formData.exactGuests) || 0)
                  : (parseInt(formData.guests) || 0)
                const children = parseInt(formData.childrenCount) || 0
                const total = adults + children
                return (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex items-center justify-between gap-3 px-4 py-3 bg-accent/5 border border-accent/20 rounded-md text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span>👨‍👩‍👧 <strong className="text-foreground">{adults}</strong> adult{adults === 1 ? "o" : "i"}</span>
                      <span>+</span>
                      <span>🧒 <strong className="text-foreground">{children}</strong> bambin{children === 1 ? "o" : "i"}</span>
                    </div>
                    <div className="text-accent font-bold whitespace-nowrap">
                      Totale: {total} ospiti
                    </div>
                  </div>
                )
              })()}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Intolleranze, Allergie o Note Aggiuntive
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
                  placeholder="Segnalaci eventuali allergie, intolleranze o richieste speciali (es. seggiolone)..."
                />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Invia Prenotazione su WhatsApp
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

