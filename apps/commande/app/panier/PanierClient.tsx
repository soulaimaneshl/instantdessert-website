'use client'

import Link from 'next/link'
import { useCart } from '../../lib/cart'
import { PRODUCTS } from '../../lib/products'
import type { Product } from '../../lib/products'

export function PanierClient() {
  const { items, removeItem, updateQuantity, total, count } = useCart()

  const suggestions: Product[] = PRODUCTS
    .filter(p => !items.some(i => i.productId === p.id))
    .slice(0, 4)

  if (items.length === 0) {
    return (
      <div className="space-y-16">
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center mx-auto mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-chocolat/40">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <p className="font-display text-2xl text-chocolat/50 mb-1">Votre panier est vide</p>
          <p className="font-body text-sm text-chocolat/30 mb-8">Découvrez nos pâtisseries artisanales</p>
          <Link href="/catalogue"
            className="min-h-[44px] inline-flex items-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
            Voir le catalogue →
          </Link>
        </div>

        {suggestions.length > 0 && <Suggestions products={suggestions} />}
      </div>
    )
  }

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-3 gap-8 items-start">

        {/* Articles */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-display text-xl text-chocolat">
            {count} article{count > 1 ? 's' : ''} dans votre panier
          </h2>
          <div className="divide-y divide-blush border border-blush rounded-2xl overflow-hidden">
            {items.map(item => (
              <div key={item.productId} className="flex items-center gap-4 px-5 py-4 bg-white">
                <div className="w-14 h-14 rounded-xl bg-blush/20 flex items-center justify-center shrink-0">
                  <span className="text-2xl">🧁</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm text-chocolat font-medium leading-snug">{item.nom}</p>
                  <p className="font-body text-xs text-chocolat/40 mt-0.5">{item.prix.toFixed(2)} € / pièce</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => updateQuantity(item.productId, item.quantite - 1)}
                    className="w-7 h-7 rounded-full border border-blush text-chocolat hover:border-chocolat transition-colors flex items-center justify-center font-body text-sm">
                    −
                  </button>
                  <span className="w-6 text-center font-body text-sm text-chocolat">{item.quantite}</span>
                  <button onClick={() => updateQuantity(item.productId, item.quantite + 1)}
                    className="w-7 h-7 rounded-full bg-rose text-white hover:opacity-90 transition-opacity flex items-center justify-center font-body text-sm">
                    +
                  </button>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-base text-chocolat">{(item.prix * item.quantite).toFixed(2)} €</p>
                  <button onClick={() => removeItem(item.productId)}
                    className="font-body text-xs text-chocolat/30 hover:text-red-400 transition-colors mt-1">
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link href="/catalogue" className="font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors inline-block">
            ← Continuer mes achats
          </Link>
        </div>

        {/* Récapitulatif */}
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-4 sticky top-24">
          <h2 className="font-display text-xl text-chocolat">Récapitulatif</h2>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.productId} className="flex justify-between">
                <span className="font-body text-xs text-chocolat/60 truncate mr-2">{item.nom} ×{item.quantite}</span>
                <span className="font-body text-xs text-chocolat shrink-0">{(item.prix * item.quantite).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className="border-t border-blush pt-3 flex justify-between items-baseline">
            <span className="font-body text-sm text-chocolat/60">Livraison</span>
            <span className="font-body text-xs text-caramel">Calculée à l'étape suivante</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-display text-lg text-chocolat">Total</span>
            <span className="font-display text-2xl text-chocolat">{total.toFixed(2)} €</span>
          </div>
          <Link href="/connexion"
            className="min-h-[52px] flex items-center justify-center w-full bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
            Passer la commande →
          </Link>
          <p className="font-body text-xs text-chocolat/30 text-center">Paiement sécurisé — Stripe</p>
        </div>
      </div>

      {suggestions.length > 0 && <Suggestions products={suggestions} />}
    </div>
  )
}

function Suggestions({ products }: { products: Product[] }) {
  return (
    <section>
      <div className="mb-6">
        <p className="font-body text-xs text-rose uppercase tracking-widest mb-1">Vous aimerez aussi</p>
        <h2 className="font-display text-2xl text-chocolat">Ces desserts pourraient vous plaire</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <Link key={p.id} href={`/catalogue/${p.id}`}
            className="group bg-white border border-blush rounded-2xl overflow-hidden hover:shadow-md hover:border-rose/30 transition-all">
            <div className="aspect-square bg-blush/20 flex items-center justify-center group-hover:bg-blush/30 transition-colors">
              <span className="text-4xl">🧁</span>
            </div>
            <div className="p-3 space-y-1">
              <p className="font-body text-xs text-rose uppercase tracking-wider">{p.categorie}</p>
              <p className="font-display text-base text-chocolat leading-snug">{p.nom}</p>
              <p className="font-display text-base text-caramel">{p.prix.toFixed(2)} €</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
