'use client'

import { useState } from 'react'
import { createClient } from '@instantdessert/supabase'
import { useRouter } from 'next/navigation'

const inputClass = 'w-full min-h-[44px] px-4 py-2 border border-blush rounded-lg font-body text-sm bg-white text-chocolat placeholder:text-chocolat/30 focus:outline-none focus:ring-2 focus:ring-rose focus:border-rose transition-colors'

export function SignupForm({ next }: { next?: string }) {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { prenom },
        emailRedirectTo: `${location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`,
      },
    })

    if (authError) {
      setLoading(false)
      setError(authError.message === 'User already registered'
        ? 'Un compte existe déjà avec cet email.'
        : 'Une erreur est survenue, réessayez.')
      return
    }

    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="text-center py-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m8-7v7"/>
          </svg>
        </div>
        <div>
          <p className="font-display text-xl text-chocolat">Vérifiez votre boîte mail</p>
          <p className="font-body text-sm text-chocolat/60 mt-2">
            Un lien de confirmation a été envoyé à <strong>{email}</strong>.<br />
            Cliquez dessus pour activer votre compte.
          </p>
        </div>
        <button
          onClick={() => router.push(next ? `/connexion?next=${encodeURIComponent(next)}` : '/connexion')}
          className="w-full min-h-[44px] px-6 py-3 border border-blush text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors"
        >
          Aller à la connexion
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-1">
        <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Prénom</label>
        <input
          type="text"
          required
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          className={inputClass}
          placeholder="Marie"
          autoComplete="given-name"
        />
      </div>

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
        <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Mot de passe</label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={inputClass}
          placeholder="8 caractères minimum"
          autoComplete="new-password"
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
        {loading ? 'Création...' : 'Créer mon compte'}
      </button>

      <p className="font-body text-xs text-chocolat/30 text-center">
        En créant un compte vous acceptez nos conditions d'utilisation.
      </p>
    </form>
  )
}
