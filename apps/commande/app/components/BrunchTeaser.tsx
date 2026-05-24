'use client'

import { useActionState } from 'react'
import { joinWaitlist } from '../actions/waitlist'

const initialState = { success: false, error: null }

export function BrunchTeaser() {
  const [state, action, pending] = useActionState(joinWaitlist, initialState)

  return (
    <section className="bg-blush/40 border-y border-blush">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-4">

          {/* Badge */}
          <span className="inline-block font-body text-xs text-caramel uppercase tracking-widest border border-caramel/40 px-3 py-1 rounded-full">
            Bientôt disponible
          </span>

          {/* Titre */}
          <h2 className="font-display text-3xl md:text-4xl text-chocolat">
            Le Brunch Instant Dessert arrive
          </h2>
          <p className="font-body text-sm text-chocolat/60 leading-relaxed max-w-md mx-auto">
            Viennoiseries maison, œufs parfaits, plateau de fromages affinés et nos pâtisseries signatures — tout ça livré le dimanche matin. Soyez les premiers à le savoir.
          </p>

          {/* Icônes */}
          <div className="flex justify-center gap-6 py-2">
            {[
              { emoji: '🥐', label: 'Viennoiseries' },
              { emoji: '🍳', label: 'Salé' },
              { emoji: '🧁', label: 'Pâtisseries' },
              { emoji: '☕', label: 'Boissons' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-body text-xs text-chocolat/50">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Formulaire ou confirmation */}
          {state.success ? (
            <div className="mt-6 inline-flex items-center gap-2 bg-white border border-rose/30 text-chocolat font-body text-sm px-6 py-3 rounded-full shadow-sm">
              <span className="text-rose text-base">✓</span>
              Vous êtes sur la liste ! On vous préviendra en avant-première.
            </div>
          ) : (
            <form action={action} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="text"
                name="prenom"
                placeholder="Prénom (optionnel)"
                className="flex-none sm:w-32 min-h-[44px] px-4 font-body text-sm bg-white border border-blush rounded-full text-chocolat placeholder-chocolat/30 focus:outline-none focus:border-rose transition-colors"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Votre email"
                className="flex-1 min-h-[44px] px-4 font-body text-sm bg-white border border-blush rounded-full text-chocolat placeholder-chocolat/30 focus:outline-none focus:border-rose transition-colors"
              />
              <button
                type="submit"
                disabled={pending}
                className="min-h-[44px] px-6 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity disabled:opacity-50 shrink-0"
              >
                {pending ? '...' : "M'inscrire"}
              </button>
            </form>
          )}

          {state.error && (
            <p className="font-body text-xs text-rose mt-2">{state.error}</p>
          )}

          <p className="font-body text-xs text-chocolat/30 mt-2">
            Pas de spam. Désabonnement en un clic.
          </p>
        </div>
      </div>
    </section>
  )
}
