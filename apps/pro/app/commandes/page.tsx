import { redirect } from 'next/navigation'
import { createClient } from '@instantdessert/supabase/server'
import Link from 'next/link'

export default async function CommandesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: restaurant } = await (supabase as any)
    .from('restaurants')
    .select('id')
    .eq('user_id', user.id)
    .single()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: orders } = restaurant
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? await (supabase as any)
        .from('orders_b2b')
        .select('id, statut, created_at')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false })
    : { data: [] }

  const STATUT_LABEL: Record<string, string> = {
    recue: 'Reçue',
    en_preparation: 'En préparation',
    livree: 'Livrée',
    annulee: 'Annulée',
  }

  const STATUT_COLOR: Record<string, string> = {
    recue: 'bg-caramel/10 text-caramel',
    en_preparation: 'bg-rose/10 text-rose',
    livree: 'bg-green-100 text-green-700',
    annulee: 'bg-red-100 text-red-500',
  }

  return (
    <main className="min-h-screen bg-creme">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <a href="/dashboard" className="font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
              ← Dashboard
            </a>
            <h1 className="font-display text-3xl text-chocolat mt-2">Mes commandes</h1>
          </div>
          <Link href="/commandes/nouvelle"
            className="min-h-[44px] inline-flex items-center px-6 py-2 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity">
            + Nouvelle commande
          </Link>
        </div>

        {(!orders || orders.length === 0) ? (
          <div className="text-center py-16">
            <p className="font-display text-xl text-chocolat/40 mb-2">Aucune commande pour l'instant</p>
            <p className="font-body text-sm text-chocolat/30 mb-8">Composez votre première commande dès maintenant.</p>
            <Link href="/commandes/nouvelle"
              className="min-h-[44px] inline-flex items-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
              Passer une commande
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-blush border border-blush rounded-xl overflow-hidden">
            {orders.map((o: { id: string; statut: string; created_at: string }) => (
              <div key={o.id} className="flex items-center justify-between px-5 py-4 bg-white">
                <div>
                  <p className="font-body text-sm text-chocolat font-medium">
                    Commande #{o.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="font-body text-xs text-chocolat/40">
                    {new Date(o.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span className={`font-body text-xs px-3 py-1 rounded-full font-medium ${STATUT_COLOR[o.statut] ?? 'bg-blush text-chocolat'}`}>
                  {STATUT_LABEL[o.statut] ?? o.statut}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
