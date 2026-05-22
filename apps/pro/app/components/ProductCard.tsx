interface Product {
  id: string
  nom: string
  description: string
  categorie: string
  dlc: string
  allergenes: string[]
  conditionnement: string
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-white border border-blush rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Catégorie */}
      <span className="font-body text-xs uppercase tracking-widest text-caramel">
        {product.categorie}
      </span>

      {/* Nom + description */}
      <div className="space-y-1.5">
        <h3 className="font-display text-xl text-chocolat leading-snug">{product.nom}</h3>
        <p className="font-body text-sm text-chocolat/60 leading-relaxed">{product.description}</p>
      </div>

      {/* Métadonnées */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
        <div>
          <dt className="font-body text-xs text-chocolat/40 uppercase tracking-wide">DLC</dt>
          <dd className="font-body text-sm text-chocolat">{product.dlc}</dd>
        </div>
        <div>
          <dt className="font-body text-xs text-chocolat/40 uppercase tracking-wide">Conditionnement</dt>
          <dd className="font-body text-sm text-chocolat">{product.conditionnement}</dd>
        </div>
        <div className="col-span-2">
          <dt className="font-body text-xs text-chocolat/40 uppercase tracking-wide">Allergènes</dt>
          <dd className="font-body text-sm text-chocolat capitalize">{product.allergenes.join(', ')}</dd>
        </div>
      </dl>
    </article>
  )
}
