import { createClient } from '@instantdessert/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

// Gère les redirections Supabase Auth (confirmation email, reset password)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL(next, request.url))
}
