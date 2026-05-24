'use server'

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'ID'
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export async function getOrCreateReferralCode(): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return 'IDPREVIEW'

  const { createClient } = await import('@instantdessert/supabase/server')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Vérifie si un code existe déjà
  const { data: existing } = await supabase
    .from('referral_codes')
    .select('code')
    .eq('user_id', user.id)
    .single()

  if (existing?.code) return existing.code

  // Génère un code unique
  let code = generateCode()
  let attempts = 0
  while (attempts < 5) {
    const { error } = await supabase
      .from('referral_codes')
      .insert({ user_id: user.id, code })
    if (!error) return code
    code = generateCode()
    attempts++
  }

  return null
}

export async function validateReferralCode(code: string): Promise<boolean> {
  if (!code.trim()) return false
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return true // preview

  const { createClient } = await import('@instantdessert/supabase/server')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = await createClient() as any

  const { data } = await supabase
    .from('referral_codes')
    .select('id')
    .eq('code', code.toUpperCase().trim())
    .single()

  return !!data
}
