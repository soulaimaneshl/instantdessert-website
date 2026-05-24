'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../../lib/cart'
import { createCheckoutSession } from './actions'

const inputClass = 'w-full min-h-[44px] px-4 py-2 border border-blush rounded-lg font-body text-sm bg-white text-chocolat placeholder:text-chocolat/30 focus:outline-none focus:ring-2 focus:ring-rose focus:border-rose transition-colors'

export function PaiementClient({ userId }: { userId?: string | null }) {
  const { items, total, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newsletter, setNewsletter] = useState(false)

  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (items.length === 0) return
    setLoading(true)
    setError('')
    const adresse = `${form.prenom} ${form.nom} — ${form.adresse}, ${form.codePostal} ${form.ville} — ${form.telephone}`
    try {
      await createCheckoutSession(items, adresse, userId ?? undefined, newsletter)
    } catch (err: unknown) {
      setLoading(false)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-2xl text-chocolat/50 mb-6">Votre panier est vide</p>
        <Link href="/catalogue"
          className="min-h-[44px] inline-flex items-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
          Voir le catalogue →
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handlePay} className="grid md:grid-cols-3 gap-8 items-start">

      {/* Formulaire livraison */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-5">
          <h2 className="font-display text-xl text-chocolat">Adresse de livraison</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Prénom</label>
              <input type="text" required value={form.prenom} onChange={e => update('prenom', e.target.value)}
                className={inputClass} placeholder="Marie" autoComplete="given-name" />
            </div>
            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Nom</label>
              <input type="text" required value={form.nom} onChange={e => update('nom', e.target.value)}
                className={inputClass} placeholder="Dupont" autoComplete="family-name" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Téléphone</label>
            <input type="tel" required value={form.telephone} onChange={e => update('telephone', e.target.value)}
              className={inputClass} placeholder="06 12 34 56 78" autoComplete="tel" />
          </div>

          <div className="space-y-1">
            <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Adresse</label>
            <input type="text" required value={form.adresse} onChange={e => update('adresse', e.target.value)}
              className={inputClass} placeholder="12 rue des Lilas" autoComplete="street-address" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Code postal</label>
              <input type="text" required value={form.codePostal} onChange={e => update('codePostal', e.target.value)}
                className={inputClass} placeholder="92100" autoComplete="postal-code"
                pattern="[0-9]{5}" maxLength={5} />
            </div>
            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Ville</label>
              <input type="text" required value={form.ville} onChange={e => update('ville', e.target.value)}
                className={inputClass} placeholder="Boulogne-Billancourt" autoComplete="address-level2" />
            </div>
          </div>
        </div>

        <div className="bg-blush/20 border border-blush rounded-2xl p-4 flex items-start gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-rose shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="font-body text-xs text-chocolat/70 leading-relaxed">
            Livraison uniquement en <strong>Hauts-de-Seine (92)</strong>, en 45 minutes.
            Le coursier vous contactera par téléphone à la prise en charge.
          </p>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="space-y-4 sticky top-24">
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-xl text-chocolat">Votre commande</h2>
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
            <span className="font-body text-xs text-caramel">Offerte</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-display text-lg text-chocolat">Total</span>
            <span className="font-display text-2xl text-chocolat">{total.toFixed(2)} €</span>
          </div>

          {/* Opt-in newsletter RGPD */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={e => setNewsletter(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-4 h-4 border-2 border-blush rounded peer-checked:bg-rose peer-checked:border-rose transition-colors" />
              {newsletter && (
                <svg className="absolute inset-0 w-4 h-4 text-white pointer-events-none" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="font-body text-xs text-chocolat/60 leading-relaxed">
              Je souhaite recevoir les offres exclusives et actualités d&apos;Instant Dessert par email.
              Désabonnement possible à tout moment.
            </span>
          </label>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-body text-sm text-red-700">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full min-h-[52px] flex items-center justify-center gap-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                  <path d="M21 12a9 9 0 00-9-9"/>
                </svg>
                Redirection vers Stripe...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Payer {total.toFixed(2)} € →
              </>
            )}
          </button>

          <p className="font-body text-xs text-chocolat/30 text-center">Paiement sécurisé — Stripe</p>
        </div>

        <Link href="/panier" className="block text-center font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
          ← Modifier le panier
        </Link>
      </div>
    </form>
  )
}
