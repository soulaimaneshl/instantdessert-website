'use client'

import { createClient } from '@instantdessert/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Props {
  email: string
  prenom: string
  createdAt: string
}

export function CompteClient({ email, prenom, createdAt }: Props) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
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

        <Link href="/catalogue"
          className="min-h-[44px] flex items-center justify-center px-6 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
          Commander à nouveau
        </Link>
      </div>

      {/* Historique */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="font-display text-xl text-chocolat">Mes commandes</h2>

        <div className="bg-white border border-blush rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center mx-auto">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-chocolat/40">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <div>
            <p className="font-display text-xl text-chocolat/50">Aucune commande pour l'instant</p>
            <p className="font-body text-sm text-chocolat/30 mt-1">Vos prochaines commandes apparaîtront ici</p>
          </div>
          <Link href="/catalogue"
            className="min-h-[44px] inline-flex items-center px-8 py-3 border border-blush text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
            Découvrir nos délices →
          </Link>
        </div>
      </div>

    </div>
  )
}
