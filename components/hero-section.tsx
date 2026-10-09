import { Button } from "@/components/ui/button"
import { ChevronDown, BookOpen, Calendar } from "lucide-react"
import { HeroVideo } from "@/components/hero-video"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <HeroVideo />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="mb-12 flex justify-center">
          <img
            src="/icon.svg"
            alt="Villa Pensabene Logo"
            width={192}
            height={192}
            fetchPriority="high"
            className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10 py-7 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 w-full sm:w-auto"
            asChild
          >
            <a href="#prenota">
              <span className="bg-accent-foreground/10 p-1.5 rounded-full">
                <Calendar size={18} />
              </span>
              Prenota un Tavolo
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white hover:text-foreground text-lg px-10 py-7 rounded-full backdrop-blur-md bg-white/10 shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 w-full sm:w-auto"
            asChild
          >
            <a
              href="https://gofoodmenu.it/villa-pensabene-ristorante-pizzeria"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-white/10 p-1.5 rounded-full">
                <BookOpen size={18} />
              </div>
              Scopri il Menu
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>
    </section>
  )
}
