import Link from 'next/link'

interface Props {
  searchParams: Promise<{ id?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { id } = await searchParams
  const ref = id ? id.slice(0, 8).toUpperCase() : '—'

  return (
    <main className="min-h-screen bg-creme flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose/10 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <h1 className="font-display text-3xl text-chocolat mb-2">Commande confirmée !</h1>
          <p className="font-body text-sm text-chocolat/60">
            Votre commande a bien été reçue. Notre équipe la prépare et vous contactera pour la livraison.
          </p>
        </div>

        <div className="bg-blush/30 rounded-xl px-6 py-4">
          <p className="font-body text-xs text-chocolat/50 mb-1">Référence commande</p>
          <p className="font-display text-xl text-chocolat">#{ref}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/commandes/nouvelle"
            className="min-h-[44px] flex items-center justify-center px-6 py-2 bg-chocolat text-creme font-body text-sm rounded-full hover:opacity-80 transition-opacity">
            Passer une nouvelle commande
          </Link>
          <Link href="/commandes"
            className="min-h-[44px] flex items-center justify-center px-6 py-2 border border-chocolat/30 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
            Voir mes commandes
          </Link>
        </div>
      </div>
    </main>
  )
}
