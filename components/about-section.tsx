"use client"

import { LazyVideo } from "@/components/lazy-video"
import { Card } from "@/components/ui/card"
import { Utensils, Waves, TreePine, Baby, Clock, ScrollText, Sparkles, PartyPopper, Cake, Wine, Phone } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Intro Section */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Tradizione e Passione</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">Villa Pensabene ti aspetta! 🍝</h2>
          <div className="h-1 w-20 bg-accent mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            {"Vieni a scoprire il gusto autentico della tradizione siciliana nel cuore di Palermo. La nostra cucina celebra i sapori della terra e del mare con ingredienti freschissimi e ricette artigianali."}
          </p>
        </div>

        {/* Giro Pizza Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Serata Pizza</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">{"I nostri \"Giro Pizza\" 🍕"}</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed italic">
              {"Scegli la formula perfetta per la tua serata in compagnia. Pizze artigianali a volontà e tutto il gusto della tradizione."}
            </p>
          </div>

          {/* Giro Pizza Promotional Video */}
          <div className="max-w-md mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <LazyVideo src="/giropizza.mp4" poster="/posters/giropizza.jpg" className="w-full h-auto bg-black" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formula €15 */}
            <Card className="relative overflow-hidden border-none shadow-2xl bg-card transition-transform hover:scale-[1.01] duration-300">
              <div className="absolute top-0 right-0 p-6 z-10">
                <span className="bg-accent text-accent-foreground px-5 py-1.5 rounded-full font-bold shadow-lg text-lg">15,00€</span>
              </div>
              <div className="p-8 md:p-12 h-full flex flex-col">
                <h4 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                  <Utensils className="text-accent" size={24} /> Giro Pizza Base
                </h4>

                <div className="space-y-8 flex-grow">
                  <div>
                    <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Antipasti inclusi</h5>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        <span className="text-sm font-medium">Antipasto Caldo</span>
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                        <span className="text-sm font-medium">Sfincionello Palermitano</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">La Pizza</h5>
                    <div className="bg-secondary/30 p-4 rounded-xl border border-white/5">
                      <p className="text-sm font-bold text-foreground leading-snug">Giro Pizze tra le nostre diverse varietà a volontà</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Bevande</h5>
                    <ul className="grid grid-cols-1 gap-2">
                      <li className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" /> Coca Cola 1L (1 ogni 4 pers.)
                      </li>
                      <li className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" /> Birra 66cl (1 ogni 3 pers.)
                      </li>
                      <li className="text-xs text-muted-foreground flex items-center gap-2 font-bold text-accent/80">
                        <span className="w-1 h-1 rounded-full bg-accent" /> Acqua Libera
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Formula €18 */}
            <Card className="relative overflow-hidden border-none shadow-2xl bg-card border-t-4 border-accent transition-transform hover:scale-[1.01] duration-300">
              <div className="absolute top-0 right-0 p-6 z-10">
                <span className="bg-accent text-accent-foreground px-5 py-1.5 rounded-full font-bold shadow-lg text-lg">18,00€</span>
              </div>
              <div className="p-8 md:p-12 h-full flex flex-col">
                <h4 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                  <Sparkles className="text-accent" size={24} /> Giro Pizza Completo
                </h4>

                <div className="space-y-8 flex-grow">
                  <div>
                    <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Antipasti Rinforzati</h5>
                    <ul className="grid grid-cols-2 gap-3">
                      {[
                        "Antipasto Caldo",
                        "Bruschette Classiche",
                        "Sfincionello tipico",
                        "Focaccine Miste"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1 h-1 rounded-full bg-accent/60" />
                          <span className="text-xs font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-muted-foreground/60 italic mt-3">*Focaccine: Ricotta, Porchetta, Panelline</p>
                  </div>

                  <div>
                    <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">La Pizza</h5>
                    <div className="bg-accent/5 p-4 rounded-xl border border-accent/10">
                      <p className="text-sm font-bold text-foreground leading-snug">Giro Pizze tra le nostre diverse varietà a volontà</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Bevande</h5>
                    <ul className="grid grid-cols-1 gap-2">
                      <li className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" /> Coca Cola 1L (1 ogni 4 pers.)
                      </li>
                      <li className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" /> Birra 66cl (1 ogni 3 pers.)
                      </li>
                      <li className="text-xs text-muted-foreground flex items-center gap-2 font-bold text-accent/80">
                        <span className="w-1 h-1 rounded-full bg-accent" /> Acqua Libera
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Our Specialties Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { icon: <Waves className="text-accent" />, title: "Pesce Freschissimo" },
            { icon: <TreePine className="text-accent" />, title: "Carni alla Griglia" },
            { icon: <Utensils className="text-accent" />, title: "Giropizza Artigianale" },
            { icon: <ScrollText className="text-accent" />, title: "Giropasta Tradizionale" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-4 bg-card/50 rounded-2xl border border-white/5 shadow-sm">
              <div className="mb-3 bg-secondary p-3 rounded-full">{item.icon}</div>
              <span className="text-sm font-bold text-center uppercase tracking-tighter">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Agriturismo in Città Focus */}
        <div id="pranzo-domenica" className="scroll-mt-24 bg-card rounded-3xl p-8 md:p-12 mb-20 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
                <Sparkles size={16} />
                <span>Ogni Domenica a Pranzo</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-accent mb-4">{"Agriturismo in Città! 🍷🌿"}</h3>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed italic">
                {"Vivi l'esperienza di un vero agriturismo senza lasciare Palermo. Prenota il tuo tavolo per la domenica e goditi un pranzo indimenticabile con tutta la famiglia."}
              </p>
            </div>

            {/* Launch poster + video */}
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto mb-8">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
                <img
                  src="/events/pranzo-domenica-agriturismo/poster.png"
                  alt="Pranzo della Domenica a Villa Pensabene, Agriturismo in Città a Palermo"
                  className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-white/10"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <LazyVideo src="/events/pranzo-domenica-agriturismo/promo.mp4" poster="/posters/promo.jpg" className="w-full h-auto bg-black" />
              </div>
            </div>

            <p className="text-center text-accent font-bold uppercase tracking-widest text-sm mb-10">
              Ogni Domenica a pranzo — prenota il tuo tavolo
            </p>

            {/* Opening hours notice */}
            <div className="max-w-2xl mx-auto mb-16 flex items-start gap-4 bg-accent/10 border border-accent/30 rounded-2xl px-6 py-5">
              <Clock className="text-accent shrink-0 mt-0.5" size={22} />
              <div>
                <p className="font-bold text-accent text-sm uppercase tracking-wider mb-1">Orari di Apertura</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {"Aperti tutti i giorni a cena, la domenica anche a pranzo. Chiusura settimanale: lunedì."}
                </p>
              </div>
            </div>

            {/* Sunday Menus Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Fish Menu */}
              <Card className="relative overflow-hidden group border-none shadow-xl bg-secondary/30">
                <div className="absolute top-0 right-0 p-6 z-10">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full font-bold shadow-lg">35€</span>
                </div>
                <div className="p-8 h-full flex flex-col">
                  <h4 className="font-serif text-2xl font-bold mb-4">Menu di Pesce</h4>
                  <h5 className="text-accent font-medium uppercase tracking-wider text-xs mb-6 italic">"Delizia del Mare"</h5>
                  <ul className="space-y-3 mb-8 flex-grow text-sm">
                    <li className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-accent font-bold">4</span>
                      <span className="text-muted-foreground">Antipasti sfiziosi</span>
                    </li>
                    <li className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-accent font-bold">2</span>
                      <span className="text-muted-foreground">Primi tradizionali</span>
                    </li>
                    <li className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-accent font-bold">1</span>
                      <span className="text-muted-foreground">Secondo con contorno</span>
                    </li>
                    <li className="text-xs text-muted-foreground/60 mt-4 italic">Acqua, Coca Cola e Vino inclusi</li>
                  </ul>
                </div>
              </Card>

              {/* Meat Menu */}
              <Card className="relative overflow-hidden group border-none shadow-xl bg-secondary/30">
                <div className="absolute top-0 right-0 p-6 z-10">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full font-bold shadow-lg">30€</span>
                </div>
                <div className="p-8 h-full flex flex-col border-t-2 border-accent/10">
                  <h4 className="font-serif text-2xl font-bold mb-4">Menu di Carne</h4>
                  <h5 className="text-accent font-medium uppercase tracking-wider text-xs mb-6 italic">"Tesori della Terra"</h5>
                  <ul className="space-y-3 mb-8 flex-grow text-sm">
                    <li className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-accent font-bold">6</span>
                      <span className="text-muted-foreground">Antipasti tipici</span>
                    </li>
                    <li className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-accent font-bold">2</span>
                      <span className="text-muted-foreground">Primi di pasta fresca</span>
                    </li>
                    <li className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <span className="text-accent font-bold">1</span>
                      <span className="text-muted-foreground">Secondo alla brace</span>
                    </li>
                    <li className="text-xs text-muted-foreground/60 mt-4 italic">Acqua, Coca Cola e Vino inclusi</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Sunday Quick features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl border border-white/5">
                <Clock className="text-accent" size={20} />
                <span className="text-xs font-bold uppercase tracking-tight">Giro Pasta - 20€</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl border border-white/5">
                <Baby className="text-accent" size={20} />
                <span className="text-xs font-bold uppercase tracking-tight">Area Giochi Bimbi</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl border border-white/5">
                <ScrollText className="text-accent" size={20} />
                <span className="text-xs font-bold uppercase tracking-tight">Menu alla Carta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giro Pasta Section */}
        <div className="bg-card rounded-3xl p-8 md:p-12 mb-20 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mt-32 blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <span className="text-accent font-medium tracking-widest uppercase text-sm mb-2 block">Novità a Villa Pensabene</span>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">{"Il nostro \"Giro Pasta\" 🍝"}</h3>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed italic">
                {"\"Gentili ospiti, siamo lieti di presentarvi il nostro Giro Pasta! Un'esperienza culinaria completa che inizia con i nostri deliziosi antipasti e prosegue con la scelta delle nostre migliori specialità.\""}
              </p>
            </div>

            {/* Giro Pasta Promotional Video */}
            <div className="max-w-md mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <LazyVideo src="/giropasta.mp4" poster="/posters/giropasta.jpg" className="w-full h-auto bg-black" />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Appetizers */}
              <div className="lg:col-span-1">
                <h4 className="font-serif text-xl font-bold mb-6 text-accent flex items-center gap-2">
                  <Utensils size={20} /> Gli Antipasti
                </h4>
                <ul className="space-y-4">
                  {[
                    "Antipasto caldo",
                    "Sfincionello tipico",
                    "Focaccine alla milza",
                    "Focaccine con ricotta",
                    "Focaccine porchetta e cipolla"
                  ].map((item, i) => (
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
                  <Sparkles size={20} /> I Primi (Scegline 4 portate)
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Penne alla Boscaiola",
                    "Rigatoni alla Carbonara",
                    "Mezze maniche all'Amatriciana",
                    "Casarecce Salsiccia e Funghi",
                    "Farfallette al Salmone",
                    "Fusilli Zucca, Scamorza e Speck",
                    "Tortiglioni Pistacchiosa",
                    "Gnocchi ai 4 Formaggi"
                  ].map((item, i) => (
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
              <div className="flex flex-col items-center text-center p-4 bg-accent/5 rounded-2xl border border-accent/10">
                <span className="text-accent font-bold text-2xl mb-1">20€</span>
                <span className="text-xs uppercase font-medium text-muted-foreground">A Persona</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-2xl">
                <Utensils className="text-accent mb-2" size={20} />
                <span className="text-xs font-bold uppercase tracking-tight">Bevande Incluse</span>
                <span className="text-[10px] text-muted-foreground uppercase">Acqua, Coca Cola, Birra</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-2xl">
                <Clock className="text-accent mb-2" size={20} />
                <span className="text-xs font-bold uppercase tracking-tight">Tutta la settimana</span>
                <span className="text-[10px] text-muted-foreground uppercase">Domenica inclusa</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-secondary/30 rounded-2xl">
                <Baby className="text-accent mb-2" size={20} />
                <span className="text-xs font-bold uppercase tracking-tight">Minimo 8 Adulti</span>
                <span className="text-[10px] text-muted-foreground uppercase">Prenotazione obbligatoria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Events Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
            <Sparkles size={16} />
            <span>I tuoi momenti indimenticabili</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">Organizziamo i tuoi eventi speciali 🎉</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {"Creiamo insieme il tuo evento perfetto con menu personalizzati e un'atmosfera accogliente per festeggiare le tappe più importanti della tua vita."}
          </p>

          {/* Events Promotional Video */}
          <div className="max-w-md mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <LazyVideo src="/eventi.mp4" poster="/posters/eventi.jpg" className="w-full h-auto bg-black" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Baby />, title: "Battesimi" },
              { icon: <Cake />, title: "Compleanni" },
              { icon: <Wine />, title: "Cerimonie" },
              { icon: <PartyPopper />, title: "Feste Private" },
            ].map((event, i) => (
              <Card key={i} className="p-6 border-none shadow-lg hover:translate-y-[-5px] transition-all duration-300 group">
                <div className="flex justify-center mb-4">
                  <div className="bg-secondary p-4 rounded-full text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    {event.icon}
                  </div>
                </div>
                <h4 className="font-bold uppercase tracking-tighter text-sm">{event.title}</h4>
              </Card>
            ))}
          </div>
        </div>

        {/* Compleanni dei Bambini nel Gazebo */}
        <div id="compleanni-bimbi" className="mt-4 scroll-mt-24 bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
              <Sparkles size={16} />
              <span>Novità — Prenota ora</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Compleanni nel Gazebo 🎂✨
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-3 font-medium">
              Hai sentito la novità?
            </p>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              {"Da settembre, i compleanni dei tuoi piccoli trovano la loro location perfetta. Un gazebo incantato, solo per loro — palloncini, torta, sorrisi. E tu che guardi tutto senza pensare a niente. Perché ci pensiamo noi."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
              <div className="flex items-center gap-4 p-5 bg-secondary/30 rounded-2xl border border-white/5">
                <span className="text-3xl">👑</span>
                <div className="text-left">
                  <p className="font-bold text-foreground text-sm">Per la tua piccola principessa</p>
                  <p className="text-muted-foreground text-xs mt-1">Un giorno da regina nel nostro gazebo</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-secondary/30 rounded-2xl border border-white/5">
                <span className="text-3xl">🦸</span>
                <div className="text-left">
                  <p className="font-bold text-foreground text-sm">Per il tuo piccolo ometto</p>
                  <p className="text-muted-foreground text-xs mt-1">Un party da supereroe da ricordare</p>
                </div>
              </div>
            </div>

            {/* Promo Video */}
            <div className="max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <LazyVideo src="/events/compleanni_bimbi/villa pesabene video compleanni pome_001.mp4" poster="/posters/compleanni.jpg" className="w-full h-auto bg-black" />
            </div>

            <div className="flex justify-center">
              <a
                href="tel:+393274146546"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold hover:bg-accent/90 hover:scale-105 transition-all shadow-lg text-base"
              >
                <Phone size={18} />
                Chiama per informazioni e prenotazioni
              </a>
            </div>

            <p className="mt-10 text-xs text-muted-foreground/60 italic">
              🌿 Villa Pensabene — dove ogni momento diventa un ricordo.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
