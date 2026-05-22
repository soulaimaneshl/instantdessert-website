import { Logo } from '@instantdessert/ui'
import Link from 'next/link'
import { LoginForm } from './LoginForm'

export const metadata = {
  title: 'Connexion — Instant Dessert Pro',
}

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <header className="border-b border-blush px-6 h-16 flex items-center">
        <Link href="/"><Logo size={32} /></Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-2">
            <h1 className="font-display text-3xl text-chocolat">Espace Partenaire</h1>
            <p className="font-body text-sm text-chocolat/60">Connectez-vous à votre tableau de bord</p>
          </div>

          <div className="bg-white border border-blush rounded-2xl p-6 sm:p-8 shadow-sm">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  )
}
