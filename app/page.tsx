import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FesteSection } from "@/components/feste-section"
import { AboutSection } from "@/components/about-section"
import { MenuSection } from "@/components/menu-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AvvisoOrari } from "@/components/avviso-orari"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FesteSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <AvvisoOrari />
    </main>
  )
}
