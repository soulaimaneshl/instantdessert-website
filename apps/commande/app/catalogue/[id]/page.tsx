import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@instantdessert/ui'
import { getProduct, getPairings, PRODUCTS } from '../../../lib/products'

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
      <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-blush">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Logo size={32} /></Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/catalogue" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">Catalogue</Link>
            <Link href="/panier" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">Panier</Link>
          </nav>
          <Link href="/panier"
            className="min-h-[44px] inline-flex items-center px-5 py-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
            Panier
          </Link>
        </div>
      </header>

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
          {/* Image */}
          <div className="aspect-square bg-blush/20 rounded-3xl flex items-center justify-center">
            <span className="text-9xl">🧁</span>
          </div>

          {/* Infos */}
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

            {/* Allergènes */}
            <div>
              <p className="font-body text-xs text-chocolat/40 uppercase tracking-wider mb-2">Allergènes</p>
              <div className="flex flex-wrap gap-2">
                {product.allergenes.map(a => (
                  <span key={a} className="font-body text-xs bg-blush text-chocolat/70 px-2.5 py-1 rounded-full">{a}</span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 space-y-3">
              <Link href={`/panier?ajouter=${product.id}`}
                className="min-h-[52px] flex items-center justify-center w-full bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity">
                Ajouter au panier — {product.prix.toFixed(2)} €
              </Link>
              <Link href="/catalogue"
                className="min-h-[44px] flex items-center justify-center w-full border border-chocolat/20 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
                ← Continuer mes achats
              </Link>
            </div>
          </div>
        </div>

        {/* Souvent dégustés avec */}
        {pairings.length > 0 && (
          <section>
            <div className="mb-6">
              <p className="font-body text-xs text-rose uppercase tracking-widest mb-1">Association parfaite</p>
              <h2 className="font-display text-2xl text-chocolat">Souvent dégustés avec</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pairings.map(p => (
                <Link key={p.id} href={`/catalogue/${p.id}`}
                  className="group flex items-center gap-4 bg-white border border-blush rounded-2xl p-4 hover:shadow-md hover:border-rose/30 transition-all">
                  <div className="w-16 h-16 rounded-xl bg-blush/20 flex items-center justify-center shrink-0 group-hover:bg-blush/30 transition-colors">
                    <span className="text-2xl">🧁</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-rose uppercase tracking-wider">{p.categorie}</p>
                    <p className="font-display text-lg text-chocolat leading-snug">{p.nom}</p>
                    <p className="font-body text-xs text-chocolat/50 truncate">{p.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-lg text-caramel">{p.prix.toFixed(2)} €</p>
                    <p className="font-body text-xs text-rose group-hover:underline">Voir →</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>
    </>
  )
}
