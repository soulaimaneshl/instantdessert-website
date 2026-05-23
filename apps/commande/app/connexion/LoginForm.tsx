'use client'

import { useState } from 'react'
import { createClient } from '@instantdessert/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const inputClass = 'w-full min-h-[44px] px-4 py-2 border border-blush rounded-lg font-body text-sm bg-white text-chocolat placeholder:text-chocolat/30 focus:outline-none focus:ring-2 focus:ring-rose focus:border-rose transition-colors'

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setLoading(false)
      setError('Email ou mot de passe incorrect.')
      return
    }

    router.push(next ?? '/catalogue')
    router.refresh()
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-1">
        <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={inputClass}
          placeholder="vous@exemple.fr"
          autoComplete="email"
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Mot de passe</label>
          <Link href="/mot-de-passe-oublie" className="font-body text-xs text-rose hover:underline">
            Oublié ?
          </Link>
        </div>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={inputClass}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-body text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[52px] px-6 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  )
}
