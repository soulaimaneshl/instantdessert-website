import { updateSession } from '@instantdessert/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

// Le portail pro est entièrement protégé — seuls /connexion et /inscription sont publics
const PUBLIC_ROUTES = ['/connexion', '/inscription']

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname
  const isPublic = PUBLIC_ROUTES.includes(pathname)

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
