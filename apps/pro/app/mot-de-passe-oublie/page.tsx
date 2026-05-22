'use client'

import { useState } from 'react'
import { createClient } from '@instantdessert/supabase'
import { Logo } from '@instantdessert/ui'
import Link from 'next/link'

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reinitialiser`,
    })

    setLoading(false)
    if (authError) {
      setError('Erreur lors de l\'envoi. Vérifiez votre email.')
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <header className="border-b border-blush px-6 h-16 flex items-center">
        <Link href="/"><Logo size={32} /></Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-2">
            <h1 className="font-display text-3xl text-chocolat">Mot de passe oublié</h1>
            <p className="font-body text-sm text-chocolat/60">
              Entrez votre email — nous vous enverrons un lien de réinitialisation.
            </p>
          </div>

          <div className="bg-white border border-blush rounded-2xl p-6 sm:p-8 shadow-sm">
            {sent ? (
              <div className="text-center space-y-4 py-4">
                <div className="text-4xl">📧</div>
                <p className="font-body text-sm text-chocolat/70">
                  Un lien de réinitialisation a été envoyé à <strong>{email}</strong>. Vérifiez votre boîte mail (et vos spams).
                </p>
                <Link href="/connexion" className="inline-block font-body text-sm text-rose hover:underline">
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
                    placeholder="marie@restaurant.fr"
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
                  className="w-full min-h-[44px] px-6 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>
                <p className="text-center">
                  <Link href="/connexion" className="font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
                    ← Retour à la connexion
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
