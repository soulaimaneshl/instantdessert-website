'use server'

import { redirect } from 'next/navigation'
import { getStripe } from '@instantdessert/stripe'

interface CartItem {
  productId: string
  nom: string
  prix: number
  quantite: number
}

export async function createCheckoutSession(items: CartItem[], adresse: string) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe non configuré')
  }

  const stripe = getStripe()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3002'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    locale: 'fr',
    line_items: items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nom,
          metadata: { productId: item.productId },
        },
        unit_amount: Math.round(item.prix * 100),
      },
      quantity: item.quantite,
    })),
    shipping_address_collection: { allowed_countries: ['FR'] },
    metadata: { adresse },
    success_url: `${appUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/panier/paiement`,
  })

  redirect(session.url!)
}
