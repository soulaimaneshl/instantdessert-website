'use client'

import Link from 'next/link'
import { Logo } from '@instantdessert/ui'
import { useCart } from '../../lib/cart'
import { useEffect, useState } from 'react'
import { createClient } from '@instantdessert/supabase'
import { useRouter } from 'next/navigation'

interface Props {
  activePage?: 'catalogue' | 'panier'
}

const linkClass = 'font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors'
const activeLinkClass = 'font-body text-sm text-chocolat font-medium'

export function Header({ activePage }: Props) {
  const { count } = useCart()
  const router = useRouter()
  const [prenom, setPrenom] = useState<string>('')

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setPrenom(session?.user.user_metadata?.prenom ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setPrenom(session?.user.user_metadata?.prenom ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-blush">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/"><Logo size={32} /></Link>

        <nav className="flex items-center gap-3">
          <Link href="/catalogue"
            className={`min-h-[36px] px-4 inline-flex items-center font-body text-sm rounded-full transition-colors ${
              activePage === 'catalogue'
                ? 'text-chocolat font-medium bg-blush'
                : 'text-chocolat/60 hover:text-chocolat hover:bg-blush/50'
            }`}>
            Catalogue
          </Link>

          {count > 0 && (
            <Link href="/panier"
              className="relative min-h-[36px] w-10 inline-flex items-center justify-center rounded-full text-chocolat/60 hover:text-chocolat hover:bg-blush/50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose rounded-full flex items-center justify-center font-body text-[10px] text-white font-medium leading-none">
                {count > 9 ? '9+' : count}
              </span>
            </Link>
          )}

          {prenom ? (
            <div className="flex items-center gap-2">
              <Link href="/compte"
                className="min-h-[36px] px-4 inline-flex items-center font-body text-sm text-chocolat/60 hover:text-chocolat rounded-full hover:bg-blush/50 transition-colors">
                {prenom}
              </Link>
              <button onClick={handleSignOut}
                className="font-body text-xs text-chocolat/30 hover:text-chocolat/60 transition-colors">
                ×
              </button>
            </div>
          ) : (
            <Link href="/connexion"
              className="min-h-[36px] px-4 inline-flex items-center font-body text-sm bg-chocolat text-creme rounded-full hover:opacity-80 transition-opacity">
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
