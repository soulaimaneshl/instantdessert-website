import Link from 'next/link'
import { Logo, CookieBanner } from '@instantdessert/ui'
import { Header } from './components/Header'

const FEATURED = [
  { nom: 'Tarte au citron meringuée', categorie: 'Tartes', prix: 6.90, description: 'Citron de Sicile, meringue italienne dorée au chalumeau' },
  { nom: 'Paris-Brest praliné', categorie: 'Choux', prix: 7.50, description: 'Praliné maison, crème mousseline, noisettes du Piémont' },
  { nom: 'Fondant chocolat noir 70%', categorie: 'Chocolat', prix: 5.90, description: 'Cœur coulant, chocolat Valrhona Grand Cru, fleur de sel' },
  { nom: 'Millefeuille vanille Bourbon', categorie: 'Classiques', prix: 7.20, description: 'Feuilletage caramélisé, crème pâtissière vanille Bourbon' },
]

const GARANTIES = [
  { titre: 'Artisanal & local', desc: 'Fabriqué chaque matin en Hauts-de-Seine' },
  { titre: 'Livraison express', desc: 'Livré en 45 min dans un rayon de 10 km' },
  { titre: 'Fraîcheur garantie', desc: 'DLC courte, produits du jour uniquement' },
  { titre: 'Sans additifs', desc: 'Ingrédients naturels, recettes traditionnelles' },
]

export default function CommandePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-chocolat text-creme">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block font-body text-xs text-caramel uppercase tracking-widest border border-caramel/40 px-3 py-1 rounded-full">
                Dark Kitchen · Hauts-de-Seine
              </span>
              <h1 className="font-display text-5xl md:text-6xl leading-tight">
                Des desserts artisanaux,<br />
                <em className="text-rose not-italic">livrés chez vous</em>
              </h1>
              <p className="font-body text-base text-creme/70 leading-relaxed max-w-md">
                Chaque création est réalisée le matin même par nos pâtissiers. Pas de conservateurs, pas de surgelés — juste de la pâtisserie comme elle devrait être.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/catalogue"
                  className="min-h-[48px] inline-flex items-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
                  Voir le catalogue
                </Link>
                <Link href="/catalogue"
                  className="min-h-[48px] inline-flex items-center px-8 py-3 border border-creme/30 text-creme font-body text-sm rounded-full hover:border-creme/60 transition-colors">
                  En savoir plus
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-creme/5 border border-creme/10 flex items-center justify-center">
                <span className="text-8xl">🍰</span>
              </div>
            </div>
          </div>
        </section>

        {/* Garanties */}
        <section className="bg-blush/30 border-y border-blush">
          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {GARANTIES.map(g => (
              <div key={g.titre} className="text-center space-y-1">
                <p className="font-display text-base text-chocolat">{g.titre}</p>
                <p className="font-body text-xs text-chocolat/50 leading-snug">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Produits vedettes */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-body text-xs text-rose uppercase tracking-widest mb-1">Nos créations</p>
              <h2 className="font-display text-3xl text-chocolat">Sélection du moment</h2>
            </div>
            <Link href="/catalogue" className="font-body text-sm text-chocolat/50 hover:text-chocolat transition-colors hidden md:block">
              Tout voir →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED.map(p => (
              <Link key={p.nom} href="/catalogue"
                className="group bg-white border border-blush rounded-2xl overflow-hidden hover:shadow-md hover:border-rose/30 transition-all">
                <div className="aspect-square bg-blush/20 flex items-center justify-center group-hover:bg-blush/30 transition-colors">
                  <span className="text-5xl">🧁</span>
                </div>
                <div className="p-4 space-y-1.5">
                  <p className="font-body text-xs text-rose uppercase tracking-wider">{p.categorie}</p>
                  <p className="font-display text-lg text-chocolat leading-snug">{p.nom}</p>
                  <p className="font-body text-xs text-chocolat/50 leading-snug">{p.description}</p>
                  <p className="font-display text-xl text-caramel pt-1">{p.prix.toFixed(2)} €</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/catalogue"
              className="min-h-[44px] inline-flex items-center px-6 py-2 border border-chocolat/20 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
              Voir tout le catalogue →
            </Link>
          </div>
        </section>

        {/* Fonctionnement */}
        <section className="bg-chocolat text-creme">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <p className="font-body text-xs text-caramel uppercase tracking-widest mb-2">Simple & rapide</p>
              <h2 className="font-display text-3xl">Comment ça marche ?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: '01', titre: 'Choisissez', desc: 'Parcourez notre catalogue de pâtisseries artisanales et ajoutez vos favoris au panier.' },
                { n: '02', titre: 'Commandez', desc: 'Finalisez votre commande en quelques secondes. Paiement sécurisé par carte.' },
                { n: '03', titre: 'Dégustez', desc: 'Livraison en 45 min. Vos desserts arrivent frais, prêts à être savourés.' },
              ].map(s => (
                <div key={s.n} className="flex gap-4">
                  <span className="font-display text-4xl text-rose/40 leading-none shrink-0">{s.n}</span>
                  <div>
                    <p className="font-display text-xl text-creme mb-1">{s.titre}</p>
                    <p className="font-body text-sm text-creme/60 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/catalogue"
                className="min-h-[48px] inline-flex items-center px-10 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
                Commander maintenant
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-chocolat border-t border-creme/10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size={32} />
          <p className="font-body text-xs text-creme/40 text-center">© 2026 Instant Dessert — Pâtisserie artisanale, Hauts-de-Seine</p>
          <Link href="http://localhost:3001" className="font-body text-xs text-creme/40 hover:text-creme/70 transition-colors">
            Espace Partenaires →
          </Link>
        </div>
      </footer>

      <CookieBanner />
    </>
  )
}
