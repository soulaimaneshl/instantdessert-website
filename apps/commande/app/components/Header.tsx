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

        <nav className="flex items-center gap-5">
          <Link href="/catalogue" className={activePage === 'catalogue' ? activeLinkClass : linkClass}>
            Catalogue
          </Link>

          {count > 0 && (
            <Link href="/panier"
              className={`relative inline-flex items-center gap-1.5 ${activePage === 'panier' ? activeLinkClass : linkClass}`}>
              Panier
              <span className="w-5 h-5 bg-rose rounded-full flex items-center justify-center font-body text-xs text-white font-medium leading-none">
                {count > 9 ? '9+' : count}
              </span>
            </Link>
          )}

          {prenom ? (
            <>
              <Link href="/compte" className={linkClass}>
                {prenom}
              </Link>
              <button onClick={handleSignOut} className="font-body text-xs text-chocolat/40 hover:text-chocolat transition-colors">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/connexion" className={linkClass}>
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
