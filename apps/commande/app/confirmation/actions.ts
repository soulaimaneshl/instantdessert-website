'use server'

import { getEmailClient, Brevo } from '@instantdessert/email'

interface OrderItem {
  nom: string
  quantite: number
  prix: number
}

export async function sendConfirmationEmail(email: string, prenom: string, items: OrderItem[], total: number) {
  if (!process.env.BREVO_API_KEY) return

  const client = getEmailClient()
  const lignes = items.map(i =>
    `<tr><td style="padding:4px 0;font-family:sans-serif;font-size:14px;">${i.nom} ×${i.quantite}</td><td style="padding:4px 0;font-family:sans-serif;font-size:14px;text-align:right;">${(i.prix * i.quantite).toFixed(2)} €</td></tr>`
  ).join('')

  const email_obj = new Brevo.SendSmtpEmail()
  email_obj.to = [{ email, name: prenom }]
  email_obj.sender = { email: 'bonjour@instantdessert.fr', name: 'Instant Dessert' }
  email_obj.subject = '✓ Votre commande est confirmée !'
  email_obj.htmlContent = `
    <div style="max-width:560px;margin:0 auto;font-family:sans-serif;color:#2B1A14;">
      <h1 style="font-size:24px;margin-bottom:8px;">Merci ${prenom} ! 🎉</h1>
      <p style="color:#666;margin-bottom:24px;">Votre commande a bien été reçue. Nous la préparons avec soin.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #FCE7E3;border-bottom:1px solid #FCE7E3;margin-bottom:24px;padding:12px 0;">
        ${lignes}
        <tr><td style="padding-top:12px;font-weight:bold;font-size:15px;">Total</td><td style="padding-top:12px;font-weight:bold;font-size:15px;text-align:right;">${total.toFixed(2)} €</td></tr>
      </table>
      <p style="color:#666;font-size:13px;">Livraison en 45 minutes. Notre coursier vous contactera par téléphone.</p>
      <p style="color:#D97773;font-size:13px;margin-top:24px;">L'équipe Instant Dessert</p>
    </div>
  `

  await client.sendTransacEmail(email_obj)
}
