'use server'

import { createClient } from '@instantdessert/supabase/server'
import { getEmailClient, Brevo } from '@instantdessert/email'

export interface OrderLine {
  productId: string
  nom: string
  quantite: number
  prixUnitaire: number
}

export interface SubmitOrderResult {
  success: boolean
  orderId?: string
  error?: string
}

export async function submitOrder(lines: OrderLine[]): Promise<SubmitOrderResult> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, error: 'Non authentifié.' }

    // Récupérer le restaurant du partenaire
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: restaurant } = await (supabase as any)
      .from('restaurants')
      .select('id, nom')
      .eq('user_id', user.id)
      .single()

    if (!restaurant) return { success: false, error: 'Restaurant introuvable.' }

    // Créer la commande
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: order, error: orderError } = await (supabase as any)
      .from('orders_b2b')
      .insert({ restaurant_id: restaurant.id, statut: 'recue' })
      .select('id')
      .single()

    if (orderError) return { success: false, error: "Erreur lors de la création de la commande." }

    // Créer les lignes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: itemsError } = await (supabase as any)
      .from('order_items_b2b')
      .insert(lines.map(l => ({ order_id: order.id, product_id: l.productId, quantite: l.quantite })))

    if (itemsError) return { success: false, error: "Erreur lors de l'enregistrement des produits." }

    // Email de notification admin (non bloquant)
    if (process.env.BREVO_API_KEY) {
      try {
        const emailClient = getEmailClient()
        const total = lines.reduce((s, l) => s + l.prixUnitaire * l.quantite, 0)
        const lignes = lines.map(l => `${l.nom} × ${l.quantite} = ${(l.prixUnitaire * l.quantite).toFixed(2)} €`).join('<br>')
        const msg = new Brevo.SendSmtpEmail()
        msg.to = [{ email: 'pro@instantdessert.fr', name: 'Instant Dessert' }]
        msg.subject = `Nouvelle commande B2B — ${restaurant.nom}`
        msg.htmlContent = `<p><strong>${restaurant.nom}</strong> vient de passer une commande :</p><p>${lignes}</p><p><strong>Total : ${total.toFixed(2)} €</strong></p>`
        msg.sender = { email: 'pro@instantdessert.fr', name: 'Instant Dessert Pro' }
        await emailClient.sendTransacEmail(msg)
      } catch { /* non critique */ }
    }

    return { success: true, orderId: order.id }
  } catch {
    return { success: false, error: 'Une erreur inattendue est survenue. Veuillez réessayer.' }
  }
}
