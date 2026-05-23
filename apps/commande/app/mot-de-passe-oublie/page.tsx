'use client'

import { useState } from 'react'
import { createClient } from '@instantdessert/supabase'
import Link from 'next/link'
import { Logo } from '@instantdessert/ui'

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/reinitialiser`,
    })

    setLoading(false)
    if (authError) {
      setError('Une erreur est survenue, réessayez.')
      return
    }
    setDone(true)
  }

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <header className="border-b border-blush px-6 h-16 flex items-center">
        <Link href="/"><Logo size={32} /></Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-2">
            <p className="font-body text-xs text-rose uppercase tracking-widest">Mot de passe oublié</p>
            <h1 className="font-display text-3xl text-chocolat">Réinitialiser</h1>
            <p className="font-body text-sm text-chocolat/60">Nous vous enverrons un lien par email</p>
          </div>

          <div className="bg-white border border-blush rounded-2xl p-6 sm:p-8 shadow-sm">
            {done ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center mx-auto">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m8-7v7"/>
                  </svg>
                </div>
                <div>
                  <p className="font-display text-xl text-chocolat">Email envoyé !</p>
                  <p className="font-body text-sm text-chocolat/60 mt-2">
                    Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.
                  </p>
                </div>
                <Link href="/connexion"
                  className="block w-full min-h-[44px] flex items-center justify-center border border-blush text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
                  Retour à la connexion
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="space-y-1">
                  <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full min-h-[44px] px-4 py-2 border border-blush rounded-lg font-body text-sm bg-white text-chocolat placeholder:text-chocolat/30 focus:outline-none focus:ring-2 focus:ring-rose focus:border-rose transition-colors"
                    placeholder="vous@exemple.fr"
                    autoComplete="email"
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
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>

                <Link href="/connexion"
                  className="block text-center font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
                  ← Retour à la connexion
                </Link>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
