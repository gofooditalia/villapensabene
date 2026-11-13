import type { Festivity, SiteConfig } from "@/data/site.config"

// Cerca `id` tra sections, pizzaFormulas, fixedMenus, giroPasta,
// seasonalFeatures e festivities.items e restituisce il loro `active`. Usato per nascondere
// automaticamente le voci (reservationEventOptions, quickFeatures) che
// referenziano una promo/sezione via `relatedPromoId`, così disattivare una
// promo in data/site.config.ts non lascia "appesi" altri punti del sito che
// la citano — nessun elenco di posti-da-ricordare-di-aggiornare a mano.
//
// Se `id` non corrisponde a nulla (es. refuso in relatedPromoId), fallisce
// "aperto": restituisce true, così un typo nasconde al massimo un avviso di
// debug, mai contenuto che dovrebbe essere visibile.
export function isPromoActive(siteConfig: SiteConfig, id: string): boolean {
  const all = [
    ...siteConfig.sections,
    ...siteConfig.pizzaFormulas,
    ...siteConfig.fixedMenus,
    siteConfig.giroPasta,
    ...siteConfig.seasonalFeatures,
    ...siteConfig.festivities.items,
  ]
  const match = all.find((item) => item.id === id)
  if (!match) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[site-helpers] relatedPromoId "${id}" non corrisponde a nessuna promo/sezione in site.config.ts`)
    }
    return true
  }
  return match.active
}

// Una festività è visibile se è attiva e non è ancora passato il suo
// `hideAfter`. `now` è null durante il rendering lato server / prima del
// mount: in quel caso vale solo `active` (niente differenze di idratazione).
export function isFestivityVisible(festivity: Festivity, now: Date | null): boolean {
  if (!festivity.active) return false
  if (!now) return true
  return now < new Date(festivity.hideAfter)
}

// Le feste da mostrare adesso: sezione attiva + schede non scadute.
export function getVisibleFestivities(siteConfig: SiteConfig, now: Date | null): Festivity[] {
  if (!siteConfig.festivities.active) return []
  return siteConfig.festivities.items.filter((item) => isFestivityVisible(item, now))
}

// Addobbi natalizi accesi? (interruttore + data di spegnimento automatico)
export function isFestiveDecorOn(siteConfig: SiteConfig, now: Date | null): boolean {
  const { active, decorActive, decorUntil } = siteConfig.festivities
  if (!active || !decorActive) return false
  if (!now) return true
  return now < new Date(decorUntil)
}
