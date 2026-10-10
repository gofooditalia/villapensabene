import type { SiteConfig } from "@/data/site.config"

// Cerca `id` tra sections, pizzaFormulas, fixedMenus, giroPasta e
// seasonalFeatures e restituisce il loro `active`. Usato per nascondere
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
