import { updateSession } from '@instantdessert/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

// Vitrine publique + pages auth accessibles sans connexion
// Le dashboard et les commandes nécessitent une authentification
const PUBLIC_PREFIXES = ['/', '/acces', '/connexion', '/inscription', '/mot-de-passe-oublie', '/reinitialiser', '/auth']

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname
  const isPublic = PUBLIC_PREFIXES.some(p =>
    p === '/' ? pathname === '/' : pathname.startsWith(p)
  )

  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/connexion'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
