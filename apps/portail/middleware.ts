import { updateSession } from '@instantdessert/supabase/middleware'
import type { NextRequest } from 'next/server'

// Le portail est public — on rafraîchit juste la session pour les Server Components
export async function middleware(request: NextRequest) {
  const { supabaseResponse } = await updateSession(request)
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
