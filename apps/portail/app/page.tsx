'use client'

import { useState } from 'react'
import { Logo, BottomSheet, EmptyState } from '@instantdessert/ui'

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <main className="p-8 space-y-12">
      {/* Logo */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-chocolat">Logo</h2>
        <div className="flex items-center gap-6 flex-wrap">
          <Logo size={24} />
          <Logo size={32} />
          <Logo size={48} />
        </div>
        <div className="flex gap-6 flex-wrap">
          <div className="bg-chocolat p-4 rounded-xl">
            <Logo size={32} variant="monochrome-clair" />
          </div>
          <div className="bg-creme border border-blush p-4 rounded-xl">
            <Logo size={32} variant="monochrome-sombre" />
          </div>
        </div>
      </section>

      {/* BottomSheet */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-chocolat">BottomSheet</h2>
        <button
          onClick={() => setOpen(true)}
          className="min-h-[44px] px-6 py-2 bg-rose text-white rounded font-body"
        >
          Ouvrir le panier
        </button>
        <BottomSheet open={open} onClose={() => setOpen(false)} title="Mon panier">
          <p className="font-body text-chocolat">Contenu du panier ici.</p>
        </BottomSheet>
      </section>

      {/* EmptyState */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-chocolat">États vides</h2>
        <EmptyState
          icon="🛒"
          message="Votre panier est vide."
          action={{ label: 'Voir les desserts', href: '#' }}
        />
        <EmptyState
          icon="📋"
          message="Aucun historique de commande."
          action={{ label: 'Commander maintenant', href: '#' }}
        />
        <EmptyState
          icon="⚡"
          message="Une erreur réseau est survenue."
          action={{ label: 'Réessayer', onClick: () => alert('Réessayer') }}
        />
      </section>
    </main>
  )
}
