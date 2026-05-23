import { Header } from '../../components/Header'
import { PaiementClient } from './PaiementClient'

export const metadata = { title: 'Paiement — Instant Dessert' }

export default function PaiementPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl text-chocolat mb-8">Finaliser ma commande</h1>
        <PaiementClient />
      </main>
    </>
  )
}
