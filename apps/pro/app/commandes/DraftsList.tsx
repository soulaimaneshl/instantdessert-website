'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DraftItem {
  productId: string
  nom: string
  quantite: number
  prixUnitaire: number
}

export interface Draft {
  id: string
  items: DraftItem[]
  savedAt: string
}

export const DRAFTS_KEY = 'instantdessert_pro_drafts'

export function DraftsList() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(DRAFTS_KEY)
      if (raw) setDrafts(JSON.parse(raw))
    } catch {}
  }, [])

  function deleteDraft(id: string) {
    const updated = drafts.filter(d => d.id !== id)
    setDrafts(updated)
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated))
  }

  function draftLink(draft: Draft) {
    const q = draft.items.map(i => `${i.productId}:${i.quantite}`).join(',')
    return `/commandes/nouvelle?q=${q}&draft_id=${draft.id}`
  }

  function draftTotal(items: DraftItem[]) {
    return items.reduce((s, i) => s + i.prixUnitaire * i.quantite, 0)
  }

  if (!mounted || drafts.length === 0) return null

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-caramel" />
        <h2 className="font-display text-lg text-chocolat">Réserve gourmande</h2>
      </div>
      <div className="space-y-3">
        {drafts.map(draft => (
          <div key={draft.id} className="bg-caramel/5 border border-caramel/20 rounded-2xl overflow-hidden shadow-sm">
            {/* En-tête */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="font-body text-xs text-caramel font-medium uppercase tracking-wider">
                  Délices en attente
                </p>
                <p className="font-body text-xs text-chocolat/40 mt-0.5">
                  {new Date(draft.savedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                  {' · '}
                  {new Date(draft.savedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <span className="font-display text-lg text-chocolat shrink-0">
                {draftTotal(draft.items).toFixed(2)} €
              </span>
            </div>

            {/* Articles */}
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {draft.items.map(i => (
                <span key={i.productId} className="font-body text-xs bg-white text-chocolat/70 border border-caramel/20 px-2.5 py-1 rounded-full">
                  {i.nom.split(' ').slice(0, 3).join(' ')} <span className="text-caramel font-medium">×{i.quantite}</span>
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-5 py-3 bg-white border-t border-caramel/10">
              <button onClick={() => deleteDraft(draft.id)}
                className="font-body text-xs text-chocolat/30 hover:text-red-400 transition-colors">
                Supprimer
              </button>
              <Link href={draftLink(draft)}
                className="min-h-[36px] flex items-center gap-1.5 px-5 py-1.5 bg-caramel text-white font-body text-xs rounded-full hover:opacity-90 transition-opacity">
                Reprendre la commande →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
