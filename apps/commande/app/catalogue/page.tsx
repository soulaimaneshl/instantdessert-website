import { PRODUCTS, CATEGORIES } from '../../lib/products'
import { CatalogueClient } from './components/CatalogueClient'
import { Header } from '../components/Header'
import { HabitualBanner } from './components/HabitualBanner'

export const metadata = {
  title: 'Nos délices',
  description: 'Découvrez nos pâtisseries artisanales : tartes, choux, chocolats et classiques préparés chaque jour en Hauts-de-Seine.',
  openGraph: { title: 'Nos délices — Instant Dessert', description: 'Pâtisseries artisanales livrées à domicile.' },
}

export default function CataloguePage() {
  return (
    <>
      <Header activePage="catalogue" />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <a href="/" className="font-body text-sm text-chocolat/40 hover:text-chocolat transition-colors">← Accueil</a>
          <h1 className="font-display text-3xl text-chocolat mt-2">Nos délices</h1>
          <p className="font-body text-sm text-chocolat/50 mt-1">{PRODUCTS.length} pâtisseries artisanales disponibles aujourd'hui</p>
        </div>
        <HabitualBanner />
        <CatalogueClient products={PRODUCTS} categories={CATEGORIES} />
      </main>
    </>
  )
}
