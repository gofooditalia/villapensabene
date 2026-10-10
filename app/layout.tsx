import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { siteConfig } from "@/data/site.config"

const _geist = Geist({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const viewport = {
  themeColor: "#8B2630",
  width: "device-width",
  initialScale: 1,
}

const SITE_URL = siteConfig.seo.siteUrl

const weekdayToJsonLd: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
}

// Dati strutturati per Google (Ristorante). Orari generati da data/site.config.ts.
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.business.legalName,
  url: SITE_URL,
  image: `${SITE_URL}${siteConfig.seo.ogImage}`,
  logo: `${SITE_URL}/logo.png`,
  telephone: siteConfig.business.phone.replace(/^\+39/, "+39 "),
  email: siteConfig.business.email,
  priceRange: siteConfig.seo.priceRange,
  servesCuisine: siteConfig.seo.cuisine,
  menu: siteConfig.menu.fullMenuUrl,
  acceptsReservations: "True",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.business.address.street,
    addressLocality: siteConfig.business.address.city,
    addressRegion: siteConfig.business.address.region,
    postalCode: siteConfig.business.address.postalCode,
    addressCountry: siteConfig.business.address.country,
  },
  openingHoursSpecification: siteConfig.hours.regular.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: entry.days.length === 1 ? weekdayToJsonLd[entry.days[0]] : entry.days.map((d) => weekdayToJsonLd[d]),
    opens: entry.opens,
    closes: entry.closes,
  })),
  // Variazioni temporanee: tenere sincronizzato con hours.notices in data/site.config.ts
  specialOpeningHoursSpecification: siteConfig.hours.specialHours.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    validFrom: entry.validFrom,
    validThrough: entry.validThrough,
    opens: entry.opens,
    closes: entry.closes,
  })),
  sameAs: [
    siteConfig.business.socials.facebook,
    siteConfig.business.socials.instagram,
    siteConfig.business.socials.tiktok,
    siteConfig.business.socials.tripadvisor,
  ],
}


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: siteConfig.business.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.ogDescription,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.seo.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.twitterDescription,
    images: [siteConfig.seo.ogImage],
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
