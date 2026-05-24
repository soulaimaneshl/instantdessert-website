import Link from 'next/link'
import { Logo } from '@instantdessert/ui'
import { getFormule } from '../../lib/formules'

interface Props {
  searchParams: Promise<{ session_id?: string; formule?: string }>
}

export const metadata = { title: 'Réservation confirmée — Instant Dessert Brunch' }

export default async function ConfirmationPage({ searchParams }: Props) {
  const { session_id, formule: formuleId } = await searchParams
  if (!session_id) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-body text-chocolat/50">Page introuvable.</p>
      </main>
    )
  }

  const formule = formuleId ? getFormule(formuleId) : null
  const ref = session_id.startsWith('test_') ? 'BRUNCH-TEST' : session_id.slice(-8).toUpperCase()

  return (
    <>
      <header className="bg-creme border-b border-blush px-6 h-16 flex items-center">
        <Link href="/"><Logo size={32} /></Link>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-16 text-center space-y-8">

        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blush flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-body text-xs text-rose uppercase tracking-widest">Réservation confirmée</p>
          <h1 className="font-display text-4xl text-chocolat">À dimanche !</h1>
          <p className="font-body text-sm text-chocolat/60 leading-relaxed max-w-md mx-auto">
            Votre brunch est réservé. Un email de confirmation vous a été envoyé. Nos pâtissiers seront aux fourneaux dès l&apos;aube.
          </p>
        </div>

        <div className="bg-white border border-blush rounded-2xl p-6 space-y-4 text-left max-w-sm mx-auto">
          <div className="flex justify-between items-center">
            <span className="font-body text-xs text-chocolat/50 uppercase tracking-wide">Référence</span>
            <span className="font-body text-sm text-chocolat font-medium">#{ref}</span>
          </div>
          {formule && (
            <div className="flex items-center gap-3 border-t border-blush pt-4">
              <span className="text-3xl">{formule.emoji}</span>
              <div>
                <p className="font-display text-lg text-chocolat">{formule.nom}</p>
                <p className="font-body text-xs text-chocolat/50">
                  {formule.personnes === 1 ? '1 personne' : `${formule.personnes} personnes`} · {formule.prix.toFixed(2)} €
                </p>
              </div>
            </div>
          )}
          <div className="border-t border-blush pt-4 space-y-2 font-body text-xs text-chocolat/60">
            <p>🕐 Livraison entre <strong>9h et 12h</strong> le dimanche</p>
            <p>📞 Notre équipe vous contacte 30 min avant</p>
          </div>
        </div>

        <Link href="/"
          className="inline-flex min-h-[48px] items-center px-8 py-3 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity">
          Voir les autres formules
        </Link>
      </main>
    </>
  )
}
