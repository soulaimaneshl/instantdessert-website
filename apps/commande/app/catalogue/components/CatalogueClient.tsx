'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '../../../lib/products'

interface Props {
  products: Product[]
  categories: string[]
}

export function CatalogueClient({ products, categories }: Props) {
  const [active, setActive] = useState('Tout')

  const filtered = active === 'Tout' ? products : products.filter(p => p.categorie === active)

  return (
    <div className="space-y-8">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`min-h-[36px] px-4 py-1.5 rounded-full font-body text-sm transition-all ${
              active === cat
                ? 'bg-chocolat text-creme'
                : 'bg-white border border-blush text-chocolat hover:border-chocolat'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grille produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(p => (
          <Link key={p.id} href={`/catalogue/${p.id}`}
            className="group bg-white border border-blush rounded-2xl overflow-hidden hover:shadow-md hover:border-rose/30 transition-all flex flex-col">
            <div className="aspect-square bg-blush/20 flex items-center justify-center group-hover:bg-blush/30 transition-colors">
              <span className="text-5xl">🧁</span>
            </div>
            <div className="p-4 flex flex-col flex-1 gap-1.5">
              <p className="font-body text-xs text-rose uppercase tracking-wider">{p.categorie}</p>
              <p className="font-display text-lg text-chocolat leading-snug">{p.nom}</p>
              <p className="font-body text-xs text-chocolat/50 leading-snug flex-1">{p.description}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="font-display text-xl text-caramel">{p.prix.toFixed(2)} €</p>
                <span className="font-body text-xs text-rose group-hover:underline">Voir →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
