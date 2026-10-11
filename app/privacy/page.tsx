import type { Metadata } from "next"
import { siteConfig } from "@/data/site.config"

export const metadata: Metadata = {
  title: `Informativa sulla Privacy | ${siteConfig.business.name}`,
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  const { business } = siteConfig

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold mb-8 text-foreground">Informativa sulla Privacy</h1>

        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Titolare del trattamento</h2>
            <p>
              {business.legalName}, con sede in {business.address.street}, {business.address.postalCode}{" "}
              {business.address.city} ({business.address.region}), Italia — P.IVA {business.vatNumber}.
              Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile scrivere a{" "}
              <a href={`mailto:${business.email}`} className="text-accent hover:underline">
                {business.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Dati raccolti tramite il sito web</h2>
            <p>
              Il sito {business.name} raccoglie dati di utilizzo in forma aggregata e anonima tramite Vercel
              Analytics, al solo scopo di comprendere come viene usato il sito (pagine visitate, provenienza del
              traffico) e migliorarne il funzionamento. Non vengono utilizzati cookie di profilazione pubblicitaria
              di terze parti. I dati inseriti volontariamente nel modulo di prenotazione (nome, contatti, dettagli
              della richiesta) vengono trasmessi direttamente su WhatsApp al numero del ristorante tramite il link
              generato dal modulo stesso: non sono conservati su questo sito.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">
              Dati raccolti tramite WhatsApp Business
            </h2>
            <p>
              {business.name} utilizza WhatsApp Business Platform per comunicare con i propri clienti e per
              ricevere, da personale autorizzato del ristorante, richieste di aggiornamento dei contenuti del sito
              (ad esempio variazioni di orario o del menu). I messaggi WhatsApp inviati al numero business vengono
              trattati esclusivamente per rispondere alla richiesta del mittente e, quando pertinente, per
              aggiornare i contenuti pubblici del sito. Solo i numeri di telefono espressamente autorizzati dal
              titolare possono attivare un aggiornamento automatico dei contenuti; i messaggi da altri numeri non
              producono alcuna azione automatica sul sito.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Conservazione dei dati</h2>
            <p>
              I dati sono conservati per il tempo necessario a gestire la richiesta o la conversazione e, per gli
              aspetti amministrativi e fiscali, per i termini previsti dalla normativa vigente.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground">Diritti dell'interessato</h2>
            <p>
              In qualsiasi momento è possibile esercitare i diritti previsti dal Regolamento (UE) 2016/679 (GDPR) —
              accesso, rettifica, cancellazione, limitazione, portabilità e opposizione al trattamento — scrivendo a{" "}
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
