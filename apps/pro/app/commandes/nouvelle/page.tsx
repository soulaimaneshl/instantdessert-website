import { redirect } from 'next/navigation'
import { createClient } from '@instantdessert/supabase/server'
import { OrderForm } from './OrderForm'

interface Props {
  searchParams: Promise<{ q?: string; draft_id?: string }>
}

export default async function NouvellePage({ searchParams }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const { q, draft_id } = await searchParams
  const initialQuantities: Record<string, number> = {}
  q?.split(',').forEach(pair => {
    const [id, qty] = pair.split(':')
    if (id && qty) initialQuantities[id] = parseInt(qty)
  })

  return (
    <main className="min-h-screen bg-creme">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <a href="/commandes" className="font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
            ← Mes commandes
          </a>
        </div>
        <OrderForm initialQuantities={initialQuantities} draftId={draft_id} />
      </div>
    </main>
  )
}
