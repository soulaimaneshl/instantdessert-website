'use server'

export async function joinWaitlist(
  _prevState: { success: boolean; error: string | null },
  formData: FormData,
): Promise<{ success: boolean; error: string | null }> {
  const email = (formData.get('email') as string | null)?.trim().toLowerCase()
  const prenom = (formData.get('prenom') as string | null)?.trim() || null

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Adresse email invalide.' }
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Mode preview sans Supabase
    return { success: true, error: null }
  }

  const { createClient } = await import('@instantdessert/supabase/server')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any

  const { error } = await supabase
    .from('waitlist_brunch')
    .insert({ email, prenom })

  if (error) {
    if (error.code === '23505') {
      // Contrainte unique — email déjà inscrit
      return { success: true, error: null }
    }
    return { success: false, error: 'Une erreur est survenue. Réessayez.' }
  }

  return { success: true, error: null }
}
