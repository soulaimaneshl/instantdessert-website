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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                    className={inputClass + ' pr-11'} placeholder="Minimum 8 caractères" />
                  <button type="button" tabIndex={-1} onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolat/40 hover:text-chocolat transition-colors">
                    {showPassword
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">Confirmer</label>
                <div className="relative">
                  <input type={showConfirm ? 'text' : 'password'} required value={confirm} onChange={e => setConfirm(e.target.value)}
                    className={inputClass + ' pr-11'} placeholder="Répétez le mot de passe" />
                  <button type="button" tabIndex={-1} onClick={() => setShowConfirm(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolat/40 hover:text-chocolat transition-colors">
                    {showConfirm
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
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
