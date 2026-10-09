import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import SplashScreen from "@/components/splash-screen"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const viewport = {
  themeColor: "#8B2630",
  width: "device-width",
  initialScale: 1,
}

const SITE_URL = "https://www.villapensabene.it"

// Dati strutturati per Google (Ristorante). Orari allineati alla scheda Google Business Profile.
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Villa Pensabene - Ristorante Pizzeria",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.png`,
  telephone: "+39 327 414 6546",
  email: "villapensabeneristorante@gmail.com",
  priceRange: "€€",
  servesCuisine: ["Siciliana", "Pizza", "Pesce", "Carne alla griglia"],
  menu: "https://gofoodmenu.it/villa-pensabene-ristorante-pizzeria",
  acceptsReservations: "True",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via P.40, 29",
    addressLocality: "Palermo",
    addressRegion: "PA",
    postalCode: "90146",
    addressCountry: "IT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "16:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "12:30",
      closes: "00:00",
    },
  ],
  // Variazioni temporanee: rimuovere dopo il 13 ottobre 2026
  specialOpeningHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      validFrom: "2026-10-12",
      validThrough: "2026-10-12",
      opens: "16:00",
      closes: "00:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      validFrom: "2026-10-13",
      validThrough: "2026-10-13",
      opens: "00:00",
      closes: "00:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/villapensabeneristorante/",
    "https://www.instagram.com/villapensabene/",
    "https://www.tiktok.com/@villa.pensabene.r",
    "https://www.tripadvisor.it/Restaurant_Review-g187890-d3457272-Reviews-Villa_Pensabene_Ristorante_Pizzeria-Palermo_Province_of_Palermo_Sicily.html",
  ],
}


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Villa Pensabene - Ristorante Pizzeria a Palermo | Cucina Siciliana",
  description:
    "Ristorante pizzeria a Palermo in Via P.40, alle spalle del Velodromo: cucina siciliana, pesce, carne alla griglia, Giro Pizza e Pranzo della Domenica. Aperti tutti i giorni a cena, chiusi il lunedì. Prenota su WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Villa Pensabene",
    title: "Villa Pensabene - Ristorante Pizzeria a Palermo",
    description:
      "Cucina siciliana, Giro Pizza, Giro Pasta e Pranzo della Domenica. Aperti tutti i giorni a cena, chiusi il lunedì.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Villa Pensabene - Ristorante Pizzeria a Palermo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Pensabene - Ristorante Pizzeria a Palermo",
    description: "Cucina siciliana, Giro Pizza e Pranzo della Domenica a Palermo.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Villa Pensabene",
    startupImage: [
      {
        url: "/icon-512x512.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },

  formatDetection: {
    telephone: false,
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body className={`font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <SplashScreen />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
