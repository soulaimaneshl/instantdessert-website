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
  const [prenom, setPrenom] = useState<string>('')

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setPrenom(session?.user.user_metadata?.prenom ?? '')
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setPrenom(session?.user.user_metadata?.prenom ?? '')
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
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
        <Link href="/"><Logo size={32} /></Link>

        <Link href="/catalogue"
          className={`min-h-[40px] px-5 inline-flex items-center font-body text-sm rounded-full transition-all ${
            activePage === 'catalogue'
              ? 'bg-rose text-white hover:opacity-90'
              : 'border border-chocolat/30 text-chocolat hover:border-chocolat'
          }`}>
          Catalogue
        </Link>

        <div className="flex-1 flex items-center justify-end gap-3">

          {prenom ? (
            <>
              <span className="font-body text-sm text-chocolat/60">
                Bonjour, <span className="text-chocolat font-medium">{prenom}</span>
              </span>
              <button onClick={handleSignOut}
                className="min-h-[40px] px-5 inline-flex items-center font-body text-sm border border-chocolat/30 text-chocolat rounded-full hover:border-chocolat transition-colors">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/connexion"
              className="min-h-[40px] px-5 inline-flex items-center font-body text-sm bg-rose text-white rounded-full hover:opacity-90 transition-opacity">
              Connexion
            </Link>
          )}

          {count > 0 && (
            <Link href="/panier" className="relative inline-flex items-center justify-center w-9 h-9 text-chocolat/60 hover:text-chocolat transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose rounded-full flex items-center justify-center font-body text-[10px] text-white font-medium leading-none">
                {count > 9 ? '9+' : count}
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
