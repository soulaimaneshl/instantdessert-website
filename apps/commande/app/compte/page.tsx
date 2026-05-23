import { redirect } from 'next/navigation'
import { createClient } from '@instantdessert/supabase/server'
import { Header } from '../components/Header'
import { CompteClient } from './CompteClient'

export const metadata = { title: 'Mon compte — Instant Dessert' }

export default async function ComptePage() {
  let email = 'test@instantdessert.fr'
  let prenom = 'Soulaimane'
  let createdAt = new Date().toISOString()

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/connexion')
    email = user.email ?? ''
    prenom = user.user_metadata?.prenom ?? ''
    createdAt = user.created_at
  }

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl text-chocolat mb-8">Mon compte</h1>
        <CompteClient email={email} prenom={prenom} createdAt={createdAt} />
      </main>
    </>
  )
}
