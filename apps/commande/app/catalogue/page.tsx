import Link from 'next/link'
import { Logo } from '@instantdessert/ui'
import { PRODUCTS, CATEGORIES } from '../../lib/products'
import { CatalogueClient } from './components/CatalogueClient'

export const metadata = { title: 'Catalogue — Instant Dessert' }

export default function CataloguePage() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-blush">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Logo size={32} /></Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/catalogue" className="font-body text-sm text-chocolat font-medium">Catalogue</Link>
            <Link href="/panier" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">Panier</Link>
          </nav>
          <Link href="/panier"
            className="min-h-[44px] inline-flex items-center px-5 py-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
            Panier
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Link href="/" className="font-body text-sm text-chocolat/40 hover:text-chocolat transition-colors">← Accueil</Link>
          <h1 className="font-display text-3xl text-chocolat mt-2">Notre catalogue</h1>
          <p className="font-body text-sm text-chocolat/50 mt-1">{PRODUCTS.length} pâtisseries artisanales disponibles aujourd'hui</p>
        </div>

        <CatalogueClient products={PRODUCTS} categories={CATEGORIES} />
      </main>
    </>
  )
}
