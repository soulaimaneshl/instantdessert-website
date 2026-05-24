import { Suspense } from 'react'
import { HabitualBannerClient } from './HabitualBannerClient'

interface OrderItem {
  productId: string
  nom: string
  prix: number
  quantite: number
}

async function HabitualBannerInner() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null

  const { createClient } = await import('@instantdessert/supabase/server')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: order } = await supabase
    .from('orders_b2c')
    .select('id, order_items_b2c(product_id, nom, prix, quantite)')
    .eq('user_id', user.id)
    .in('statut', ['livre', 'en_livraison', 'en_preparation', 'en_attente'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!order?.order_items_b2c?.length) return null

  const items: OrderItem[] = (order.order_items_b2c as {
    product_id: string; nom: string; prix: number; quantite: number
  }[]).map(i => ({
    productId: i.product_id,
    nom: i.nom,
    prix: i.prix,
    quantite: i.quantite,
  }))

  const prenom: string | null = user.user_metadata?.prenom ?? null

  return <HabitualBannerClient items={items} prenom={prenom} />
}

export function HabitualBanner() {
  return (
    <Suspense fallback={null}>
      <HabitualBannerInner />
    </Suspense>
  )
}
