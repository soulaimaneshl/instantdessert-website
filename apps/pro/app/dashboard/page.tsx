import { createClient } from '@instantdessert/supabase/server'
import { Logo } from '@instantdessert/ui'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogoutButton } from './LogoutButton'

export const metadata = { title: 'Dashboard — Instant Dessert Pro' }

async function getRestaurantStatus(userId: string) {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = await (supabase as any)
    .from('restaurants')
    .select('nom, statut_validation')
    .eq('user_id', userId)
    .single()
  return data as { nom: string; statut_validation: 'en_attente' | 'valide' | 'refuse' } | null
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/connexion')

  const restaurant = await getRestaurantStatus(user.id)

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-blush px-6 h-16 flex items-center justify-between">
        <Link href="/"><Logo size={32} /></Link>
        <LogoutButton />
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        {/* Statut en_attente */}
        {(!restaurant || restaurant.statut_validation === 'en_attente') && (
          <div className="max-w-md w-full text-center space-y-5">
            <div className="text-5xl">⏳</div>
            <h1 className="font-display text-2xl text-chocolat">Demande en cours d&apos;examen</h1>
            <p className="font-body text-sm text-chocolat/60 leading-relaxed">
              Votre demande pour <strong>{restaurant?.nom ?? 'votre restaurant'}</strong> est en cours d&apos;examen. Notre équipe vous contactera sous 48h.
            </p>
            <span className="inline-block bg-caramel/10 text-caramel border border-caramel/30 rounded-full px-4 py-1 font-body text-xs uppercase tracking-widest">
              En attente de validation
            </span>
          </div>
        )}

        {/* Statut refuse */}
        {restaurant?.statut_validation === 'refuse' && (
          <div className="max-w-md w-full text-center space-y-5">
            <div className="text-5xl">❌</div>
            <h1 className="font-display text-2xl text-chocolat">Accès non accordé</h1>
            <p className="font-body text-sm text-chocolat/60 leading-relaxed">
              Votre demande de partenariat n&apos;a pas pu être acceptée. Contactez-nous à <a href="mailto:pro@instantdessert.fr" className="text-rose underline">pro@instantdessert.fr</a> pour en savoir plus.
            </p>
          </div>
        )}

        {/* Statut valide — dashboard réel */}
        {restaurant?.statut_validation === 'valide' && (
          <div className="max-w-3xl w-full space-y-8">
            <div>
              <h1 className="font-display text-3xl text-chocolat">Bonjour, {restaurant.nom} 👋</h1>
              <p className="font-body text-sm text-chocolat/60 mt-1">Votre espace partenaire Instant Dessert</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Link href="/commandes/nouvelle"
                className="group bg-white border border-blush rounded-2xl p-6 hover:shadow-md hover:border-rose transition-all">
                <div className="text-3xl mb-3">🧁</div>
                <h2 className="font-display text-xl text-chocolat mb-1">Passer une commande</h2>
                <p className="font-body text-sm text-chocolat/60">Composer votre commande depuis le catalogue</p>
              </Link>
              <Link href="/commandes"
                className="group bg-white border border-blush rounded-2xl p-6 hover:shadow-md hover:border-caramel transition-all">
                <div className="text-3xl mb-3">📋</div>
                <h2 className="font-display text-xl text-chocolat mb-1">Mes commandes</h2>
                <p className="font-body text-sm text-chocolat/60">Historique et suivi de vos commandes</p>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
