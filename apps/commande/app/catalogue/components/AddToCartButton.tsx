'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../../../lib/cart'
import type { Product } from '../../../lib/products'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart()
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const cartCount = items.reduce((s, i) => s + i.quantite, 0)

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="pt-2 space-y-3">
      {/* Sélecteur de quantité */}
      <div className="flex items-center gap-4">
        <span className="font-body text-sm text-chocolat/60">Quantité</span>
        <div className="flex items-center gap-3 bg-blush/40 rounded-full px-4 py-2">
          <button onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-7 h-7 rounded-full bg-white border border-blush text-chocolat hover:border-chocolat transition-colors flex items-center justify-center font-body text-base">
            −
          </button>
          <span className="w-6 text-center font-display text-lg text-chocolat">{qty}</span>
          <button onClick={() => setQty(q => q + 1)}
            className="w-7 h-7 rounded-full bg-rose text-white hover:opacity-90 transition-opacity flex items-center justify-center font-body text-base">
            +
          </button>
        </div>
        <span className="font-display text-lg text-caramel">{(product.prix * qty).toFixed(2)} €</span>
      </div>

      {/* Bouton ajouter */}
      <button onClick={handleAdd}
        className={`min-h-[52px] flex items-center justify-center gap-2 w-full font-body text-sm rounded-full transition-all ${
          added ? 'bg-green-600 text-white' : 'bg-chocolat text-creme hover:opacity-80'
        }`}>
        {added ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            {qty > 1 ? `${qty} articles ajoutés !` : 'Ajouté au panier !'}
          </>
        ) : (
          `Ajouter au panier${qty > 1 ? ` (×${qty})` : ''} — ${(product.prix * qty).toFixed(2)} €`
        )}
      </button>

      {cartCount > 0 && (
        <button onClick={() => router.push('/panier')}
          className="min-h-[44px] flex items-center justify-center w-full border border-chocolat/20 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
          Voir le panier ({cartCount})
        </button>
      )}
    </div>
  )
}
