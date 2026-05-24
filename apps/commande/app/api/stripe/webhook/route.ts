import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@instantdessert/stripe'
import { subscribeToNewsletter } from '@instantdessert/email'
import type Stripe from 'stripe'

// Désactive le body parsing automatique de Next.js (Stripe a besoin du raw body)
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 })
  }

  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await handleCheckoutCompleted(session)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id
  const amountTotal = session.amount_total ?? 0
  const points = Math.floor(amountTotal / 100) // 1€ = 1pt

  if (!userId || !process.env.NEXT_PUBLIC_SUPABASE_URL) return

  const { createClient } = await import('@supabase/supabase-js').then(m => m)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Récupère les articles de la session Stripe
  const stripe = getStripe()
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ['data.price.product'],
    limit: 100,
  })

  // Décompose l'adresse stockée dans les metadata
  const adresseRaw = session.metadata?.adresse ?? ''
  const [nomPart, adressePart] = adresseRaw.split(' — ')
  const [prenom = '', nom = ''] = (nomPart ?? '').trim().split(' ')
  const [ligne1 = '', reste = ''] = (adressePart ?? '').split(', ')
  const [codePostal = '', ...villeParts] = (reste ?? '').split(' ')
  const ville = villeParts.join(' ')
  const telephone = adresseRaw.split(' — ')[2] ?? ''

  // Crée la commande dans orders_b2c (idempotent via stripe_session_id)
  const { data: order } = await supabase
    .from('orders_b2c')
    .upsert(
      {
        user_id: userId,
        statut: 'en_attente',
        total: amountTotal / 100,
        adresse_prenom: prenom,
        adresse_nom: nom,
        adresse_telephone: telephone,
        adresse_ligne1: ligne1,
        adresse_code_postal: codePostal,
        adresse_ville: ville,
        stripe_session_id: session.id,
      },
      { onConflict: 'stripe_session_id', ignoreDuplicates: false },
    )
    .select('id')
    .single()

  if (!order) return

  // Insère les articles (uniquement si pas déjà présents)
  const { count } = await supabase
    .from('order_items_b2c')
    .select('*', { count: 'exact', head: true })
    .eq('order_id', order.id)

  if (count === 0) {
    const orderItems = lineItems.data.map(item => {
      const product = item.price?.product as { metadata?: { productId?: string }; name?: string } | null
      return {
        order_id: order.id,
        product_id: product?.metadata?.productId ?? '',
        nom: product?.name ?? item.description ?? '',
        prix: (item.price?.unit_amount ?? 0) / 100,
        quantite: item.quantity ?? 1,
      }
    })
    await supabase.from('order_items_b2c').insert(orderItems)
  }

  // Attribue les points (1€ = 1pt) — idempotent via order_id
  if (points > 0) {
    await supabase.from('fidelite_points').upsert(
      { user_id: userId, order_id: order.id, points },
      { onConflict: 'order_id', ignoreDuplicates: true },
    )
  }

  // Abonnement newsletter si opt-in RGPD
  if (session.metadata?.newsletter === '1') {
    const email = session.customer_details?.email ?? ''
    if (email) await subscribeToNewsletter(email, prenom || undefined)
  }
}
