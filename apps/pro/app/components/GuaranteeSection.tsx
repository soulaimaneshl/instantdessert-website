const GUARANTEES = [
  {
    icon: '🌅',
    title: 'Préparé chaque matin',
    description: 'Tous nos desserts sont fabriqués le jour même, sans stock dormant.',
  },
  {
    icon: '🚫',
    title: 'Zéro conservateur',
    description: 'Ingrédients bruts, sans additif ni conservateur artificiel.',
  },
  {
    icon: '📋',
    title: 'Traçabilité complète',
    description: 'Fiches techniques, DLC et allergènes fournis pour chaque produit.',
  },
  {
    icon: '🚚',
    title: 'Livraison en Hauts-de-Seine',
    description: "Créneaux fixes matin et midi, ponctualité garantie contractuellement.",
  },
  {
    icon: '💻',
    title: 'Commande 100% en ligne',
    description: 'Votre espace partenaire pour commander, suivre et rejouer vos commandes.',
  },
]

export function GuaranteeSection() {
  return (
    <section className="bg-chocolat py-14">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-2xl text-creme text-center mb-10">
          Nos engagements partenaires
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {GUARANTEES.map((g) => (
            <div key={g.title} className="flex flex-col items-center text-center gap-3">
              <span className="text-3xl" aria-hidden="true">{g.icon}</span>
              <h3 className="font-display text-base text-creme leading-snug">{g.title}</h3>
              <p className="font-body text-xs text-creme/60 leading-relaxed">{g.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
