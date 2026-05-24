import { Header } from '../../components/Header'
import { PaiementClient } from './PaiementClient'

export const metadata = { title: 'Paiement — Instant Dessert' }

export default async function PaiementPage() {
  let userId: string | null = null

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@instantdessert/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    userId = user?.id ?? null
  }

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl text-chocolat mb-8">Finaliser ma commande</h1>
        <PaiementClient userId={userId} />
      </main>
    </>
  )
}
