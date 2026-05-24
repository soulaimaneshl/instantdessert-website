'use client'

import { useState } from 'react'
import { Logo } from '@instantdessert/ui'
import Link from 'next/link'
import { submitAccessRequest, type AccessFormData } from './actions'

type Step = 1 | 2 | 3

const STEPS = [
  { n: 1, label: 'Vos coordonnées' },
  { n: 2, label: 'Votre restaurant' },
  { n: 3, label: 'Confirmation' },
]

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string) {
  return /^(\+33|0)[1-9](\d{8})$/.test(phone.replace(/\s/g, ''))
}

export function AccessForm() {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [fields, setFields] = useState({
    prenom: '', nom: '', email: '', password: '', confirmPassword: '',
    nomRestaurant: '', adresse: '', telephone: '',
  })
  const [errors, setErrors] = useState<Partial<typeof fields>>({})

  function set(key: keyof typeof fields, value: string) {
    setFields(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  function validateStep1() {
    const e: Partial<typeof fields> = {}
    if (!fields.prenom.trim()) e.prenom = 'Requis'
    if (!fields.nom.trim()) e.nom = 'Requis'
    if (!validateEmail(fields.email)) e.email = 'Email invalide'
    if (fields.password.length < 8) e.password = 'Minimum 8 caractères'
    if (fields.password !== fields.confirmPassword) e.confirmPassword = 'Les mots de passe ne correspondent pas'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: Partial<typeof fields> = {}
    if (!fields.nomRestaurant.trim()) e.nomRestaurant = 'Requis'
    if (!fields.adresse.trim()) e.adresse = 'Requis'
    if (!validatePhone(fields.telephone)) e.telephone = 'Numéro invalide (ex: 06 12 34 56 78)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (step === 1 && validateStep1()) setStep(2)
    if (step === 2 && validateStep2()) setStep(3)
  }

  async function submit() {
    setSubmitting(true)
    setServerError('')
    const data: AccessFormData = {
      prenom: fields.prenom, nom: fields.nom, email: fields.email,
      password: fields.password, nomRestaurant: fields.nomRestaurant,
      adresse: fields.adresse, telephone: fields.telephone,
    }
    const result = await submitAccessRequest(data)
    setSubmitting(false)
    if (result.success) {
      setSuccess(true)
    } else {
      setServerError(result.error ?? 'Erreur inconnue')
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="text-5xl">🎉</div>
        <h2 className="font-display text-2xl text-chocolat">Demande envoyée !</h2>
        <p className="font-body text-sm text-chocolat/60 max-w-sm mx-auto">
          Nous avons bien reçu votre demande pour <strong>{fields.nomRestaurant}</strong>. Notre équipe vous contactera sous 48h.
        </p>
        <Link href="/" className="inline-block mt-4 font-body text-sm text-rose underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Étapes */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-body text-xs font-semibold shrink-0 transition-colors
              ${step === s.n ? 'bg-rose text-white' : step > s.n ? 'bg-chocolat text-creme' : 'bg-blush text-chocolat/40'}`}>
              {step > s.n ? '✓' : s.n}
            </div>
            <span className={`font-body text-xs hidden sm:block ${step === s.n ? 'text-chocolat' : 'text-chocolat/40'}`}>
              {s.label}
            </span>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-blush mx-1" />}
          </div>
        ))}
      </div>

      {/* Étape 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl text-chocolat">Vos coordonnées</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom" error={errors.prenom}>
              <input value={fields.prenom} onChange={e => set('prenom', e.target.value)}
                className={input(errors.prenom)} placeholder="Marie" />
            </Field>
            <Field label="Nom" error={errors.nom}>
              <input value={fields.nom} onChange={e => set('nom', e.target.value)}
                className={input(errors.nom)} placeholder="Dupont" />
            </Field>
          </div>
          <Field label="Email professionnel" error={errors.email}>
            <input type="email" value={fields.email} onChange={e => set('email', e.target.value)}
              className={input(errors.email)} placeholder="marie@restaurant.fr" />
          </Field>
          <Field label="Mot de passe" error={errors.password}>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={fields.password} onChange={e => set('password', e.target.value)}
                className={input(errors.password) + ' pr-11'} placeholder="Minimum 8 caractères" />
              <button type="button" tabIndex={-1} onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolat/40 hover:text-chocolat transition-colors">
                {showPassword
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
              </button>
            </div>
          </Field>
          <Field label="Confirmer le mot de passe" error={errors.confirmPassword}>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} value={fields.confirmPassword} onChange={e => set('confirmPassword', e.target.value)}
                className={input(errors.confirmPassword) + ' pr-11'} placeholder="Répétez le mot de passe" />
              <button type="button" tabIndex={-1} onClick={() => setShowConfirmPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolat/40 hover:text-chocolat transition-colors">
                {showConfirmPassword
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
              </button>
            </div>
          </Field>
        </div>
      )}

      {/* Étape 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl text-chocolat">Votre restaurant</h2>
          <Field label="Nom du restaurant" error={errors.nomRestaurant}>
            <input value={fields.nomRestaurant} onChange={e => set('nomRestaurant', e.target.value)}
              className={input(errors.nomRestaurant)} placeholder="Le Petit Bistro" />
          </Field>
          <Field label="Adresse" error={errors.adresse}>
            <input value={fields.adresse} onChange={e => set('adresse', e.target.value)}
              className={input(errors.adresse)} placeholder="12 rue de la Paix, 92100 Boulogne" />
          </Field>
          <Field label="Téléphone" error={errors.telephone}>
            <input type="tel" value={fields.telephone} onChange={e => set('telephone', e.target.value)}
              className={input(errors.telephone)} placeholder="06 12 34 56 78" />
          </Field>
        </div>
      )}

      {/* Étape 3 — Récapitulatif */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl text-chocolat">Confirmation</h2>
          <div className="bg-blush/40 rounded-xl p-5 space-y-3 font-body text-sm">
            <Row label="Nom" value={`${fields.prenom} ${fields.nom}`} />
            <Row label="Email" value={fields.email} />
            <Row label="Restaurant" value={fields.nomRestaurant} />
            <Row label="Adresse" value={fields.adresse} />
            <Row label="Téléphone" value={fields.telephone} />
          </div>
          <p className="font-body text-xs text-chocolat/50">
            En soumettant ce formulaire, vous acceptez que vos données soient traitées par Instant Dessert dans le cadre de votre demande de partenariat.
          </p>
          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-body text-sm text-red-700">
              {serverError}
              <button onClick={submit} className="ml-2 underline">Réessayer</button>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        {step > 1 && (
          <button onClick={() => setStep(s => (s - 1) as Step)}
            className="min-h-[44px] px-6 py-2 border border-chocolat/30 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
            Retour
          </button>
        )}
        {step < 3 ? (
          <button onClick={next}
            className="min-h-[44px] flex-1 px-6 py-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
            Continuer →
          </button>
        ) : (
          <button onClick={submit} disabled={submitting}
            className="min-h-[44px] flex-1 px-6 py-2 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity disabled:opacity-50">
            {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>
        )}
      </div>
    </div>
  )
}

function input(error?: string) {
  return `w-full min-h-[44px] px-4 py-2 border rounded-lg font-body text-sm bg-white text-chocolat placeholder:text-chocolat/30 focus:outline-none focus:ring-2 focus:ring-rose transition-colors ${error ? 'border-red-400' : 'border-blush focus:border-rose'}`
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="font-body text-xs uppercase tracking-wide text-chocolat/60">{label}</label>
      {children}
      {error && <p className="font-body text-xs text-red-500">{error}</p>}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-chocolat/50">{label}</span>
      <span className="text-chocolat font-medium text-right">{value}</span>
    </div>
  )
}
