import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/data/site.config"

const menuCategories = siteConfig.menu.categories

export function MenuSection() {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Il Nostro Menu</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {"Scopri i nostri piatti preparati con ingredienti freschi e ricette autentiche della tradizione siciliana"}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4 mb-12">
          {menuCategories.map((category, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-none shadow-sm">
              <AccordionTrigger className={cn(
                "px-8 py-6 bg-card rounded-xl hover:no-underline hover:bg-accent/5 transition-all text-left group",
                "border border-border/50 data-[state=open]:border-accent/40 data-[state=open]:rounded-b-none"
              )}>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-accent group-hover:translate-x-1 transition-transform">
                  {category.title}
                </h3>
              </AccordionTrigger>
              <AccordionContent className="bg-card px-8 pb-8 rounded-b-xl border-x border-b border-border/50">
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg text-foreground">{item.name}</h4>
                        <span className="text-accent font-bold text-lg whitespace-nowrap ml-4">{item.price}</span>
                      </div>
                      {item.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a
              href={siteConfig.menu.fullMenuUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visualizza Menu Completo Online
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
