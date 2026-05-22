import { Header } from '../components/Header'
import { PanierClient } from './PanierClient'

export const metadata = { title: 'Panier — Instant Dessert' }

export default function PanierPage() {
  return (
    <>
      <Header activePage="panier" />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-display text-3xl text-chocolat mb-8">Mon panier</h1>
        <PanierClient />
      </main>
    </>
  )
}
