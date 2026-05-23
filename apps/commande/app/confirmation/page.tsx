import { Header } from '../components/Header'
import { ConfirmationClient } from './ConfirmationClient'

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export const metadata = { title: 'Commande confirmée — Instant Dessert' }

export default async function ConfirmationPage({ searchParams }: Props) {
  const { session_id } = await searchParams

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-16">
        <ConfirmationClient sessionId={session_id} />
      </main>
    </>
  )
}
