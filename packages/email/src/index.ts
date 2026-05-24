import * as Brevo from '@getbrevo/brevo'

// Client Brevo pour les emails transactionnels — server-side uniquement
export function getEmailClient() {
  const client = new Brevo.TransactionalEmailsApi()
  client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)
  return client
}

// Abonne un contact à la liste newsletter Brevo (opt-in RGPD)
export async function subscribeToNewsletter(email: string, prenom?: string) {
  if (!process.env.BREVO_API_KEY) return

  const contactsApi = new Brevo.ContactsApi()
  contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

  const listId = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID ?? '1', 10)

  const contact = new Brevo.CreateContact()
  contact.email = email
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contact.attributes = prenom ? ({ PRENOM: prenom } as any) : {}
  contact.listIds = [listId]
  contact.updateEnabled = true

  try {
    await contactsApi.createContact(contact)
  } catch {
    // Contact déjà existant ou erreur non bloquante
  }
}

export { Brevo }
