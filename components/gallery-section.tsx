'use client'
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export function GallerySection() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(intervalId)
  }, [api])

  const images = [
    // ... same images array
    { url: "/dishes/villa_001.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_002.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_003.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_004.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_005.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_006.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_007.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_008.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_009.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_010.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_011.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_012.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_013.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_014.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_015.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_016.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_017.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_018.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_019.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_020.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_021.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_022.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_023.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_024.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_025.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_026.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_027.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_028.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_029.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_030.png", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_031.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_032.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_033.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_034.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_035.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_036.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_037.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_040.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_041.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_042.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_043.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_044.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_045.jpg", alt: "Piatto Villa Pensabene" },
    { url: "/dishes/villa_046.jpg", alt: "Piatto Villa Pensabene" },
  ]

  return (
    <section id="gallery" className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Galleria</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {"Un assaggio visivo delle nostre creazioni culinarie"}
          </p>
        </div>

        <div className="relative px-12 lg:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg group bg-background">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 size-12 bg-background border-border hover:bg-accent hover:text-accent-foreground shadow-xl transition-all" />
              <CarouselNext className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 size-12 bg-background border-border hover:bg-accent hover:text-accent-foreground shadow-xl transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
