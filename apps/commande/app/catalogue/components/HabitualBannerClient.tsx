'use client'

import { useState } from 'react'
import { useCart } from '../../../lib/cart'
import { PRODUCTS } from '../../../lib/products'

interface OrderItem {
  productId: string
  nom: string
  prix: number
  quantite: number
}

export function HabitualBannerClient({
  items,
  prenom,
}: {
  items: OrderItem[]
  prenom: string | null
}) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleReorder() {
    for (const item of items) {
      const product = PRODUCTS.find(p => p.id === item.productId)
      if (!product) continue
      for (let i = 0; i < item.quantite; i++) addItem(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="mb-8 bg-blush/40 border border-blush rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
      <div className="space-y-2 min-w-0">
        <p className="font-display text-lg text-chocolat">
          {prenom ? `Votre habituel, ${prenom} ?` : 'Votre habituel ?'}
        </p>
        <div className="flex flex-wrap gap-2">
          {items.map(i => (
            <span
              key={i.productId}
              className="font-body text-xs bg-white border border-blush text-chocolat/70 px-3 py-1 rounded-full"
            >
              {i.nom} ×{i.quantite}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleReorder}
        className={`shrink-0 min-h-[40px] px-5 font-body text-sm rounded-full transition-all ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-chocolat text-creme hover:opacity-80'
        }`}
      >
        {added ? '✓ Ajouté !' : 'Recommander'}
      </button>
    </div>
  )
}
