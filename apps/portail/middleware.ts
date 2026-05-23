import { updateSession } from '@instantdessert/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request)

  const pathname = request.nextUrl.pathname
  if (pathname.startsWith('/admin') && !user && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/connexion'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
