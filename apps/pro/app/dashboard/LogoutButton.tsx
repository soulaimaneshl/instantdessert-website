'use client'

import { createClient } from '@instantdessert/supabase'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={logout}
      className="min-h-[44px] px-5 py-2 font-body text-sm text-chocolat/60 hover:text-chocolat border border-blush rounded-full hover:border-chocolat/30 transition-colors"
    >
      Se déconnecter
    </button>
  )
}
