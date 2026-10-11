// Dati del sito Villa Pensabene. Questo è l'UNICO file che un agente di
// modifica contenuti (es. il pilota "modifiche via WhatsApp") può toccare.
// Vedi CLAUDE.md per le regole su cosa può e non può essere cambiato qui.
//
// Nessun componente in components/** o app/** dovrebbe contenere testo,
// prezzi, orari o link "di contenuto" scritti a mano: tutto passa da qui.

export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

export interface RegularHours {
  days: Weekday[]
  opens: string // "HH:MM"
  closes: string // "HH:MM"
}

export interface SpecialHours {
  id: string
  validFrom: string // "YYYY-MM-DD"
  validThrough: string // "YYYY-MM-DD"
  opens: string // "HH:MM" ("00:00"-"00:00" = chiuso tutto il giorno
  closes: string
}

export interface HoursNotice {
  id: string
  title: string
  message: string
  until: string // ISO datetime con offset Roma; il banner si nasconde da solo dopo questa data
}

export interface Hours {
  regular: RegularHours[]
  closedWeekday: Weekday
  summaryText: string
  footerLines: string[]
  // Variazioni per Google (JSON-LD). Aggiornare insieme a `notices` quando si
  // comunica una variazione temporanea: non sono generate l'una dall'altra.
  specialHours: SpecialHours[]
  // Banner visibili sul sito, impilati. Più avvisi possono coesistere: per
  // aggiungerne uno nuovo, AGGIUNGI una entry con un id nuovo, non
  // sovrascrivere quelle esistenti (potrebbero riguardare un'altra data e
  // non essere ancora scadute). Ogni avviso si nasconde da solo dopo `until`
  // — non serve rimuoverlo manualmente quando scade, ma è pulito togliere
  // quelli ormai scaduti da tempo in una PR successiva.
  notices: HoursNotice[]
}

export interface Business {
  name: string
  legalName: string
  phone: string // E.164, es. "+393274146546"
  phoneDisplay: string // "327 414 6546"
  whatsappNumber: string // senza "+", per i link wa.me
  email: string
  vatNumber: string
  address: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  directionsUrl: string
  googleProfileUrl: string
  socials: {
    facebook: string
    instagram: string
    tiktok: string
    tripadvisor: string
  }
}

export interface Section {
  id: string
  kicker?: string
  badge?: string
  title: string
  description?: string
  video?: string
  poster?: string
  active: boolean
}

export interface PizzaFormula {
  id: string
  sectionId: string
  title: string
  price: string
  antipasti: string[]
  antipastiNote?: string
  pizzaDescription: string
  bevande: string[]
  active: boolean
}

export interface FixedMenu {
  id: string
  sectionId: string
  title: string
  subtitle: string
  price: string
  courses: { count: number; label: string }[]
  note: string
  active: boolean
}

export interface GiroPasta {
  id: string
  sectionId: string
  antipasti: string[]
  primiHeading: string
  primi: string[]
  conditions: { id: string; value: string; label: string; sublabel?: string }[]
  active: boolean
}

export interface FeatureItem {
  id: string
  title: string
  // Se presente, questo elemento sparisce automaticamente quando la promo
  // con questo id ha active:false (vedi isPromoActive in lib/site-helpers.ts).
  // Usalo SOLO quando l'elemento rappresenta letteralmente quella promo
  // (es. il chip "Giro Pasta - 20€" sotto Pranzo Domenica); le voci generiche
  // (es. le icone "specialties") restano indipendenti di proposito.
  relatedPromoId?: string
}

export interface SeasonalFeature {
  id: string
  sectionId: string
  badge: string
  title: string
  lead: string
  description: string
  highlights: { emoji: string; title: string; description: string }[]
  video: string
  poster: string
  ctaLabel: string
  footerNote: string
  active: boolean
}

export interface MenuItem {
  name: string
  price: string
  description?: string
}

export interface MenuCategory {
  title: string
  items: MenuItem[]
}

export interface ReservationEventOption {
  value: string
  label: string
  // Stesso meccanismo di FeatureItem.relatedPromoId: se la promo collegata
  // ha active:false, questa opzione sparisce dal form di prenotazione.
  // Non tutte le opzioni hanno (o devono avere) una promo collegata.
  relatedPromoId?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface Seo {
  siteUrl: string
  title: string
  description: string
  ogDescription: string
  twitterDescription: string
  ogImage: string
  ogImageAlt: string
  cuisine: string[]
  priceRange: string
}

export interface SiteConfig {
  business: Business
  hours: Hours
  sections: Section[]
  pizzaFormulas: PizzaFormula[]
  fixedMenus: FixedMenu[]
  giroPasta: GiroPasta
  quickFeatures: FeatureItem[]
  specialties: FeatureItem[]
  eventTypes: FeatureItem[]
  seasonalFeatures: SeasonalFeature[]
  menu: {
    categories: MenuCategory[]
    fullMenuUrl: string
  }
  reservationEventOptions: ReservationEventOption[]
  nav: NavLink[]
  seo: Seo
}

export const siteConfig: SiteConfig = {
  business: {
    name: "Villa Pensabene Ristorante Pizzeria",
    legalName: "Villa Pensabene - Ristorante Pizzeria",
    phone: "+393274146546",
    phoneDisplay: "327 414 6546",
    whatsappNumber: "393274146546",
    email: "villapensabeneristorante@gmail.com",
    vatNumber: "IT06636480821",
    address: {
      street: "Via P.40, 29",
      city: "Palermo",
      region: "PA",
      postalCode: "90146",
      country: "IT",
    },
    directionsUrl: "https://maps.app.goo.gl/ErK4fypQzfVWmpL1A",
    googleProfileUrl: "https://maps.app.goo.gl/99hroLSAfosUnoku6",
    socials: {
      facebook: "https://www.facebook.com/villapensabeneristorante/",
      instagram: "https://www.instagram.com/villapensabene/",
      tiktok: "https://www.tiktok.com/@villa.pensabene.r",
      tripadvisor:
        "https://www.tripadvisor.it/Restaurant_Review-g187890-d3457272-Reviews-Villa_Pensabene_Ristorante_Pizzeria-Palermo_Province_of_Palermo_Sicily.html",
    },
  },

  hours: {
    regular: [
      { days: ["tuesday", "wednesday", "thursday", "friday", "saturday"], opens: "16:00", closes: "00:00" },
      { days: ["sunday"], opens: "12:30", closes: "00:00" },
    ],
    closedWeekday: "monday",
    summaryText: "Aperti tutti i giorni a cena, la domenica anche a pranzo. Chiusura settimanale: lunedì.",
    footerLines: ["Tutti i giorni a cena", "Domenica anche a pranzo", "Chiusura settimanale: lunedì"],
    specialHours: [
      { id: "2026-10-12", validFrom: "2026-10-12", validThrough: "2026-10-12", opens: "16:00", closes: "00:00" },
      { id: "2026-10-13", validFrom: "2026-10-13", validThrough: "2026-10-13", opens: "00:00", closes: "00:00" },
    ],
    notices: [
      {
        id: "2026-10-12-13",
        title: "Variazione orari questa settimana",
        message:
          "Lunedì 12 ottobre siamo APERTI a cena · Martedì 13 ottobre CHIUSI per manutenzione straordinaria.",
        until: "2026-10-14T00:00:00+02:00",
      },
    ],
  },

  sections: [
    {
      id: "intro",
      kicker: "Tradizione e Passione",
      title: "Villa Pensabene ti aspetta! 🍝",
      description:
        "Vieni a scoprire il gusto autentico della tradizione siciliana nel cuore di Palermo. La nostra cucina celebra i sapori della terra e del mare con ingredienti freschissimi e ricette artigianali.",
      active: true,
    },
    {
      id: "giro-pizza",
      kicker: "Serata Pizza",
      title: 'I nostri "Giro Pizza" 🍕',
      description:
        "Scegli la formula perfetta per la tua serata in compagnia. Pizze a lievitazione naturale cotte a legna a volontà e tutto il gusto della tradizione.",
      video: "/giropizza.mp4",
      poster: "/posters/giropizza.jpg",
      active: true,
    },
    {
      id: "pranzo-domenica",
      badge: "Ogni Domenica a Pranzo",
      title: "Agriturismo in Città! 🍷🌿",
      description:
        "Vivi l'esperienza di un vero agriturismo senza lasciare Palermo. Prenota il tuo tavolo per la domenica e goditi un pranzo indimenticabile con tutta la famiglia.",
      video: "/events/pranzo-domenica-agriturismo/promo.mp4",
      poster: "/posters/promo.jpg",
      active: true,
    },
    {
      id: "giro-pasta",
      kicker: "Novità a Villa Pensabene",
      title: 'Il nostro "Giro Pasta" 🍝',
      description:
        "\"Gentili ospiti, siamo lieti di presentarvi il nostro Giro Pasta! Un'esperienza culinaria completa che inizia con i nostri deliziosi antipasti e prosegue con la scelta delle nostre migliori specialità.\"",
      video: "/giropasta.mp4",
      poster: "/posters/giropasta.jpg",
      active: true,
    },
    {
      id: "eventi",
      badge: "I tuoi momenti indimenticabili",
      title: "Organizziamo i tuoi eventi speciali 🎉",
      description:
        "Creiamo insieme il tuo evento perfetto con menu personalizzati e un'atmosfera accogliente per festeggiare le tappe più importanti della tua vita.",
      video: "/eventi.mp4",
      poster: "/posters/eventi.jpg",
      active: true,
    },
  ],

  pizzaFormulas: [
    {
      id: "giro-pizza-base",
      sectionId: "giro-pizza",
      title: "Giro Pizza Base",
      price: "15,00€",
      antipasti: ["Antipasto Caldo", "Sfincionello Palermitano"],
      pizzaDescription: "Giro Pizze tra le nostre diverse varietà a volontà",
      bevande: ["Coca Cola 1L (1 ogni 4 pers.)", "Birra 66cl (1 ogni 3 pers.)", "Acqua Libera"],
      active: true,
    },
    {
      id: "giro-pizza-completo",
      sectionId: "giro-pizza",
      title: "Giro Pizza Completo",
      price: "18,00€",
      antipasti: ["Antipasto Caldo", "Bruschette Classiche", "Sfincionello tipico", "Focaccine Miste"],
      antipastiNote: "*Focaccine: Ricotta, Porchetta, Panelline",
      pizzaDescription: "Giro Pizze tra le nostre diverse varietà a volontà",
      bevande: ["Coca Cola 1L (1 ogni 4 pers.)", "Birra 66cl (1 ogni 3 pers.)", "Acqua Libera"],
      active: true,
    },
  ],

  fixedMenus: [
    {
      id: "pranzo-domenica-pesce",
      sectionId: "pranzo-domenica",
      title: "Menu di Pesce",
      subtitle: '"Delizia del Mare"',
      price: "35€",
      courses: [
        { count: 4, label: "Antipasti sfiziosi" },
        { count: 2, label: "Primi tradizionali" },
        { count: 1, label: "Secondo con contorno" },
      ],
      note: "Acqua, Coca Cola e Vino inclusi",
      active: true,
    },
    {
      id: "pranzo-domenica-carne",
      sectionId: "pranzo-domenica",
      title: "Menu di Carne",
      subtitle: '"Tesori della Terra"',
      price: "30€",
      courses: [
        { count: 6, label: "Antipasti tipici" },
        { count: 2, label: "Primi di pasta fresca" },
        { count: 1, label: "Secondo alla brace" },
      ],
      note: "Acqua, Coca Cola e Vino inclusi",
      active: true,
    },
  ],

  giroPasta: {
    id: "giro-pasta",
    sectionId: "giro-pasta",
    antipasti: [
      "Antipasto caldo",
      "Sfincionello tipico",
      "Focaccine alla milza",
      "Focaccine con ricotta",
      "Focaccine porchetta e cipolla",
    ],
    primiHeading: "I Primi (Scegline 4 portate)",
    primi: [
      "Penne alla Boscaiola",
      "Rigatoni alla Carbonara",
      "Mezze maniche all'Amatriciana",
      "Casarecce Salsiccia e Funghi",
      "Farfallette al Salmone",
      "Fusilli Zucca, Scamorza e Speck",
      "Tortiglioni Pistacchiosa",
      "Gnocchi ai 4 Formaggi",
    ],
    conditions: [
      { id: "prezzo", value: "20€", label: "A Persona" },
      { id: "bevande-incluse", value: "", label: "Bevande Incluse", sublabel: "Acqua, Coca Cola, Birra" },
      { id: "tutta-settimana", value: "", label: "Tutta la settimana", sublabel: "Domenica inclusa" },
      { id: "minimo-adulti", value: "", label: "Minimo 8 Adulti", sublabel: "Prenotazione obbligatoria" },
    ],
    active: true,
  },

  quickFeatures: [
    { id: "giro-pasta-price", title: "Giro Pasta - 20€", relatedPromoId: "giro-pasta" },
    { id: "area-giochi", title: "Area Giochi Bimbi" },
    { id: "menu-carta", title: "Menu alla Carta" },
  ],

  specialties: [
    { id: "pesce", title: "Pesce Freschissimo" },
    { id: "carni", title: "Carni alla Griglia" },
    { id: "giropizza", title: "Giropizza Artigianale" },
    { id: "giropasta", title: "Giropasta Tradizionale" },
  ],

  eventTypes: [
    { id: "battesimi", title: "Battesimi" },
    { id: "compleanni", title: "Compleanni" },
    { id: "cerimonie", title: "Cerimonie" },
    { id: "feste-private", title: "Feste Private" },
  ],

  seasonalFeatures: [
    {
      id: "compleanni-gazebo",
      sectionId: "compleanni-bimbi",
      badge: "Novità — Prenota ora",
      title: "Compleanni nel Gazebo 🎂✨",
      lead: "Hai sentito la novità?",
      description:
        "Da settembre, i compleanni dei tuoi piccoli trovano la loro location perfetta. Un gazebo incantato, solo per loro — palloncini, torta, sorrisi. E tu che guardi tutto senza pensare a niente. Perché ci pensiamo noi.",
      highlights: [
        { emoji: "👑", title: "Per la tua piccola principessa", description: "Un giorno da regina nel nostro gazebo" },
        { emoji: "🦸", title: "Per il tuo piccolo ometto", description: "Un party da supereroe da ricordare" },
      ],
      video: "/events/compleanni_bimbi/villa pesabene video compleanni pome_001.mp4",
      poster: "/posters/compleanni.jpg",
      ctaLabel: "Chiama per informazioni e prenotazioni",
      footerNote: "🌿 Villa Pensabene — dove ogni momento diventa un ricordo.",
      active: true,
    },
  ],

  menu: {
    fullMenuUrl: "https://gofoodmenu.it/villa-pensabene-ristorante-pizzeria",
    categories: [
      {
        title: "Gli Antipasti",
        items: [
          { name: "Patate fresche fritte", price: "€4.00" },
          { name: "Bruschetta classica", price: "€5.00", description: "Pomodoro, Olio, Sale, Pepe, Origano" },
          {
            name: "Antipasto Caldo",
            price: "€6.00",
            description: "Patatine Fritte, Arancinette con Carne e Burro, Crostino, Panelline*, Crocchè*",
          },
          {
            name: "Antipasto delle fritte",
            price: "€7.00",
            description: "Verdure Pastellate, Crostino, Tuma, Panelle, Crocchè",
          },
          { name: "Tortino di patata con cuore di bufala e pesto di pistacchio", price: "€10.00" },
          {
            name: "Listarelli di panpizza, stracciatella, pesto di pistacchio e scaglie di grana",
            price: "€12.00",
          },
          { name: "Bruschetta con salmone, stracciatella, pesto di pistacchio e lime", price: "€12.00" },
          { name: "Caponata di pesce spada con granella di mandorle tostate", price: "€12.00" },
          { name: "Carpaccio di manzo con rucola, scaglie di grana e olio EVO", price: "€13.00" },
          { name: "Zuppa di cozze con crostoni di pane", price: "€13.00" },
          {
            name: "Salmone marinato con pesto di agrumi siciliani e spumoncini di avocado",
            price: "€15.00",
          },
          { name: "Tartare di tonno with menta, capperi, soia, mandorle e arancia", price: "€15.00" },
          {
            name: "Insalata di mare imperiale",
            price: "€17.00",
            description: "Calamaro, Cozze, Vongole, Polpo, Gambero Rosso, Scampi, Olio EVO, Sedano, Carote",
          },
          { name: "Zuppetta di pesce", price: "€18.00", description: "Cozze, Vongole, Gambero Rosso, Triglie" },
        ],
      },
      {
        title: "I nostri deliziosi Primi",
        items: [
          { name: "Gnocchi alla sorrentina gratinati al forno", price: "€13.00" },
          { name: "Pappardelle fresche all'uovo con ragù di cinghiale", price: "€14.00" },
          { name: "Busiate con salsa parmantier, salsiccia e funghi porcini", price: "€14.00" },
          {
            name: "Linguine o riso con crema di zucca rossa, guanciale croccante e fonduta di grana",
            price: "€14.00",
          },
          { name: "Spaghettoni con vongole veraci", price: "€17.00" },
          { name: "Busiate o riso con gambero rosso, pomodorino e pesto di pistacchio", price: "€18.00" },
          { name: "Linguine con vongole, bottarga di tonno e zeste di lime", price: "€18.00" },
          { name: "Spaghetto chitarra cacio e pepe con tartare di gambero rosso", price: "€18.00" },
          {
            name: "Busiate con ragù di triglie, finocchietto selvatico e mandorle tostate",
            price: "€18.00",
          },
          {
            name: "Paccheri con quadrucci di tonno, pesto genovese fresco e granella di nocciole tostate",
            price: "€18.00",
          },
          {
            name: "Fettuccine mediterranea con letto di nero di seppia, gambero rosso, pomodorino e polvere di pistacchio",
            price: "€18.00",
          },
          { name: "Fettuccine alla granceola e pomodorini", price: "€22.00" },
          { name: "Fettuccine bronzate all'astice e pomodorino", price: "€25.00" },
        ],
      },
      {
        title: "Secondi di Carne",
        items: [
          {
            name: "Caesar salad",
            price: "€12.00",
            description: "Iceberg, Straccetti di Pollo Grill, Scaglie di Grana, Verdure, Olio EVO",
          },
          { name: "Chianina di Angus (800 gr circa)", price: "€5.00/etto" },
          { name: "Tagliata di pollo con julienne di verdure stufate", price: "€16.00" },
          { name: "Tagliata di manzo con rucola, grana e pomodorini", price: "€17.00" },
          { name: "Stinco di maiale con contorno di patate al burro", price: "€17.00" },
          { name: "Filetto di vitello ai ferri with salsa al pepe rosa e patate arrosto", price: "€18.00" },
          {
            name: "Filetto di maialino in crosta di pistacchio, chutney di pere e zenzero e caponatina di verdure",
            price: "€18.00",
          },
        ],
      },
      {
        title: "Secondi di Pesce",
        items: [
          { name: "Involtini di pesce spada panati agli agrumi di Sicilia", price: "€16.00" },
          { name: "Trancio di spada alla eoliana", price: "€16.00" },
          { name: "Frittura croccante di totani, gamberi, baccalà e triglie", price: "€17.00" },
          { name: "Tataki di tonno con riduzione di soia, miele e senape", price: "€20.00" },
          { name: "Calamaro e gamberoni grill su crema di zucca rossa", price: "€22.00" },
        ],
      },
      {
        title: "Hamburgers",
        items: [
          {
            name: "BBQ Piemontese",
            price: "€13.00",
            description: "Hamburger di Fassona Italiana, Pomodoro, Tuma, Cipolla caramellata, Guanciale, Salsa BBQ, Patate",
          },
          {
            name: "Mortazza Deluxe",
            price: "€13.00",
            description: "Hamburger di Fassona Italiana, Mortadella Grill, Stracciatella, Pesto di Pistacchio, Patate",
          },
          {
            name: "Green Chicken",
            price: "€13.00",
            description: "Hamburger di Pollo, Lattuga, Tuma al Pistacchio, Pomodoro, Guanciale croccante, Patate",
          },
          {
            name: "Sunrise Burger",
            price: "€13.00",
            description: "Hamburger di Fassona Italiana, Uovo occhio di bue, Lattuga, Guanciale croccante, Cacio Cavallo, Patate",
          },
        ],
      },
      {
        title: "Pizze Classiche",
        items: [
          { name: "Biancaneve", price: "€7.00", description: "Fiordilatte" },
          { name: "Margherita", price: "€9.00", description: "Polpa di Pomodoro, Fiordilatte, Basilico Fresco" },
          { name: "Napoli", price: "€8.00", description: "Polpa di Pomodoro, Fiordilatte, Filetti di Acciughe, Origano" },
          { name: "Bruschetta", price: "€8.00", description: "Cubetti di Pomodoro, Basilico, Scaglie di Parmigiano" },
          { name: "America", price: "€9.00", description: "Polpa di Pomodoro, Fiordilatte, Patatine Fritte, Wurstel, Salsa BBQ" },
          {
            name: "Campagnola",
            price: "€10.00",
            description: "Polpa di Pomodoro, Fiordilatte, Salsiccia, Spinaci, Funghi Freschi, Cipolla Rossa, Olive",
          },
          {
            name: "Siciliana",
            price: "€9.00",
            description: "Polpa di Pomodoro, Cipolla Rossa, Salsiccia, Acciughe, Ricotta Fresca, Muddica Tostata",
          },
          { name: "Diavola", price: "€9.00", description: "Polpa di Pomodoro, Fiordilatte, Ventricina, Cipolla Rossa" },
          { name: "Romana", price: "€9.00", description: "Polpa di Pomodoro, Fiordilatte, Prosciutto Cotto" },
          { name: "4 Formaggi", price: "€9.00", description: "Fiordilatte, Emmenthal, Caciocavallo, Gorgonzola" },
          { name: "Calzone", price: "€9.00", description: "Polpa di Pomodoro, Fiordilatte, Prosciutto Cotto" },
          { name: "Caprese", price: "€9.00", description: "Pomodoro a Fette, Mozzarella di Bufala DOP, Basilico, Olio Evo" },
          { name: "Bagherese", price: "€9.00", description: "Salsa Sfinciuni Bianca, Tuma, Ricotta Fresca, Muddica" },
          { name: "Affumicata", price: "€9.50", description: "Fiordilatte, Scamorza Affumicata, Melanzane, Speck, Scaglie di Grana" },
          { name: "Faccia di Vecchia", price: "€9.50", description: "Salsa di Pomodoro, Acciughe, Cipolla, Caciocavallo, Pangrattato" },
          { name: "Parmigiana", price: "€9.50", description: "Polpa di Pomodoro, Fiordilatte, Melanzane, Scaglie di Grana, Basilico" },
          { name: "Sfincione Palermitano", price: "€9.50", description: "Salsa di Cipolla, Filetti di Acciughe, Caciocavallo, Muddica" },
          { name: "4 Gusti", price: "€9.50", description: "Polpa di Pomodoro, Fiordilatte, Prosciutto Cotto, Carciofi, Wurstel" },
          { name: "Capricciosa", price: "€10.00", description: "Polpa di Pomodoro, Fiordilatte, Prosciutto Cotto, Carciofi, Funghi, Wurstel" },
          { name: "Rustica", price: "€9.50", description: "Polpa di Pomodoro, Fiordilatte, Melanzane, Cipolla Rossa, Caciocavallo, Olive" },
          { name: "Chicken", price: "€9.50", description: "Polpa di Pomodoro, Fiordilatte, Sfilze di Pollo, Salsa BBQ" },
          { name: "Maialina", price: "€10.00", description: "Polpa di Pomodoro, Fiordilatte, Porchetta, Emmenthal, Cipolla caramellata" },
          { name: "Tirolese", price: "€10.00", description: "Polpa di Pomodoro, Fiordilatte, Speck, Gorgonzola" },
          { name: "Tonnata", price: "€10.00", description: "Polpa di Pomodoro, Fiordilatte, Tonno, Olive, Cipolla Rossa" },
          { name: "Sfiziosa", price: "€10.00", description: "Polpa di Pomodoro, Fiordilatte, Bacon, Salamino Piccante, Mascarpone" },
          { name: "Vegetariana", price: "€10.00", description: "Polpa di Pomodoro, Fiordilatte, Funghi, Pomodorino, Melanzane, Zucchine" },
        ],
      },
      {
        title: "Pizze Bufalose",
        items: [
          { name: "Ai Frati", price: "€13.00", description: "Mozzarella di Bufala, Radicchio, Mascarpone, Gorgonzola, Speck, Noci" },
          { name: "Andrea", price: "€13.00", description: "Mozzarella di Bufala, Pomodorini, Mascarpone, Crudo, Scaglie di Grana" },
          { name: "Brontese", price: "€13.00", description: "Mozzarella di Bufala DOP, Pomodoro Datterino, Speck, Pesto di Pistacchio" },
          { name: "Bufalina", price: "€11.00", description: "Polpa di Pomodoro, Mozzarella di Bufala DOP, Pomodorini, Basilico" },
          { name: "Delizia", price: "€13.00", description: "Polpa di Pomodoro, Mozzarella di Bufala, Prosciutto Crudo, Pomodorini, Rucola" },
          { name: "Friariella", price: "€11.00", description: "Mozzarella di Bufala DOP, Friarielli, Salsiccia" },
          { name: "Isola", price: "€13.00", description: "Ripieno Porcini. Esterno: Pomodorini, Mozzarella di Bufala, Speck, Grana" },
          { name: "La Villa", price: "€13.00", description: "Mozzarella di Bufala Affumicata, Patate, Bresaola" },
          { name: "Mortadelosa", price: "€14.00", description: "Mozzarella di Bufala DOP, Ciliegino, Stracciatella, Mortadella, Pistacchio" },
          { name: "Nebrodi", price: "€12.00", description: "Mozzarella di Bufala Affumicata, Lardo, Miele, Noci" },
          { name: "Parma", price: "€12.00", description: "Polpa di Pomodoro, Bufala, Prosciutto Crudo di Parma" },
          { name: "Porcini", price: "€11.00", description: "Mozzarella di Bufala DOP Affumicata, Funghi Porcini, Basilico" },
        ],
      },
      {
        title: "Pizze Stracciatellose",
        items: [
          { name: "Bresaola", price: "€12.00", description: "Stracciatella, Bresaola, Noci, Scaglie di Grana" },
          { name: "Calzone Farcito", price: "€14.00", description: "Crema Porcini, Bufala DOP, Prosciutto Crudo, Stracciatella, Pistacchio" },
          { name: "Parmense", price: "€12.00", description: "Polpa di Pomodoro, Pomodorini, Prosciutto Crudo di Parma, Stracciatella, Rucola" },
          { name: "Preziosa", price: "€13.00", description: "Polpa di Pomodoro, Bufala DOP, Stracciatella, Crudo, Granella di Pistacchio" },
        ],
      },
      {
        title: "Pizze in Pala & Speciali",
        items: [
          { name: "Antichi Sapori", price: "€13.00", description: "Mozzarella di Bufala, Primosale, Mortadella Grigliata, Miele" },
          { name: "Oceano", price: "€15.00", description: "Pesto Pistacchio, Bufala, Salmone, Stracciatella, Zeste di Limone" },
          { name: "Pensabene", price: "€14.00", description: "Mozzarella di Bufala, Melanzane Grigliate, Ciliegino, Salmone Affumicato" },
          { name: "Cannolo", price: "€13.00", description: "Interno: Salsiccia. Esterno: Stracciatella, Granella di Pistacchio" },
          { name: "Kayak", price: "€14.00", description: "Interno: Pesto Pistacchio, Philadelphia. Esterno: Speck, Stracciatella" },
          { name: "Quadro", price: "€14.00", description: "Bordo 4 Formaggi, Mozzarella di Bufala, Funghi Porcini, Salsiccia" },
          { name: "Regina", price: "€14.00", description: "Bordo Porcini. Centro: Pomodoro, Bufala DOP, Crudo, Pachino, Rucola" },
          { name: "Sfilatino", price: "€12.00", description: "Pomodoro a Fette, Fiordilatte, Salame Felino, Emmenthal, Sesamo" },
        ],
      },
      {
        title: "Giro Pizza",
        items: [
          {
            name: "Giro Pizza € 15,00",
            price: "€15.00",
            description: "✅ Antipasto Caldo | ✅ Sfincionello Palermitano | ✅ Giro Pizze tra le nostre diverse varietà | ✅ Coca Cola da 1 litro (1 ogni 4 partecipanti) | ✅ Birra da 66cl (1 ogni 3 partecipanti) | ✅ Acqua (libera)",
          },
          {
            name: "Giro Pizza € 18,00",
            price: "€18.00",
            description: "✅ Antipasto Caldo | ✅ Bruschette Classiche | ✅ Sfincionello Palermitano | ✅ Focaccine Miste (Ricotta, Porchetta, Panelline) | ✅ Giro Pizze tra le nostre varietà | ✅ Coca Cola da 1 litro (1 ogni 4 partecipanti) | ✅ Birra da 66cl (1 ogni 3 partecipanti) | ✅ Acqua (libera)",
          },
        ],
      },
      {
        title: "Dessert & Bevande",
        items: [
          { name: "Le torte di Villa Pensabene", price: "€5.00" },
          { name: "Tiramisu", price: "€5.00" },
          { name: "Parfait di mandorle", price: "€5.00" },
          { name: "Cheesecake", price: "€5.00", description: "Frutti di Bosco, Cioccolato Fondente, Pistacchio" },
          { name: "Semifreddo rocher", price: "€5.00" },
          { name: "Bavarese al pistacchio", price: "€5.00", description: "Con fonduta di fave di cacao" },
          { name: "Tortino cuore caldo", price: "€6.00", description: "Al cioccolato su crema inglese" },
          { name: "Acqua (1 lt)", price: "€3.00" },
          { name: "Birre in bottiglia (33 cl)", price: "€3.50/€4.50", description: "Beck's, Heineken, Corona, Tennent's, Ceres" },
          { name: "Bibite (33 cl)", price: "€3.00", description: "Coca-Cola, Zero, Fanta, Sprite, Chinotto" },
          { name: "Birra alla spina (40 cl)", price: "€5.00", description: "Forst Kronen - Sixtus" },
        ],
      },
      {
        title: "La nostra Cantina",
        items: [
          { name: "Vini Bianchi", price: "€20.00/€32.00", description: "Anthilia, Bianco di Nera, Charme, Leone, Maria Costanza" },
          { name: "Vini Rossi", price: "€20.00/€30.00", description: "Benuara, Floramundi, Merlot, Nero d'Avola, Syrah" },
          { name: "Prosecco", price: "€16.00" },
          { name: "Amari e Liquori", price: "€4.00/€5.00", description: "Averna, Del Capo, Jagermeister, Montenegro, Amara, Grappa" },
        ],
      },
    ],
  },

  reservationEventOptions: [
    { value: "Compleanno Bimbi nel Gazebo", label: "🎂 Compleanno Bimbi nel Gazebo", relatedPromoId: "compleanni-gazebo" },
    { value: "Cena / Menù alla Carta", label: "Cena / Menù alla Carta" },
    { value: "Giro Pizza", label: "Giro Pizza", relatedPromoId: "giro-pizza" },
    { value: "Giro Pasta", label: "Giro Pasta", relatedPromoId: "giro-pasta" },
    { value: "Pranzo della Domenica (Agriturismo in città)", label: "Pranzo della Domenica — Agriturismo in città", relatedPromoId: "pranzo-domenica" },
    { value: "Evento Privato (Festa / Cerimonia)", label: "Evento Privato (Festa / Cerimonia)" },
  ],

  nav: [
    { label: "🎂 Compleanni Bimbi", href: "#compleanni-bimbi" },
    { label: "🍂 Pranzo Domenica", href: "#pranzo-domenica" },
    { label: "Proposta Gastronomica", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Galleria", href: "#gallery" },
    { label: "Contatti", href: "#footer" },
  ],

  seo: {
    siteUrl: "https://www.villapensabene.it",
    title: "Villa Pensabene - Ristorante Pizzeria a Palermo | Cucina Siciliana",
    description:
      "Ristorante pizzeria a Palermo in Via P.40, alle spalle del Velodromo: cucina siciliana, pesce, carne alla griglia, Giro Pizza e Pranzo della Domenica. Aperti tutti i giorni a cena, chiusi il lunedì. Prenota su WhatsApp.",
    ogDescription:
      "Cucina siciliana, Giro Pizza, Giro Pasta e Pranzo della Domenica. Aperti tutti i giorni a cena, chiusi il lunedì.",
    twitterDescription: "Cucina siciliana, Giro Pizza e Pranzo della Domenica a Palermo.",
    ogImage: "/og-image.jpg",
    ogImageAlt: "Villa Pensabene - Ristorante Pizzeria a Palermo",
    cuisine: ["Siciliana", "Pizza", "Pesce", "Carne alla griglia"],
    priceRange: "€€",
  },
}
