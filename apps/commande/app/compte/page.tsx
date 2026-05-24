import { redirect } from 'next/navigation'
import { createClient } from '@instantdessert/supabase/server'
import { Header } from '../components/Header'
import { CompteClient } from './CompteClient'

export const metadata = { title: 'Mon compte — Instant Dessert' }

export default async function ComptePage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect('/connexion')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const email = user.email ?? ''
  const prenom = user.user_metadata?.prenom ?? ''
  const createdAt = user.created_at

  // Solde de points fidélité
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: solde } = await (supabase as any)
    .from('fidelite_solde')
    .select('total_points')
    .eq('user_id', user.id)
    .single()
  const totalPoints: number = solde?.total_points ?? 0

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl text-chocolat mb-8">Mon compte</h1>
        <CompteClient email={email} prenom={prenom} createdAt={createdAt} points={totalPoints} />
      </main>
    </>
  )
}
