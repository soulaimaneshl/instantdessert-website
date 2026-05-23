import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@instantdessert/ui'
import { createClient } from '@instantdessert/supabase/server'
import { SignupForm } from './SignupForm'

interface Props {
  searchParams: Promise<{ next?: string }>
}

export const metadata = { title: 'Créer un compte — Instant Dessert' }

export default async function InscriptionPage({ searchParams }: Props) {
  const { next } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect(next ?? '/catalogue')

  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <header className="border-b border-blush px-6 h-16 flex items-center justify-between">
        <Link href="/"><Logo size={32} /></Link>
        <Link href="/catalogue" className="font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors">
          ← Continuer mes achats
        </Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 space-y-2">
            <p className="font-body text-xs text-rose uppercase tracking-widest">Mon compte</p>
            <h1 className="font-display text-3xl text-chocolat">Rejoignez-nous</h1>
            <p className="font-body text-sm text-chocolat/60">Créez votre compte pour commander facilement</p>
          </div>

          <div className="bg-white border border-blush rounded-2xl p-6 sm:p-8 shadow-sm">
            <SignupForm next={next} />
          </div>

          <p className="text-center font-body text-sm text-chocolat/50 mt-6">
            Déjà un compte ?{' '}
            <Link
              href={next ? `/connexion?next=${encodeURIComponent(next)}` : '/connexion'}
              className="text-rose hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
