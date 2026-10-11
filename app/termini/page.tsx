import type { Metadata } from "next"
import { siteConfig } from "@/data/site.config"

export const metadata: Metadata = {
  title: `Condizioni d'Uso | ${siteConfig.business.name}`,
  robots: { index: true, follow: true },
}

export default function TerminiPage() {
  const { business } = siteConfig

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold mb-8 text-foreground">Condizioni d'Uso</h1>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <p>
              Il presente sito e il relativo canale WhatsApp Business sono gestiti da {business.legalName}, P.IVA{" "}
              {business.vatNumber}, con sede in {business.address.street}, {business.address.postalCode}{" "}
              {business.address.city} ({business.address.region}), Italia.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Finalità del sito</h2>
            <p>
              Il sito fornisce informazioni sul ristorante {business.name} (menu, orari, eventi) e consente di
              inviare richieste di prenotazione tramite un modulo che genera un messaggio WhatsApp verso il numero
              del ristorante. L'invio del modulo non costituisce conferma di prenotazione: la conferma avviene
              tramite risposta diretta del ristorante su WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Canale WhatsApp Business</h2>
            <p>
              Il numero WhatsApp Business del ristorante viene utilizzato per comunicare con i clienti e, per il
              personale autorizzato del ristorante, per richiedere aggiornamenti ai contenuti del sito. L'uso del
              canale è riservato a comunicazioni pertinenti al servizio del ristorante; {business.name} si riserva
              di non dare seguito a messaggi non pertinenti o abusivi.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Contenuti del sito</h2>
            <p>
              Menu, prezzi, orari ed eventi pubblicati sul sito possono variare senza preavviso. Il menu
              completo e aggiornato è disponibile anche sulla piattaforma di ordinazione collegata, linkata dal
              sito.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Contatti</h2>
            <p>
              Per qualsiasi domanda relativa a queste condizioni d'uso:{" "}
              <a href={`mailto:${business.email}`} className="text-accent hover:underline">
                {business.email}
              </a>
              .
            </p>
          </section>

          <section>
            <p className="text-sm text-foreground/60 italic">Ultimo aggiornamento: ottobre 2026.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
