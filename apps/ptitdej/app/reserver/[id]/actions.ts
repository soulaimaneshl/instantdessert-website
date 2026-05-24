'use server'

import { redirect } from 'next/navigation'
import { getStripe } from '@instantdessert/stripe'
import type { Formule } from '../../../lib/formules'

export interface ReservationData {
  prenom: string
  nom: string
  email: string
  telephone: string
  adresse: string
  codePostal: string
  ville: string
  dateBrunch: string
}

export async function createBrunchCheckout(formule: Formule, data: ReservationData) {
  if (!process.env.STRIPE_SECRET_KEY) {
    redirect(`/confirmation?session_id=test_preview&formule=${formule.id}`)
  }

  const stripe = getStripe()
  const appUrl = process.env.NEXT_PUBLIC_PTITDEJ_URL ?? 'http://localhost:3003'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    locale: 'fr',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Brunch — ${formule.nom}`,
            description: `${formule.personnes === 1 ? '1 personne' : `${formule.personnes} personnes`} · ${data.dateBrunch}`,
            metadata: { formule_id: formule.id },
          },
          unit_amount: Math.round(formule.prix * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      formule_id: formule.id,
      formule_nom: formule.nom,
      personnes: String(formule.personnes),
      date_brunch: data.dateBrunch,
      prenom: data.prenom,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
      adresse_ligne1: data.adresse,
      adresse_code_postal: data.codePostal,
      adresse_ville: data.ville,
    },
    customer_email: data.email,
    success_url: `${appUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/reserver/${formule.id}`,
  })

  redirect(session.url!)
}
