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

export function Header({ activePage }: Props) {
  const { count } = useCart()
  const router = useRouter()
  const [prenom, setPrenom] = useState<string | null>(null)

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

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/catalogue"
            className={`font-body text-sm transition-colors ${activePage === 'catalogue' ? 'text-chocolat font-medium' : 'text-chocolat/60 hover:text-chocolat'}`}>
            Catalogue
          </Link>
          {prenom !== null && (
            prenom ? (
              <div className="flex items-center gap-3">
                <Link href="/compte" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">
                  Bonjour, {prenom}
                </Link>
                <button onClick={handleSignOut} className="font-body text-xs text-chocolat/40 hover:text-chocolat transition-colors">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link href="/connexion" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">
                Se connecter
              </Link>
            )
          )}
        </nav>

        <Link href="/panier"
          className="min-h-[44px] relative inline-flex items-center gap-2 px-5 py-2 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Panier
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose rounded-full flex items-center justify-center font-body text-xs text-white font-medium">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
