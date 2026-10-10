# CLAUDE.md — Villa Pensabene (pilota "modifiche via WhatsApp")

Questo repo è il pilota di un sistema che permette al cliente (ristoratore) di
chiedere modifiche al sito via messaggio o vocale WhatsApp. Un agente apre una
PR, il titolare approva via WhatsApp, viene fatto il merge.

**Principio cardine: contenuti e codice sono separati.** L'agente che esegue
le richieste del cliente deve poter cambiare SOLO `data/site.config.ts`, mai
layout o logica.

> Stato (ottobre 2026): la migrazione è FATTA. Tutti i contenuti (orari,
> contatti, menu, promozioni, nav, SEO) vivono in `data/site.config.ts` e i
> componenti in `components/**`/`app/**` leggono da lì. Non esistono più
> testi/prezzi/link "di contenuto" scritti a mano nei componenti — se ne
> trovi uno, è un bug di questa migrazione, segnalalo, non aggiungerne altri.

## Cosa l'agente PUÒ modificare

- Esclusivamente `data/site.config.ts`.
- Dentro quel file, solo i VALORI dei campi previsti dai tipi già definiti
  (`SiteConfig` e i tipi correlati, in testa al file stesso). Mai aggiungere
  campi nuovi, mai cambiare la forma dei dati (es. trasformare una stringa in
  array), mai toccare le `interface`/`type` in testa al file, mai scrivere o
  modificare JSX.

## Cosa l'agente NON PUÒ MAI modificare

- Qualsiasi file sotto `components/**`, `app/**` (incluso `layout.tsx` e il
  JSON-LD generato), `styles/**`, `lib/**`.
- Le `interface`/`type` in `data/site.config.ts` (solo i valori sotto
  `export const siteConfig = {...}`).
- `package.json`, `pnpm-lock.yaml`, `next.config.mjs`, `tsconfig.json`,
  `vercel.json`, `.gitignore`, `components.json`.
- Qualsiasi asset binario (immagini, video) — le richieste che richiedono un
  nuovo media (es. "aggiungi questa foto alla galleria", "cambia il video
  del Giro Pizza") vanno segnalate per intervento umano, non gestite nella PR:
  il file del video/immagine deve già esistere in `public/` prima che un
  agente possa riferirlo da `data/site.config.ts`.
- `business.phone`, `business.whatsappNumber`, `business.vatNumber`: cambi
  qui sono troppo rischiosi per un agente automatico, anche se il cliente lo
  chiede esplicitamente — va sempre richiesta conferma umana fuori banda
  prima di aprire la PR.

## Come tradurre una richiesta cliente in modifica dati

1. Identifica quale area di `site.config.ts` riguarda la richiesta:
   `business`, `hours`, `sections`, `pizzaFormulas`, `fixedMenus`,
   `giroPasta`, `specialties`/`eventTypes`/`quickFeatures`,
   `seasonalFeatures`, `menu`, `reservationEventOptions`, `nav`, `seo`.
2. **Variazione temporanea di orario** (chiusura straordinaria, orario
   diverso per un giorno specifico): aggiorna ENTRAMBI i meccanismi, che
   non si generano a vicenda:
   - `hours.specialHours`: una entry per ogni giorno coinvolto, con
     `validFrom`/`validThrough` (stesso giorno se è un solo giorno),
     `opens`/`closes` (usa `"00:00"`/`"00:00"` per "chiuso tutto il giorno").
     Questo alimenta il JSON-LD per Google.
   - `hours.notice`: il banner visibile sul sito. `title`, `message` (testo
     naturale che riassume la variazione) e `until` (ISO con offset Roma,
     es. `+02:00` in estate / `+01:00` in inverno) — dopo quella data il
     banner si nasconde da solo. Imposta `notice: null` per togliere il
     banner prima della scadenza.
   Se dimentichi uno dei due, il sito e la scheda Google diranno cose
   diverse — è esattamente il tipo di drift che questa migrazione elimina,
   quindi è un errore grave in una PR, non un dettaglio.
3. **Variazione permanente di orario** (nuovo orario stabile): modifica
   `hours.regular` e aggiorna `hours.summaryText` e `hours.footerLines` in
   modo coerente (sono due rese testuali della stessa informazione, non si
   derivano l'una dall'altra).
4. **Disattivare temporaneamente una promozione/sezione** senza cancellarla
   (es. "togli il Giro Pasta per agosto"): metti `active: false` sull'oggetto
   in `pizzaFormulas` / `fixedMenus` / `giroPasta` / `seasonalFeatures`, o
   sulla `sections` corrispondente. Non eliminare l'oggetto dall'array: si
   riattiva rimettendo `active: true` in una PR futura, senza dover
   riscrivere il contenuto da zero (nel repo, prima della migrazione, ogni
   promo stagionale veniva aggiunta e rimossa a mano via commit — è
   esattamente quello che `active` evita).
5. **Nuovo piatto, nuovo prezzo, nuova voce di menu**: modifica
   `menu.categories` direttamente. Il prezzo resta una stringa già formattata
   (es. `"€9.50"`, `"€5.00/etto"`, `"€20.00/€32.00"` per un range) — rispetta
   esattamente lo stile del campo che stai modificando, non inventare un
   formato nuovo.
6. **Richiesta che introduce un concetto nuovo** non previsto dai tipi
   esistenti (nuovo tipo di promozione con una forma diversa, nuova sezione
   del sito, un campo che oggi non esiste) → NON improvvisare un campo o
   una struttura. Apri la PR/issue con la richiesta originale e una nota
   "richiede modifica di schema/layout, serve un dev", e fermati lì.
7. **Richiesta ambigua** (es. "cambia gli orari" senza dire quali) → non
   indovinare. La PR deve contenere una domanda di chiarimento per il
   titolare, oppure il chiarimento va richiesto via WhatsApp prima di aprire
   la PR.

## Formato e validazione

- Prezzi: stringa, nello stesso formato già usato nel campo specifico
  (non esiste un formato unico nel sito: `menu.categories` usa `"€X.XX"`,
  le promozioni in `pizzaFormulas`/`fixedMenus`/`giroPasta` usano
  `"X,XX€"`/`"X€"`). Copia il formato del valore che stai sostituendo.
- Date: ISO 8601 (`YYYY-MM-DD`, o con offset Roma `+01:00`/`+02:00` per i
  campi datetime) — mai formato italiano `gg/mm/aaaa`.
- Telefono/WhatsApp: E.164 senza spazi (`business.phone`), senza il `+`
  per `business.whatsappNumber` — comunque campi non modificabili
  dall'agente (vedi sopra).
- Testo libero (banner, descrizioni): italiano, tono informale-cordiale
  coerente con il resto del sito (uso misurato di emoji 🍕🍝🎉 come già
  presente). Maiuscolo urlato solo dove già presente (es. "APERTI",
  "CHIUSI" nel banner).
- `reservationEventOptions` è una lista indipendente dalle promozioni: non
  tutte le promo hanno un'opzione nel form di prenotazione e non tutte le
  opzioni del form corrispondono a una promo (es. "Cena / Menù alla Carta").
  Se una richiesta cliente riguarda il form di prenotazione, modifica questa
  lista direttamente, non dedurla da `pizzaFormulas`/`fixedMenus`.

## Ogni PR generata dall'agente deve

- Toccare solo `data/site.config.ts`.
- Avere nel titolo/descrizione la richiesta originale del cliente (testo o
  trascrizione del vocale) e il numero WhatsApp/issue di origine, per
  tracciabilità.
- Essere piccola e isolata: una richiesta cliente = una PR. Non accorpare
  richieste diverse arrivate in momenti diversi.
- Includere un link alla preview Vercel generata automaticamente sulla PR,
  così l'approvazione via WhatsApp si basa su qualcosa di visto, non sul
  diff grezzo.
- Passare `npx tsc --noEmit` prima di essere proposta: se il tipo non torna
  (es. hai scritto un numero dove serve una stringa, o hai rotto la forma di
  un array), il tipo in testa a `site.config.ts` lo intercetta subito.

## Note sul menu

Il menu mostrato su questo sito (`menu.categories`) è un sottoinsieme
promozionale. Il menu completo e aggiornato vive su GO!FoodMenu
(gofoodmenu.it/villa-pensabene-ristorante-pizzeria), piattaforma separata.
Le richieste cliente su "aggiungi/cambia un piatto nel menu del sito"
riguardano SOLO questo sottoinsieme. **Non è richiesta alcuna sincronizzazione
o trascrizione verso GO!FoodMenu**: i due menu restano indipendenti, per
scelta esplicita del titolare.
