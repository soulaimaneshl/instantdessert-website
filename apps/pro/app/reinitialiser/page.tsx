'use client'

import { useState } from 'react'
import { createClient } from '@instantdessert/supabase'
import { Logo } from '@instantdessert/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ReinitialiserPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Minimum 8 caractères.'); return }
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return }

    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (authError) {
      setError('Erreur lors de la mise à jour. Le lien est peut-être expiré.')
    } else {
      router.push('/dashboard')
    }
  }

  const inputClass = 'w-full min-h-[44px] px-4 py-2 border border-blush rounded-lg font-body text-sm bg-white text-chocolat placeholder:text-chocolat/30 focus:outline-none focus:ring-2 focus:ring-rose focus:border-rose transition-colors'

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <header className="border-b border-blush px-6 h-16 flex items-center">
        <Link href="/"><Logo size={32} /></Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-2">
            <h1 className="font-display text-3xl text-chocolat">Nouveau mot de passe</h1>
            <p className="font-body text-sm text-chocolat/60">Choisissez un mot de passe sécurisé.</p>
          </div>

          <div className="bg-white border border-blush rounded-2xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-1">
                <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Nouveau mot de passe</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  className={inputClass} placeholder="Minimum 8 caractères" />
              </div>
              <div className="space-y-1">
                <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Confirmer</label>
                <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  className={inputClass} placeholder="Répétez le mot de passe" />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-body text-sm text-red-700">
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading}
                className="w-full min-h-[44px] px-6 py-3 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity disabled:opacity-50">
                {loading ? 'Mise à jour...' : 'Enregistrer le mot de passe'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
