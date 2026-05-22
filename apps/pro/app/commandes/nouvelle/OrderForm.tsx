'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitOrder, type OrderLine } from './actions'
import { DRAFTS_KEY, type Draft } from '../DraftsList'

interface Product {
  id: string
  nom: string
  categorie: string
  conditionnement: string
  prix_b2b: number
}

const PRODUCTS: Product[] = [
  { id: '1', nom: 'Tarte au citron meringuée', categorie: 'Tartes', conditionnement: 'Pièce individuelle (Ø 10cm)', prix_b2b: 4.50 },
  { id: '2', nom: 'Paris-Brest praliné', categorie: 'Choux', conditionnement: 'Pièce individuelle (Ø 12cm)', prix_b2b: 5.20 },
  { id: '3', nom: 'Fondant chocolat noir 70%', categorie: 'Chocolat', conditionnement: 'Pièce individuelle (80g)', prix_b2b: 3.80 },
  { id: '4', nom: 'Millefeuille vanille Bourbon', categorie: 'Classiques', conditionnement: 'Rectangle 6×12cm', prix_b2b: 5.50 },
]

interface Props {
  initialQuantities?: Record<string, number>
  draftId?: string
}

export function OrderForm({ initialQuantities = {}, draftId }: Props) {
  const router = useRouter()
  const [quantities, setQuantities] = useState<Record<string, number>>(initialQuantities)
  const isReorder = Object.keys(initialQuantities).length > 0
  const [step, setStep] = useState<'compose' | 'confirm'>('compose')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  function setQty(id: string, value: number) {
    setQuantities(q => ({ ...q, [id]: Math.max(0, value) }))
  }

  const lines = PRODUCTS
    .filter(p => (quantities[p.id] ?? 0) > 0)
    .map(p => ({ productId: p.id, nom: p.nom, quantite: quantities[p.id], prixUnitaire: p.prix_b2b }))

  const total = lines.reduce((s, l) => s + l.prixUnitaire * l.quantite, 0)
  const hasItems = lines.length > 0

  function saveDraft() {
    const draft: Draft = {
      id: crypto.randomUUID(),
      items: lines as Draft['items'],
      savedAt: new Date().toISOString(),
    }
    try {
      const existing: Draft[] = JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]')
      localStorage.setItem(DRAFTS_KEY, JSON.stringify([...existing, draft]))
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {}
  }

  function deleteDraft() {
    if (!draftId) return
    try {
      const drafts: Draft[] = JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]')
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts.filter(d => d.id !== draftId)))
    } catch {}
  }

  async function confirm() {
    setSubmitting(true)
    setError('')
    const result = await submitOrder(lines as OrderLine[])
    setSubmitting(false)
    if (result.success) {
      deleteDraft()
      router.push(`/commandes/confirmation?id=${result.orderId ?? 'mock'}`)
    } else {
      setError(result.error ?? 'Erreur inconnue')
    }
  }

  if (step === 'confirm') {
    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl text-chocolat">Confirmer la commande</h2>
        <div className="bg-blush/30 rounded-xl divide-y divide-blush">
          {lines.map(l => (
            <div key={l.productId} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-body text-sm text-chocolat font-medium">{l.nom}</p>
                <p className="font-body text-xs text-chocolat/50">× {l.quantite}</p>
              </div>
              <span className="font-body text-sm text-chocolat">
                {(l.prixUnitaire * l.quantite).toFixed(2)} €
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-5 py-4 bg-chocolat/5 rounded-b-xl">
            <span className="font-display text-lg text-chocolat">Total</span>
            <span className="font-display text-lg text-chocolat">{total.toFixed(2)} €</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-body text-sm text-red-700">
            {error} <button onClick={confirm} className="ml-2 underline">Réessayer</button>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => setStep('compose')} disabled={submitting}
            className="min-h-[44px] px-6 py-2 border border-chocolat/30 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
            Modifier
          </button>
          <button onClick={confirm} disabled={submitting}
            className="min-h-[44px] flex-1 px-6 py-2 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity disabled:opacity-50">
            {submitting ? 'Envoi...' : 'Valider la commande'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-chocolat">
          {draftId ? 'Reprendre votre réserve' : isReorder ? 'Modifier et re-commander' : 'Composer une commande'}
        </h2>
        {(draftId || isReorder) && (
          <p className="font-body text-sm text-chocolat/50 mt-1">
            Modifiez les quantités puis validez votre commande.
          </p>
        )}
      </div>

      <div className="divide-y divide-blush border border-blush rounded-xl overflow-hidden">
        {PRODUCTS.map(p => {
          const qty = quantities[p.id] ?? 0
          return (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4 bg-white">
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-chocolat font-medium leading-snug">{p.nom}</p>
                <p className="font-body text-xs text-chocolat/40">{p.categorie} · {p.conditionnement}</p>
              </div>
              <span className="font-body text-sm text-caramel font-semibold shrink-0">
                {p.prix_b2b.toFixed(2)} €
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setQty(p.id, qty - 1)}
                  className="w-8 h-8 rounded-full border border-blush text-chocolat hover:border-chocolat transition-colors flex items-center justify-center font-body text-base"
                  aria-label={`Retirer ${p.nom}`}>−</button>
                <span className="w-6 text-center font-body text-sm text-chocolat">{qty}</span>
                <button onClick={() => setQty(p.id, qty + 1)}
                  className="w-8 h-8 rounded-full bg-rose text-white hover:opacity-90 transition-opacity flex items-center justify-center font-body text-base"
                  aria-label={`Ajouter ${p.nom}`}>+</button>
              </div>
            </div>
          )
        })}
      </div>

      {!hasItems && (
        <p className="text-center font-body text-sm text-chocolat/40 py-4">
          Ajoutez des produits pour composer votre commande.
        </p>
      )}

      {/* Barre flottante */}
      {hasItems && (
        <div className="sticky bottom-4 bg-chocolat text-creme rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-body text-xs text-creme/60">{lines.length} produit{lines.length > 1 ? 's' : ''}</p>
              <p className="font-display text-xl">{total.toFixed(2)} €</p>
            </div>
            <button onClick={() => setStep('confirm')}
              className="min-h-[44px] px-6 py-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
              Voir le récapitulatif →
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-creme/10 pt-3">
            {saved ? (
              <span className="font-body text-xs text-creme/70">✓ Ajouté à votre réserve gourmande</span>
            ) : (
              <button onClick={saveDraft}
                className="font-body text-xs text-creme/50 hover:text-creme transition-colors underline underline-offset-2">
                Sauvegarder pour plus tard
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
