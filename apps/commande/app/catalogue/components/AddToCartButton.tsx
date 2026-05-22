'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../../../lib/cart'
import type { Product } from '../../../lib/products'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, count } = useCart()
  const router = useRouter()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="pt-2 space-y-3">
      <button onClick={handleAdd}
        className={`min-h-[52px] flex items-center justify-center gap-2 w-full font-body text-sm rounded-full transition-all ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-chocolat text-creme hover:opacity-80'
        }`}>
        {added ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Ajouté au panier !
          </>
        ) : (
          `Ajouter au panier — ${product.prix.toFixed(2)} €`
        )}
      </button>
      {count > 0 && (
        <button onClick={() => router.push('/panier')}
          className="min-h-[44px] flex items-center justify-center w-full border border-chocolat/20 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
          Voir le panier ({count})
        </button>
      )}
    </div>
  )
}
