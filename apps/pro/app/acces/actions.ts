'use server'

import { createClient as createServerClient } from '@instantdessert/supabase/server'
import { getEmailClient, Brevo } from '@instantdessert/email'

export interface AccessFormData {
  prenom: string
  nom: string
  email: string
  password: string
  nomRestaurant: string
  adresse: string
  telephone: string
}

export async function submitAccessRequest(
  data: AccessFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient()

    // 1. Créer le compte via auth.signUp (envoie aussi l'email de confirmation)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { prenom: data.prenom, nom: data.nom },
      },
    })

    if (authError) {
      if (authError.message.toLowerCase().includes('already registered')) {
        return { success: false, error: 'Cette adresse email est déjà utilisée.' }
      }
      return { success: false, error: 'Erreur lors de la création du compte. Vérifiez vos informations.' }
    }

    const userId = authData.user?.id
    if (!userId) {
      return { success: false, error: 'Erreur inattendue — veuillez réessayer.' }
    }

    // 2. Créer la fiche restaurant
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: dbError } = await (supabase as any)
      .from('restaurants')
      .insert({
        user_id: userId,
        nom: data.nomRestaurant,
        adresse: data.adresse,
        telephone: data.telephone,
        statut_validation: 'en_attente',
      })

    if (dbError) {
      return { success: false, error: "Erreur lors de l'enregistrement. Veuillez réessayer." }
    }

    // 3. Email de notification admin (non bloquant)
    if (process.env.BREVO_API_KEY) {
      try {
        const emailClient = getEmailClient()
        const sendSmtpEmail = new Brevo.SendSmtpEmail()
        sendSmtpEmail.to = [{ email: 'pro@instantdessert.fr', name: 'Instant Dessert' }]
        sendSmtpEmail.subject = `Nouvelle demande partenaire — ${data.nomRestaurant}`
        sendSmtpEmail.htmlContent = `
          <p><strong>${data.prenom} ${data.nom}</strong> (${data.email}) a soumis une demande pour <strong>${data.nomRestaurant}</strong>.</p>
          <p>Adresse : ${data.adresse}<br>Téléphone : ${data.telephone}</p>
        `
        sendSmtpEmail.sender = { email: 'pro@instantdessert.fr', name: 'Instant Dessert Pro' }
        await emailClient.sendTransacEmail(sendSmtpEmail)
      } catch {
        // Non critique
      }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'Une erreur inattendue est survenue. Veuillez réessayer.' }
  }
}
