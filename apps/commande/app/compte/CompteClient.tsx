'use client'

import { createClient } from '@instantdessert/supabase'
import { useRouter } from 'next/navigation'
import { useCart } from '../../lib/cart'
import { PRODUCTS } from '../../lib/products'
import Link from 'next/link'

interface Props {
  email: string
  prenom: string
  createdAt: string
  points?: number
  referralCode?: string | null
}

// Commandes fictives pour la preview — remplacées par Supabase une fois configuré
const MOCK_COMMANDES = [
  {
    id: 'CMD-2024-001',
    date: '2026-05-20',
    total: 26.50,
    statut: 'Livré',
    items: [
      { productId: '2', nom: 'Paris-Brest praliné', prix: 7.50, quantite: 1 },
      { productId: '3', nom: 'Fondant chocolat noir 70%', prix: 5.90, quantite: 2 },
      { productId: '4', nom: 'Millefeuille vanille Bourbon', prix: 7.20, quantite: 1 },
    ],
  },
  {
    id: 'CMD-2024-002',
    date: '2026-05-15',
    total: 14.40,
    statut: 'Livré',
    items: [
      { productId: '1', nom: 'Tarte au citron meringuée', prix: 6.90, quantite: 1 },
      { productId: '8', nom: 'Financier amande & miel', prix: 3.50, quantite: 2 },
    ],
  },
]

export function CompteClient({ email, prenom, createdAt, points = 0, referralCode }: Props) {
  const router = useRouter()
  const { addItem } = useCart()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  function handleReorder(items: typeof MOCK_COMMANDES[0]['items']) {
    items.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.productId)
      if (product) {
        for (let i = 0; i < item.quantite; i++) addItem(product)
      }
    })
    router.push('/panier')
  }

  const initiale = prenom ? prenom[0].toUpperCase() : email[0].toUpperCase()
  const dateInscription = new Date(createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">

      {/* Profil */}
      <div className="space-y-4">
        <div className="bg-white border border-blush rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-rose flex items-center justify-center shrink-0">
              <span className="font-display text-2xl text-white">{initiale}</span>
            </div>
            <div>
              <p className="font-display text-xl text-chocolat">{prenom || 'Mon compte'}</p>
              <p className="font-body text-xs text-chocolat/50">Membre depuis le {dateInscription}</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-blush pt-4">
            <div className="space-y-1">
              <p className="font-body text-xs text-chocolat/40 uppercase tracking-wide">Email</p>
              <p className="font-body text-sm text-chocolat">{email}</p>
            </div>
            {prenom && (
              <div className="space-y-1">
                <p className="font-body text-xs text-chocolat/40 uppercase tracking-wide">Prénom</p>
                <p className="font-body text-sm text-chocolat">{prenom}</p>
              </div>
            )}
          </div>

          <button onClick={handleSignOut}
            className="w-full min-h-[40px] px-4 inline-flex items-center justify-center font-body text-sm border border-chocolat/20 text-chocolat/60 rounded-full hover:border-chocolat hover:text-chocolat transition-colors">
            Se déconnecter
          </button>
        </div>

        {/* Carte fidélité */}
        <div className="bg-white border border-blush rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-display text-base text-chocolat">Mes points</p>
            <span className="font-body text-xs text-rose uppercase tracking-widest">Fidélité</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="font-display text-4xl text-caramel">{points}</span>
            <span className="font-body text-sm text-chocolat/40 mb-1">pts</span>
          </div>
          <p className="font-body text-xs text-chocolat/40 leading-snug">
            1€ dépensé = 1 point. Cumulez des points à chaque commande pour débloquer des avantages exclusifs.
          </p>
          <div className="w-full bg-blush rounded-full h-1.5">
            <div
              className="bg-caramel h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(100, (points / 100) * 100)}%` }}
            />
          </div>
          <p className="font-body text-xs text-chocolat/30 text-right">{points}/100 pts pour le prochain palier</p>
        </div>

        {/* Parrainage */}
        {referralCode && (
          <div className="bg-white border border-blush rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-display text-base text-chocolat">Parrainer un ami</p>
              <span className="font-body text-xs text-caramel uppercase tracking-widest">-5€</span>
            </div>
            <p className="font-body text-xs text-chocolat/50 leading-snug">
              Partagez votre code. Votre ami obtient 5€ de réduction sur sa première commande, vous gagnez 10 points.
            </p>
            <div className="flex items-center gap-2">
              <span className="flex-1 font-body text-sm text-chocolat font-semibold tracking-widest bg-blush/40 border border-blush rounded-lg px-4 py-2 text-center">
                {referralCode}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(referralCode)}
                className="min-h-[40px] px-4 font-body text-xs bg-chocolat text-creme rounded-lg hover:opacity-80 transition-opacity shrink-0"
              >
                Copier
              </button>
            </div>
          </div>
        )}

        <Link href="/catalogue"
          className="min-h-[44px] flex items-center justify-center px-6 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
          Commander à nouveau
        </Link>
      </div>

      {/* Historique */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="font-display text-xl text-chocolat">Mes commandes</h2>

        <div className="space-y-4">
          {MOCK_COMMANDES.map(cmd => (
            <div key={cmd.id} className="bg-white border border-blush rounded-2xl overflow-hidden">
              {/* En-tête commande */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-blush bg-blush/10">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-body text-xs text-chocolat/50 uppercase tracking-wide">Commande</p>
                    <p className="font-body text-sm text-chocolat font-medium">#{cmd.id}</p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-chocolat/50 uppercase tracking-wide">Date</p>
                    <p className="font-body text-sm text-chocolat">
                      {new Date(cmd.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-chocolat/50 uppercase tracking-wide">Total</p>
                    <p className="font-display text-base text-caramel">{cmd.total.toFixed(2)} €</p>
                  </div>
                </div>
                <span className="font-body text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                  {cmd.statut}
                </span>
              </div>

              {/* Articles */}
              <div className="px-5 py-3 space-y-2">
                {cmd.items.map(item => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <span className="font-body text-sm text-chocolat/70">{item.nom} ×{item.quantite}</span>
                    <span className="font-body text-sm text-chocolat">{(item.prix * item.quantite).toFixed(2)} €</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="px-5 py-4 border-t border-blush">
                <button onClick={() => handleReorder(cmd.items)}
                  className="min-h-[40px] px-5 inline-flex items-center font-body text-sm bg-rose text-white rounded-full hover:opacity-90 transition-opacity">
                  Re-commander →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
