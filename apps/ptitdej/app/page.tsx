import Link from 'next/link'
import { Logo } from '@instantdessert/ui'
import { FORMULES } from '../lib/formules'

export const metadata = {
  title: 'Brunch à domicile — Instant Dessert',
  description: 'Formules brunch artisanales livrées le dimanche matin en Hauts-de-Seine. Viennoiseries, pâtisseries, jus pressés.',
}

export default function BrunchPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-creme/90 backdrop-blur border-b border-blush px-6 h-16 flex items-center justify-between">
        <Link href="/"><Logo size={32} /></Link>
        <nav className="flex items-center gap-6">
          <a href="#formules" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">
            Formules
          </a>
          <a href="#comment" className="font-body text-sm text-chocolat/60 hover:text-chocolat transition-colors">
            Comment ça marche
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-chocolat text-creme">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center space-y-6">
            <span className="inline-block font-body text-xs text-caramel uppercase tracking-widest border border-caramel/40 px-3 py-1 rounded-full">
              Livraison le dimanche matin · Hauts-de-Seine
            </span>
            <h1 className="font-display text-5xl md:text-6xl leading-tight">
              Le brunch artisanal,<br />
              <em className="text-rose not-italic">livré chez vous</em>
            </h1>
            <p className="font-body text-base text-creme/70 leading-relaxed max-w-lg mx-auto">
              Viennoiseries fraîches du matin, pâtisseries signatures, jus pressés à la commande — tout livré entre 9h et 12h le dimanche.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              {['🥐', '🧁', '☕', '🍊', '🫐'].map(e => (
                <span key={e} className="text-3xl">{e}</span>
              ))}
            </div>
            <a href="#formules"
              className="inline-flex min-h-[48px] items-center px-10 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
              Voir les formules →
            </a>
          </div>
        </section>

        {/* Garanties */}
        <section className="bg-blush/30 border-y border-blush">
          <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { titre: 'Livraison dimanche', desc: 'Entre 9h et 12h' },
              { titre: 'Tout artisanal', desc: 'Préparé le matin même' },
              { titre: 'Sans additifs', desc: 'Recettes traditionnelles' },
              { titre: '100% Hauts-de-Seine', desc: 'Rayon 10 km' },
            ].map(g => (
              <div key={g.titre} className="space-y-1">
                <p className="font-display text-base text-chocolat">{g.titre}</p>
                <p className="font-body text-xs text-chocolat/50">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Catalogue formules */}
        <section id="formules" className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="font-body text-xs text-rose uppercase tracking-widest mb-2">Nos formules</p>
            <h2 className="font-display text-3xl text-chocolat">Choisissez votre brunch</h2>
            <p className="font-body text-sm text-chocolat/50 mt-2">Livraison offerte · Paiement sécurisé</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORMULES.map(f => (
              <div key={f.id} className={`relative bg-white border rounded-2xl overflow-hidden flex flex-col transition-shadow hover:shadow-md ${
                f.populaire ? 'border-rose shadow-sm' : 'border-blush'
              }`}>
                {f.populaire && (
                  <div className="bg-rose text-white text-center font-body text-xs py-1.5 uppercase tracking-widest">
                    Le plus populaire
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <div className="space-y-1">
                    <span className="text-4xl">{f.emoji}</span>
                    <p className="font-body text-xs text-rose uppercase tracking-wider mt-2">
                      {f.personnes === 1 ? '1 personne' : `${f.personnes} personnes`}
                    </p>
                    <h3 className="font-display text-xl text-chocolat">{f.nom}</h3>
                    <p className="font-body text-xs text-chocolat/50">{f.tagline}</p>
                  </div>

                  <ul className="space-y-1.5 flex-1">
                    {f.inclus.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-caramel text-xs mt-0.5 shrink-0">✓</span>
                        <span className="font-body text-xs text-chocolat/70 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-blush space-y-3">
                    <p className="font-display text-2xl text-chocolat">{f.prix.toFixed(2)} €</p>
                    <Link href={`/reserver/${f.id}`}
                      className={`min-h-[44px] flex items-center justify-center font-body text-sm rounded-full transition-opacity hover:opacity-90 ${
                        f.populaire ? 'bg-rose text-white' : 'bg-chocolat text-creme'
                      }`}>
                      Réserver →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comment ça marche */}
        <section id="comment" className="bg-chocolat text-creme">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <p className="font-body text-xs text-caramel uppercase tracking-widest mb-2">Simple & rapide</p>
              <h2 className="font-display text-3xl">Comment ça marche ?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { n: '01', titre: 'Choisissez', desc: 'Sélectionnez votre formule et le dimanche de livraison.' },
                { n: '02', titre: 'Payez', desc: 'Paiement sécurisé par carte. Confirmation immédiate par email.' },
                { n: '03', titre: 'Dégustez', desc: 'Votre brunch arrive frais entre 9h et 12h, prêt à être savouré.' },
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
          </div>
        </section>
      </main>

      <footer className="bg-chocolat border-t border-creme/10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size={32} />
          <p className="font-body text-xs text-creme/40 text-center">© 2026 Instant Dessert — Brunch artisanal, Hauts-de-Seine</p>
          <Link href={process.env.NEXT_PUBLIC_COMMANDE_URL ?? 'http://localhost:3002'}
            className="font-body text-xs text-creme/40 hover:text-creme/70 transition-colors">
            Commander des desserts →
          </Link>
        </div>
      </footer>
    </>
  )
}
