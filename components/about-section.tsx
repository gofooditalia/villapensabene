"use client"

import type React from "react"
import { LazyVideo } from "@/components/lazy-video"
import { Card } from "@/components/ui/card"
import { Utensils, Waves, TreePine, Baby, Clock, ScrollText, Sparkles, PartyPopper, Cake, Wine, Phone } from "lucide-react"
import { siteConfig } from "@/data/site.config"

// Icone per gli elementi definiti in data/site.config.ts. Le icone sono
// layout (JSX), non contenuto: l'agente di modifica non tocca questo file,
// quindi un nuovo id senza icona qui va aggiunto da un dev, non via WhatsApp.
const specialtyIcons: Record<string, React.ReactNode> = {
  pesce: <Waves className="text-accent" />,
  carni: <TreePine className="text-accent" />,
  giropizza: <Utensils className="text-accent" />,
  giropasta: <ScrollText className="text-accent" />,
}

const quickFeatureIcons: Record<string, React.ReactNode> = {
  "giro-pasta-price": <Clock className="text-accent" size={20} />,
  "area-giochi": <Baby className="text-accent" size={20} />,
  "menu-carta": <ScrollText className="text-accent" size={20} />,
}

const eventTypeIcons: Record<string, React.ReactNode> = {
  battesimi: <Baby />,
  compleanni: <Cake />,
  cerimonie: <Wine />,
  "feste-private": <PartyPopper />,
}

const giroPastaConditionIcons: Record<string, React.ReactNode> = {
  "bevande-incluse": <Utensils className="text-accent mb-2" size={20} />,
  "tutta-settimana": <Clock className="text-accent mb-2" size={20} />,
  "minimo-adulti": <Baby className="text-accent mb-2" size={20} />,
}

function getSection(id: string) {
  const section = siteConfig.sections.find((s) => s.id === id)
  if (!section) throw new Error(`Sezione "${id}" non trovata in data/site.config.ts`)
  return section
}

export function AboutSection() {
  const intro = getSection("intro")
  const giroPizzaSection = getSection("giro-pizza")
  const [formulaBase, formulaCompleto] = siteConfig.pizzaFormulas
  const pranzoSection = getSection("pranzo-domenica")
  const [menuPesce, menuCarne] = siteConfig.fixedMenus
  const giroPastaSection = getSection("giro-pasta")
  const giroPasta = siteConfig.giroPasta
  const eventiSection = getSection("eventi")
  const compleanniGazebo = siteConfig.seasonalFeatures.find((f) => f.id === "compleanni-gazebo")!

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Intro Section */}
        <div className="text-center mb-16">
          {intro.kicker && (
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">{intro.kicker}</span>
          )}
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">{intro.title}</h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">{intro.description}</p>
        </div>

        {/* Giro Pizza Section */}
        {giroPizzaSection.active && (
          <div className="mb-20">
            <div className="text-center mb-12">
              {giroPizzaSection.kicker && (
                <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">
                  {giroPizzaSection.kicker}
                </span>
              )}
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">{giroPizzaSection.title}</h3>
              {giroPizzaSection.description && (
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed italic">
                  {giroPizzaSection.description}
                </p>
              )}
            </div>

            {/* Giro Pizza Promotional Video */}
            {giroPizzaSection.video && (
              <div className="max-w-md mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <LazyVideo aspect="4/5" src={giroPizzaSection.video} poster={giroPizzaSection.poster ?? ""} className="w-full h-auto bg-black" />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Formula Base */}
              {formulaBase.active && (
                <Card className="relative overflow-hidden border-none shadow-2xl bg-card transition-transform hover:scale-[1.01] duration-300">
                  <div className="absolute top-0 right-0 p-6 z-10">
                    <span className="bg-accent text-accent-foreground px-5 py-1.5 rounded-full font-bold shadow-lg text-lg">{formulaBase.price}</span>
                  </div>
                  <div className="p-8 md:p-12 h-full flex flex-col">
                    <h4 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                      <Utensils className="text-accent" size={24} /> {formulaBase.title}
                    </h4>

                    <div className="space-y-8 flex-grow">
                      <div>
                        <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Antipasti inclusi</h5>
                        <ul className="space-y-3">
                          {formulaBase.antipasti.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                              <span className="text-sm font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">La Pizza</h5>
                        <div className="bg-secondary/30 p-4 rounded-xl border border-white/5">
                          <p className="text-sm font-bold text-foreground leading-snug">{formulaBase.pizzaDescription}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Bevande</h5>
                        <ul className="grid grid-cols-1 gap-2">
                          {formulaBase.bevande.map((item, i) => (
                            <li
                              key={i}
                              className={
                                i === formulaBase.bevande.length - 1
                                  ? "text-xs text-muted-foreground flex items-center gap-2 font-bold text-accent/80"
                                  : "text-xs text-muted-foreground flex items-center gap-2"
                              }
                            >
                              <span
                                className={
                                  i === formulaBase.bevande.length - 1
                                    ? "w-1 h-1 rounded-full bg-accent"
                                    : "w-1 h-1 rounded-full bg-muted-foreground"
                                }
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Formula Completo */}
              {formulaCompleto.active && (
                <Card className="relative overflow-hidden border-none shadow-2xl bg-card border-t-4 border-accent transition-transform hover:scale-[1.01] duration-300">
                  <div className="absolute top-0 right-0 p-6 z-10">
                    <span className="bg-accent text-accent-foreground px-5 py-1.5 rounded-full font-bold shadow-lg text-lg">{formulaCompleto.price}</span>
                  </div>
                  <div className="p-8 md:p-12 h-full flex flex-col">
                    <h4 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                      <Sparkles className="text-accent" size={24} /> {formulaCompleto.title}
                    </h4>

                    <div className="space-y-8 flex-grow">
                      <div>
                        <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Antipasti Rinforzati</h5>
                        <ul className="grid grid-cols-2 gap-3">
                          {formulaCompleto.antipasti.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground">
                              <div className="w-1 h-1 rounded-full bg-accent/60" />
                              <span className="text-xs font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {formulaCompleto.antipastiNote && (
                          <p className="text-[10px] text-muted-foreground/60 italic mt-3">{formulaCompleto.antipastiNote}</p>
                        )}
                      </div>

                      <div>
                        <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">La Pizza</h5>
                        <div className="bg-accent/5 p-4 rounded-xl border border-accent/10">
                          <p className="text-sm font-bold text-foreground leading-snug">{formulaCompleto.pizzaDescription}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Bevande</h5>
                        <ul className="grid grid-cols-1 gap-2">
                          {formulaCompleto.bevande.map((item, i) => (
                            <li
                              key={i}
                              className={
                                i === formulaCompleto.bevande.length - 1
                                  ? "text-xs text-muted-foreground flex items-center gap-2 font-bold text-accent/80"
                                  : "text-xs text-muted-foreground flex items-center gap-2"
                              }
                            >
                              <span
                                className={
                                  i === formulaCompleto.bevande.length - 1
                                    ? "w-1 h-1 rounded-full bg-accent"
                                    : "w-1 h-1 rounded-full bg-muted-foreground"
                                }
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Our Specialties Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {siteConfig.specialties.map((item) => (
            <div key={item.id} className="flex flex-col items-center p-4 bg-card/50 rounded-2xl border border-white/5 shadow-sm">
              <div className="mb-3 bg-secondary p-3 rounded-full">{specialtyIcons[item.id]}</div>
              <span className="text-sm font-bold text-center uppercase tracking-tighter">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Agriturismo in Città Focus */}
        {pranzoSection.active && (
          <div id="pranzo-domenica" className="scroll-mt-24 bg-card rounded-3xl p-8 md:p-12 mb-20 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <div className="text-center mb-10">
                {pranzoSection.badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
                    <Sparkles size={16} />
                    <span>{pranzoSection.badge}</span>
                  </div>
                )}
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-accent mb-4">{pranzoSection.title}</h3>
                {pranzoSection.description && (
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed italic">
                    {pranzoSection.description}
                  </p>
                )}
              </div>

              {/* Launch poster + video */}
              <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto mb-8">
                <div className="relative mx-auto w-full max-w-sm">
                  <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                  <img
                    src="/events/pranzo-domenica-agriturismo/poster.webp"
                    width={720}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    alt="Pranzo della Domenica a Villa Pensabene, Agriturismo in Città a Palermo"
                    className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-white/10"
                  />
                </div>
                {pranzoSection.video && (
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                    <LazyVideo aspect="16/9" src={pranzoSection.video} poster={pranzoSection.poster ?? ""} className="w-full h-auto bg-black" />
                  </div>
                )}
              </div>

              <p className="text-center text-accent font-bold uppercase tracking-widest text-sm mb-10">
                Ogni Domenica a pranzo — prenota il tuo tavolo
              </p>

              {/* Opening hours notice */}
              <div className="max-w-2xl mx-auto mb-16 flex items-start gap-4 bg-accent/10 border border-accent/30 rounded-2xl px-6 py-5">
                <Clock className="text-accent shrink-0 mt-0.5" size={22} />
                <div>
                  <p className="font-bold text-accent text-sm uppercase tracking-wider mb-1">Orari di Apertura</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{siteConfig.hours.summaryText}</p>
                </div>
              </div>

              {/* Sunday Menus Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Fish Menu */}
                {menuPesce.active && (
                  <Card className="relative overflow-hidden group border-none shadow-xl bg-secondary/30">
                    <div className="absolute top-0 right-0 p-6 z-10">
                      <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full font-bold shadow-lg">{menuPesce.price}</span>
                    </div>
                    <div className="p-8 h-full flex flex-col">
                      <h4 className="font-serif text-2xl font-bold mb-4">{menuPesce.title}</h4>
                      <h5 className="text-accent font-medium uppercase tracking-wider text-xs mb-6 italic">{menuPesce.subtitle}</h5>
                      <ul className="space-y-3 mb-8 flex-grow text-sm">
                        {menuPesce.courses.map((course, i) => (
                          <li key={i} className="flex items-center gap-2 border-b border-white/5 pb-2">
                            <span className="text-accent font-bold">{course.count}</span>
                            <span className="text-muted-foreground">{course.label}</span>
                          </li>
                        ))}
                        <li className="text-xs text-muted-foreground/60 mt-4 italic">{menuPesce.note}</li>
                      </ul>
                    </div>
                  </Card>
                )}

                {/* Meat Menu */}
                {menuCarne.active && (
                  <Card className="relative overflow-hidden group border-none shadow-xl bg-secondary/30">
                    <div className="absolute top-0 right-0 p-6 z-10">
                      <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full font-bold shadow-lg">{menuCarne.price}</span>
                    </div>
                    <div className="p-8 h-full flex flex-col border-t-2 border-accent/10">
                      <h4 className="font-serif text-2xl font-bold mb-4">{menuCarne.title}</h4>
                      <h5 className="text-accent font-medium uppercase tracking-wider text-xs mb-6 italic">{menuCarne.subtitle}</h5>
                      <ul className="space-y-3 mb-8 flex-grow text-sm">
                        {menuCarne.courses.map((course, i) => (
                          <li key={i} className="flex items-center gap-2 border-b border-white/5 pb-2">
                            <span className="text-accent font-bold">{course.count}</span>
                            <span className="text-muted-foreground">{course.label}</span>
                          </li>
                        ))}
                        <li className="text-xs text-muted-foreground/60 mt-4 italic">{menuCarne.note}</li>
                      </ul>
                    </div>
                  </Card>
                )}
              </div>

              {/* Sunday Quick features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {siteConfig.quickFeatures.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl border border-white/5">
                    {quickFeatureIcons[item.id]}
                    <span className="text-xs font-bold uppercase tracking-tight">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Giro Pasta Section */}
        {giroPastaSection.active && giroPasta.active && (
          <div className="bg-card rounded-3xl p-8 md:p-12 mb-20 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mt-32 blur-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                {giroPastaSection.kicker && (
                  <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">
                    {giroPastaSection.kicker}
                  </span>
                )}
                <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">{giroPastaSection.title}</h3>
                {giroPastaSection.description && (
                  <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed italic">
                    {giroPastaSection.description}
                  </p>
                )}
              </div>

              {/* Giro Pasta Promotional Video */}
              {giroPastaSection.video && (
                <div className="max-w-md mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                  <LazyVideo aspect="4/5" src={giroPastaSection.video} poster={giroPastaSection.poster ?? ""} className="w-full h-auto bg-black" />
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-12">
                {/* Appetizers */}
                <div className="lg:col-span-1">
                  <h4 className="font-serif text-xl font-bold mb-6 text-accent flex items-center gap-2">
                    <Utensils size={20} /> Gli Antipasti
                  </h4>
                  <ul className="space-y-4">
                    {giroPasta.antipasti.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pasta Selection */}
                <div className="lg:col-span-2">
                  <h4 className="font-serif text-xl font-bold mb-6 text-accent flex items-center gap-2">
                    <Sparkles size={20} /> {giroPasta.primiHeading}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {giroPasta.primi.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl border border-white/10 group hover:border-accent/40 transition-colors">
                        <span className="text-accent font-bold text-xs">{i + 1}</span>
                        <span className="text-sm font-bold group-hover:text-foreground transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Conditions */}
              <div className="mt-12 pt-12 border-t border-white/5 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {giroPasta.conditions.map((condition) =>
                  condition.value ? (
                    <div key={condition.id} className="flex flex-col items-center text-center p-4 bg-accent/5 rounded-2xl border border-accent/10">
                      <span className="text-accent font-bold text-2xl mb-1">{condition.value}</span>
                      <span className="text-xs uppercase font-medium text-muted-foreground">{condition.label}</span>
                    </div>
                  ) : (
                    <div key={condition.id} className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-2xl">
                      {giroPastaConditionIcons[condition.id]}
                      <span className="text-xs font-bold uppercase tracking-tight">{condition.label}</span>
                      {condition.sublabel && (
                        <span className="text-[10px] text-muted-foreground uppercase">{condition.sublabel}</span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Special Events Section */}
        {eventiSection.active && (
          <div className="text-center">
            {eventiSection.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
                <Sparkles size={16} />
                <span>{eventiSection.badge}</span>
              </div>
            )}
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">{eventiSection.title}</h2>
            {eventiSection.description && (
              <p className="text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">{eventiSection.description}</p>
            )}

            {/* Events Promotional Video */}
            {eventiSection.video && (
              <div className="max-w-md mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <LazyVideo aspect="4/5" src={eventiSection.video} poster={eventiSection.poster ?? ""} className="w-full h-auto bg-black" />
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {siteConfig.eventTypes.map((event) => (
                <Card key={event.id} className="p-6 border-none shadow-lg hover:translate-y-[-5px] transition-all duration-300 group">
                  <div className="flex justify-center mb-4">
                    <div className="bg-secondary p-4 rounded-full text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                      {eventTypeIcons[event.id]}
                    </div>
                  </div>
                  <h4 className="font-bold uppercase tracking-tighter text-sm">{event.title}</h4>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Compleanni dei Bambini nel Gazebo */}
        {compleanniGazebo.active && (
          <div id="compleanni-bimbi" className="mt-4 scroll-mt-24 bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
                <Sparkles size={16} />
                <span>{compleanniGazebo.badge}</span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">{compleanniGazebo.title}</h2>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-3 font-medium">{compleanniGazebo.lead}</p>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">{compleanniGazebo.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
                {compleanniGazebo.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-secondary/30 rounded-2xl border border-white/5">
                    <span className="text-3xl">{highlight.emoji}</span>
                    <div className="text-left">
                      <p className="font-bold text-foreground text-sm">{highlight.title}</p>
                      <p className="text-muted-foreground text-xs mt-1">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Video */}
              <div className="max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <LazyVideo aspect="16/9" src={compleanniGazebo.video} poster={compleanniGazebo.poster} className="w-full h-auto bg-black" />
              </div>

              <div className="flex justify-center">
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold hover:bg-accent/90 hover:scale-105 transition-all shadow-lg text-base"
                >
                  <Phone size={18} />
                  {compleanniGazebo.ctaLabel}
                </a>
              </div>

              <p className="mt-10 text-xs text-muted-foreground/60 italic">{compleanniGazebo.footerNote}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
