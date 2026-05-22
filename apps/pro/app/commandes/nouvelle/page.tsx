import { redirect } from 'next/navigation'
import { createClient } from '@instantdessert/supabase/server'
import { OrderForm } from './OrderForm'

export default async function NouvellePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  return (
    <main className="min-h-screen bg-creme">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <a href="/commandes" className="font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
            ← Mes commandes
          </a>
        </div>
        <OrderForm />
      </div>
    </main>
  )
}
