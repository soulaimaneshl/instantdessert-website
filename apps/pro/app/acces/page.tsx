import { Logo } from '@instantdessert/ui'
import Link from 'next/link'
import { AccessForm } from './AccessForm'

export const metadata = {
  title: 'Demande d\'accès — Instant Dessert Pro',
  description: 'Rejoignez le réseau de partenaires Instant Dessert en 3 étapes.',
}

export default function AccesPage() {
  return (
    <div className="min-h-screen bg-creme flex flex-col">
      {/* Header minimal */}
      <header className="border-b border-blush px-6 h-16 flex items-center justify-between">
        <Link href="/"><Logo size={32} /></Link>
        <Link href="/connexion" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">
          Déjà partenaire ? Se connecter
        </Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Titre */}
          <div className="text-center mb-10 space-y-2">
            <h1 className="font-display text-3xl text-chocolat">Demande d&apos;accès Espace Pro</h1>
            <p className="font-body text-sm text-chocolat/60">
              Remplissez le formulaire en 3 étapes — notre équipe vous recontacte sous 48h.
            </p>
          </div>

          <div className="bg-white border border-blush rounded-2xl p-6 sm:p-8 shadow-sm">
            <AccessForm />
          </div>
        </div>
      </main>
    </div>
  )
}
