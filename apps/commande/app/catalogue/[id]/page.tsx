import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getPairings, PRODUCTS } from '../../../lib/products'
import { Header } from '../../components/Header'
import { AddToCartButton } from '../components/AddToCartButton'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }))
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const pairings = getPairings(product)

  return (
    <>
      <Header activePage="catalogue" />
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-16">

        {/* Fil d'Ariane */}
        <nav className="font-body text-sm text-chocolat/40 flex items-center gap-2">
          <Link href="/" className="hover:text-chocolat transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/catalogue" className="hover:text-chocolat transition-colors">Catalogue</Link>
          <span>/</span>
          <span className="text-chocolat">{product.nom}</span>
        </nav>

        {/* Fiche produit */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="aspect-square bg-blush/20 rounded-3xl flex items-center justify-center">
            <span className="text-9xl">🧁</span>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-body text-xs text-rose uppercase tracking-widest mb-2">{product.categorie}</p>
              <h1 className="font-display text-4xl text-chocolat leading-tight">{product.nom}</h1>
              <p className="font-body text-sm text-chocolat/60 mt-2 leading-relaxed">{product.descriptionLongue}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-caramel">{product.prix.toFixed(2)} €</span>
              <span className="font-body text-sm text-chocolat/40">{product.poids}</span>
            </div>

            <div>
              <p className="font-body text-xs text-chocolat/40 uppercase tracking-wider mb-2">Allergènes</p>
              <div className="flex flex-wrap gap-2">
                {product.allergenes.map(a => (
                  <span key={a} className="font-body text-xs bg-blush text-chocolat/70 px-2.5 py-1 rounded-full">{a}</span>
                ))}
              </div>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>

        {/* Souvent dégustés avec */}
        {pairings.length > 0 && (
          <section>
            <div className="mb-6">
              <p className="font-body text-xs text-rose uppercase tracking-widest mb-1">Association parfaite</p>
              <h2 className="font-display text-2xl text-chocolat">Souvent dégustés avec</h2>
            </div>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {pairings.map(p => (
                  <Link key={p.id} href={`/catalogue/${p.id}`}
                    className="group shrink-0 w-[280px] snap-start bg-white border border-blush rounded-2xl overflow-hidden hover:shadow-md hover:border-rose/30 transition-all flex flex-col">
                    <div className="h-48 bg-blush/20 flex items-center justify-center group-hover:bg-blush/30 transition-colors">
                      <span className="text-6xl">🧁</span>
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-1">
                      <p className="font-body text-xs text-rose uppercase tracking-wider">{p.categorie}</p>
                      <p className="font-display text-lg text-chocolat leading-snug">{p.nom}</p>
                      <p className="font-body text-xs text-chocolat/50 leading-snug flex-1">{p.description}</p>
                      <p className="font-display text-xl text-caramel mt-2">{p.prix.toFixed(2)} €</p>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Gradient droit pour indiquer qu'il y a plus */}
              <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-creme to-transparent pointer-events-none" />
            </div>
          </section>
        )}

      </main>
    </>
  )
}
