'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Formule } from '../../../lib/formules'
import { createBrunchCheckout } from './actions'

const inputClass = 'w-full min-h-[44px] px-4 py-2 border border-blush rounded-lg font-body text-sm bg-white text-chocolat placeholder:text-chocolat/30 focus:outline-none focus:ring-2 focus:ring-rose focus:border-rose transition-colors'

// Prochains dimanches disponibles (8 semaines)
function getNextSundays(count = 8): string[] {
  const sundays: string[] = []
  const d = new Date()
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7))
  for (let i = 0; i < count; i++) {
    sundays.push(d.toISOString().split('T')[0])
    d.setDate(d.getDate() + 7)
  }
  return sundays
}

function formatSunday(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

export function ReservationForm({ formule }: { formule: Formule }) {
  const sundays = getNextSundays()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    adresse: '', codePostal: '', ville: '',
    dateBrunch: sundays[0],
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await createBrunchCheckout(formule, {
        prenom: form.prenom, nom: form.nom, email: form.email,
        telephone: form.telephone, adresse: form.adresse,
        codePostal: form.codePostal, ville: form.ville,
        dateBrunch: form.dateBrunch,
      })
    } catch (err: unknown) {
      setLoading(false)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8 items-start">

      {/* Formulaire */}
      <div className="md:col-span-2 space-y-6">

        {/* Date */}
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-xl text-chocolat">Date de livraison</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sundays.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => update('dateBrunch', s)}
                className={`min-h-[44px] px-3 py-2 rounded-xl font-body text-xs text-center transition-all ${
                  form.dateBrunch === s
                    ? 'bg-rose text-white border-2 border-rose'
                    : 'bg-blush/30 text-chocolat border-2 border-transparent hover:border-blush'
                }`}
              >
                {formatSunday(s)}
              </button>
            ))}
          </div>
        </div>

        {/* Coordonnées */}
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-xl text-chocolat">Vos coordonnées</h2>
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
            <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Email</label>
            <input type="email" required value={form.email} onChange={e => update('email', e.target.value)}
              className={inputClass} placeholder="marie@example.com" autoComplete="email" />
          </div>
          <div className="space-y-1">
            <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Téléphone</label>
            <input type="tel" required value={form.telephone} onChange={e => update('telephone', e.target.value)}
              className={inputClass} placeholder="06 12 34 56 78" autoComplete="tel" />
          </div>
        </div>

        {/* Adresse */}
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-xl text-chocolat">Adresse de livraison</h2>
          <div className="space-y-1">
            <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Adresse</label>
            <input type="text" required value={form.adresse} onChange={e => update('adresse', e.target.value)}
              className={inputClass} placeholder="12 rue des Lilas" autoComplete="street-address" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Code postal</label>
              <input type="text" required value={form.codePostal} onChange={e => update('codePostal', e.target.value)}
                className={inputClass} placeholder="92100" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" />
            </div>
            <div className="space-y-1">
              <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Ville</label>
              <input type="text" required value={form.ville} onChange={e => update('ville', e.target.value)}
                className={inputClass} placeholder="Boulogne-Billancourt" autoComplete="address-level2" />
            </div>
          </div>
          <div className="bg-blush/20 border border-blush rounded-xl p-3 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-rose shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="font-body text-xs text-chocolat/60">Livraison uniquement en <strong>Hauts-de-Seine (92)</strong>, entre 9h et 12h.</p>
          </div>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="space-y-4 sticky top-24">
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-xl text-chocolat">Votre brunch</h2>

          <div className="flex items-center gap-3 py-3 border-y border-blush">
            <span className="text-3xl">{formule.emoji}</span>
            <div>
              <p className="font-display text-lg text-chocolat">{formule.nom}</p>
              <p className="font-body text-xs text-chocolat/50">
                {formule.personnes === 1 ? '1 personne' : `${formule.personnes} personnes`}
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            {formule.inclus.map(item => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-caramel text-xs mt-0.5 shrink-0">✓</span>
                <span className="font-body text-xs text-chocolat/60 leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {form.dateBrunch && (
            <div className="bg-blush/30 rounded-xl px-4 py-3">
              <p className="font-body text-xs text-chocolat/50 uppercase tracking-wide mb-1">Date choisie</p>
              <p className="font-body text-sm text-chocolat capitalize">{formatSunday(form.dateBrunch)}</p>
            </div>
          )}

          <div className="border-t border-blush pt-3 flex justify-between items-baseline">
            <span className="font-display text-lg text-chocolat">Total</span>
            <span className="font-display text-2xl text-chocolat">{formule.prix.toFixed(2)} €</span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-body text-sm text-red-700">{error}</div>
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
              `Réserver — ${formule.prix.toFixed(2)} € →`
            )}
          </button>
          <p className="font-body text-xs text-chocolat/30 text-center">Paiement sécurisé — Stripe</p>
        </div>

        <Link href="/" className="block text-center font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
          ← Voir les autres formules
        </Link>
      </div>
    </form>
  )
}
