import { Logo } from '@instantdessert/ui'
import Link from 'next/link'
import { ProductCard } from './components/ProductCard'
import { GuaranteeSection } from './components/GuaranteeSection'

// Données mock — à remplacer par un appel Supabase (vue products_public) quand configuré
const PRODUCTS_MOCK = [
  {
    id: '1',
    nom: 'Tarte au citron meringuée',
    description: 'Fond de pâte sablée maison, crème citron acidulée et meringue italienne dorée à la flamme.',
    categorie: 'Tartes',
    dlc: '48h après livraison',
    allergenes: ['gluten', 'œufs', 'produits laitiers'],
    conditionnement: 'Pièce individuelle (Ø 10cm)',
  },
  {
    id: '2',
    nom: 'Paris-Brest praliné',
    description: 'Pâte à choux dorée, mousseline praliné aux noisettes du Piémont, craquelin caramélisé.',
    categorie: 'Choux',
    dlc: '24h après livraison',
    allergenes: ['gluten', 'œufs', 'produits laitiers', 'fruits à coque'],
    conditionnement: 'Pièce individuelle (Ø 12cm)',
  },
  {
    id: '3',
    nom: 'Fondant chocolat noir 70%',
    description: 'Cœur coulant intense, ganache Valrhona, cacao en poudre non sucré.',
    categorie: 'Chocolat',
    dlc: '72h après livraison',
    allergenes: ['gluten', 'œufs', 'produits laitiers'],
    conditionnement: 'Pièce individuelle (80g)',
  },
  {
    id: '4',
    nom: 'Millefeuille vanille Bourbon',
    description: 'Feuilletage inversé pur beurre, crème diplomate vanille Bourbon de Madagascar.',
    categorie: 'Classiques',
    dlc: '24h après livraison',
    allergenes: ['gluten', 'œufs', 'produits laitiers'],
    conditionnement: 'Pièce individuelle (rectangle 6×12cm)',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-blush">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size={32} />
          <Link
            href="/acces"
            className="min-h-[44px] inline-flex items-center px-5 py-2 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity"
          >
            Demander un accès
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center space-y-5">
          <span className="inline-block font-body text-xs uppercase tracking-widest text-caramel border border-caramel/40 rounded-full px-4 py-1">
            Espace Professionnels
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-chocolat leading-tight max-w-2xl mx-auto">
            Des pâtisseries artisanales<br />
            <span className="italic text-rose">pour votre carte</span>
          </h1>
          <p className="font-body text-base text-chocolat/60 max-w-xl mx-auto leading-relaxed">
            Approvisionnez votre restaurant ou hôtel en desserts préparés chaque jour en Hauts-de-Seine. Sans intermédiaire, avec traçabilité complète.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/acces"
              className="min-h-[44px] inline-flex items-center justify-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity"
            >
              Demander un accès Espace Pro
            </Link>
            <Link
              href="/connexion"
              className="min-h-[44px] inline-flex items-center justify-center px-8 py-3 border border-chocolat/30 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </section>

        {/* Garanties */}
        <GuaranteeSection />

        {/* Séparateur */}
        <div className="max-w-5xl mx-auto px-6 py-2">
          <div className="h-px bg-blush" />
        </div>

        {/* Catalogue */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-3xl text-chocolat">Notre catalogue</h2>
            <span className="font-body text-sm text-chocolat/40">Prix sur espace partenaire</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {PRODUCTS_MOCK.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <p className="mt-8 text-center font-body text-sm text-chocolat/40">
            Les tarifs B2B sont accessibles après validation de votre espace partenaire.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blush py-8 text-center">
        <p className="font-body text-xs text-chocolat/30">
          © {new Date().getFullYear()} Instant Dessert · Hauts-de-Seine
        </p>
      </footer>
    </div>
  )
}
