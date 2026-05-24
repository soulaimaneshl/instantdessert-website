import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@instantdessert/ui'
import { FORMULES, getFormule } from '../../../lib/formules'
import { ReservationForm } from './ReservationForm'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const formule = getFormule(id)
  if (!formule) return {}
  return {
    title: `Réserver — ${formule.nom}`,
    description: `${formule.tagline} — ${formule.personnes === 1 ? '1 personne' : `${formule.personnes} personnes`} · ${formule.prix.toFixed(2)} €`,
  }
}

export function generateStaticParams() {
  return FORMULES.map(f => ({ id: f.id }))
}

export default async function ReserverPage({ params }: Props) {
  const { id } = await params
  const formule = getFormule(id)
  if (!formule) notFound()

  return (
    <>
      <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-blush px-6 h-16 flex items-center">
        <Link href="/"><Logo size={32} /></Link>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link href="/" className="font-body text-sm text-chocolat/40 hover:text-chocolat transition-colors">← Formules</Link>
          <h1 className="font-display text-3xl text-chocolat mt-2">Réserver votre brunch</h1>
        </div>
        <ReservationForm formule={formule} />
      </main>
    </>
  )
}
