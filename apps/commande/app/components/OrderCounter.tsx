import { Suspense } from 'react'

async function CounterInner() {
  let count = 247 // fallback mock

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = await import('@instantdessert/supabase/server')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = await createClient() as any
    const { count: dbCount } = await supabase
      .from('orders_b2c')
      .select('*', { count: 'exact', head: true })
    if (typeof dbCount === 'number') count = dbCount
  }

  // Arrondir à la dizaine inférieure pour l'aspect "conservateur"
  const displayed = Math.max(count, 10)
  const rounded = displayed < 100 ? displayed : Math.floor(displayed / 10) * 10

  return (
    <p className="font-body text-sm text-creme/50">
      <span className="text-caramel font-semibold">{rounded.toLocaleString('fr-FR')}+</span>
      {' '}commandes livrées en Hauts-de-Seine
    </p>
  )
}

export function OrderCounter() {
  return (
    <Suspense fallback={
      <p className="font-body text-sm text-creme/50">
        <span className="text-caramel font-semibold">247+</span>
        {' '}commandes livrées en Hauts-de-Seine
      </p>
    }>
      <CounterInner />
    </Suspense>
  )
}
