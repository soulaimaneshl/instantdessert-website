import * as Brevo from '@getbrevo/brevo'

// Client Brevo pour les emails transactionnels — server-side uniquement
export function getEmailClient() {
  const client = new Brevo.TransactionalEmailsApi()
  client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)
  return client
}

export { Brevo }
