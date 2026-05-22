import { redirect } from 'next/navigation'
import { createClient } from '@instantdessert/supabase/server'
import Link from 'next/link'
import { DraftsList } from './DraftsList'

interface OrderItem {
  productId: string
  nom: string
  quantite: number
  prixUnitaire: number
}

interface Order {
  id: string
  statut: string
  created_at: string
  items: OrderItem[]
}

function orderTotal(items: OrderItem[]) {
  return items.reduce((s, i) => s + i.prixUnitaire * i.quantite, 0)
}

function reorderLink(items: OrderItem[]) {
  const q = items.map(i => `${i.productId}:${i.quantite}`).join(',')
  return `/commandes/nouvelle?q=${q}`
}

const STATUT_LABEL: Record<string, string> = {
  recue: 'Reçue',
  en_preparation: 'En préparation',
  livree: 'Livrée',
  annulee: 'Annulée',
}

const STATUT_DOT: Record<string, string> = {
  recue: 'bg-caramel',
  en_preparation: 'bg-rose',
  livree: 'bg-green-500',
  annulee: 'bg-red-400',
}

const STATUT_TEXT: Record<string, string> = {
  recue: 'text-caramel',
  en_preparation: 'text-rose',
  livree: 'text-green-700',
  annulee: 'text-red-500',
}

const EN_COURS = ['recue', 'en_preparation']

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
  const { data: rawOrders } = restaurant
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? await (supabase as any)
        .from('orders_b2b')
        .select('id, statut, created_at, order_items_b2b(product_id, quantite)')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false })
    : { data: [] }

  const orders: Order[] = (rawOrders ?? []).map((o: {
    id: string
    statut: string
    created_at: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order_items_b2b: any[]
  }) => ({
    id: o.id,
    statut: o.statut,
    created_at: o.created_at,
    items: (o.order_items_b2b ?? []).map((i: { product_id: string; quantite: number }) => ({
      productId: i.product_id,
      nom: i.product_id,
      quantite: i.quantite,
      prixUnitaire: 0,
    })),
  }))

  const enCours = orders.filter(o => EN_COURS.includes(o.statut))
  const historique = orders.filter(o => !EN_COURS.includes(o.statut))

  return (
    <main className="min-h-screen bg-creme">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <a href="/dashboard" className="font-body text-sm text-chocolat/40 hover:text-chocolat transition-colors">
              ← Dashboard
            </a>
            <h1 className="font-display text-3xl text-chocolat mt-1">Mes commandes</h1>
          </div>
          <Link href="/commandes/nouvelle"
            className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity">
            <span className="text-base leading-none">+</span> Nouvelle commande
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="space-y-10">
            <DraftsList />
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧁</span>
              </div>
              <p className="font-display text-xl text-chocolat/50 mb-1">Aucune commande</p>
              <p className="font-body text-sm text-chocolat/30 mb-8">Composez votre première commande dès maintenant.</p>
              <Link href="/commandes/nouvelle"
                className="min-h-[44px] inline-flex items-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
                Passer une commande
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">

            <DraftsList />

            {/* En cours */}
            {enCours.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
                  <h2 className="font-display text-lg text-chocolat">En cours</h2>
                </div>
                <div className="space-y-3">
                  {enCours.map(o => (
                    <div key={o.id} className="bg-white border border-rose/15 rounded-2xl overflow-hidden shadow-sm">
                      <div className="flex items-stretch">
                        <div className={`w-1 shrink-0 ${o.statut === 'en_preparation' ? 'bg-rose' : 'bg-caramel'}`} />
                        <div className="flex-1 px-5 py-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-body text-sm text-chocolat font-semibold">
                                Commande #{o.id.slice(0, 8).toUpperCase()}
                              </p>
                              <p className="font-body text-xs text-chocolat/40 mt-0.5">
                                {new Date(o.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                                {' · '}
                                {new Date(o.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`flex items-center gap-1.5 font-body text-xs font-medium justify-end ${STATUT_TEXT[o.statut]}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${STATUT_DOT[o.statut]}`} />
                                {STATUT_LABEL[o.statut]}
                              </span>
                              <span className="font-display text-lg text-chocolat">{orderTotal(o.items).toFixed(2)} €</span>
                            </div>
                          </div>
                          {o.items.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {o.items.map(i => (
                                <span key={i.productId} className="font-body text-xs bg-blush/60 text-chocolat/60 px-2.5 py-0.5 rounded-full">
                                  {i.nom} ×{i.quantite}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Historique */}
            {historique.length > 0 && (
              <section>
                <h2 className="font-display text-lg text-chocolat mb-4">Historique</h2>
                <div className="space-y-3">
                  {historique.map(o => (
                    <div key={o.id} className="bg-white border border-blush rounded-2xl overflow-hidden shadow-sm">
                      <div className="flex items-stretch">
                        <div className="w-1 shrink-0 bg-green-400" />
                        <div className="flex-1 px-5 py-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-body text-sm text-chocolat font-semibold">
                                Commande #{o.id.slice(0, 8).toUpperCase()}
                              </p>
                              <p className="font-body text-xs text-chocolat/40 mt-0.5">
                                {new Date(o.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`flex items-center gap-1.5 font-body text-xs font-medium justify-end ${STATUT_TEXT[o.statut] ?? 'text-chocolat/50'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${STATUT_DOT[o.statut] ?? 'bg-blush'}`} />
                                {STATUT_LABEL[o.statut] ?? o.statut}
                              </span>
                              <span className="font-display text-lg text-chocolat">{orderTotal(o.items).toFixed(2)} €</span>
                            </div>
                          </div>
                          {o.items.length > 0 && (
                            <div className="flex items-end justify-between gap-3 mt-3">
                              <div className="flex flex-wrap gap-1.5">
                                {o.items.map(i => (
                                  <span key={i.productId} className="font-body text-xs bg-blush/50 text-chocolat/60 px-2.5 py-0.5 rounded-full">
                                    {i.nom} ×{i.quantite}
                                  </span>
                                ))}
                              </div>
                              <Link href={reorderLink(o.items)}
                                className="min-h-[32px] flex items-center px-4 py-1 bg-rose text-white font-body text-xs rounded-full hover:opacity-90 transition-opacity shrink-0">
                                Re-commander
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </main>
  )
}
