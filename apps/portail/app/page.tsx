import { Logo } from '@instantdessert/ui'

const destinations = [
  {
    href: process.env.NEXT_PUBLIC_COMMANDE_URL ?? 'http://localhost:3002',
    label: 'Particuliers',
    title: 'Commander',
    description: 'Pâtisseries artisanales livrées à domicile en Hauts-de-Seine.',
    cta: 'Découvrir nos desserts',
    dot: 'bg-rose',
    border: 'hover:border-rose',
    ctaClass: 'bg-rose text-white hover:opacity-90',
  },
  {
    href: process.env.NEXT_PUBLIC_PRO_URL ?? 'http://localhost:3001',
    label: 'Professionnels',
    title: 'Espace Restaurant',
    description: 'Approvisionnez votre établissement en desserts sur mesure.',
    cta: "Accéder à l'espace pro",
    dot: 'bg-caramel',
    border: 'hover:border-caramel',
    ctaClass: 'bg-caramel text-white hover:opacity-90',
  },
  {
    href: process.env.NEXT_PUBLIC_PTITDEJ_URL ?? 'http://localhost:3003',
    label: 'Formules matinales',
    title: 'Petit-déjeuner',
    description: "Viennoiseries et douceurs fraîches livrées dès l'aurore.",
    cta: 'Voir les formules',
    dot: 'bg-blush',
    border: 'hover:border-blush',
    ctaClass: 'bg-chocolat text-creme hover:opacity-90',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-creme flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-6 pt-20 pb-16 text-center">
        <Logo size={48} />
        <div className="space-y-3 max-w-xl">
          <h1 className="font-display text-4xl sm:text-5xl text-chocolat leading-tight">
            L'art de la pâtisserie,<br />
            <span className="italic text-rose">livré à votre porte</span>
          </h1>
          <p className="font-body text-base text-chocolat/60 leading-relaxed">
            Desserts artisanaux préparés chaque jour en Hauts-de-Seine.
          </p>
        </div>
      </section>

      {/* Séparateur décoratif */}
      <div className="flex items-center gap-4 px-8 max-w-4xl mx-auto w-full">
        <div className="flex-1 h-px bg-blush" />
        <div className="w-1.5 h-1.5 rounded-full bg-rose" />
        <div className="flex-1 h-px bg-blush" />
      </div>

      {/* Destination cards */}
      <section className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5 px-6 py-14 max-w-4xl mx-auto w-full">
        {destinations.map((d) => (
          <a
            key={d.href}
            href={d.href}
            className={`group flex flex-col gap-5 bg-white border border-blush rounded-2xl px-6 py-8 shadow-sm transition-all duration-200 ${d.border} hover:shadow-md hover:-translate-y-0.5`}
          >
            {/* Tag */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${d.dot}`} />
              <span className="font-body text-xs uppercase tracking-widest text-chocolat/50">
                {d.label}
              </span>
            </div>

            {/* Titre + description */}
            <div className="flex-1 space-y-2">
              <h2 className="font-display text-2xl text-chocolat leading-tight">
                {d.title}
              </h2>
              <p className="font-body text-sm text-chocolat/60 leading-relaxed">
                {d.description}
              </p>
            </div>

            {/* CTA */}
            <span
              className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2 rounded-full font-body text-sm transition-opacity ${d.ctaClass}`}
            >
              {d.cta}
            </span>
          </a>
        ))}
      </section>

      {/* Footer minimal */}
      <footer className="text-center pb-8 px-6">
        <p className="font-body text-xs text-chocolat/30">
          © {new Date().getFullYear()} Instant Dessert · Hauts-de-Seine
        </p>
      </footer>
    </main>
  )
}
