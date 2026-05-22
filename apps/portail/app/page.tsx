'use client'

import { useState } from 'react'
import { Logo, BottomSheet, EmptyState } from '@instantdessert/ui'

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <main className="p-8 space-y-10 bg-creme min-h-screen">

      {/* Logo — 3 variantes × 3 tailles */}
      <section className="space-y-4">
        <h2 className="font-display text-xl text-chocolat">Logo</h2>
        <div className="space-y-3">
          <Logo variant="default" size={24} />
          <Logo variant="default" size={32} />
          <Logo variant="default" size={48} />
        </div>
        <div className="bg-chocolat p-4 rounded-xl space-y-3">
          <Logo variant="monochrome-clair" size={32} />
          <Logo variant="monochrome-sombre" size={32} />
        </div>
      </section>

      {/* BottomSheet */}
      <section className="space-y-3">
        <h2 className="font-display text-xl text-chocolat">BottomSheet</h2>
        <button
          onClick={() => setSheetOpen(true)}
          className="min-h-[44px] px-6 py-2 bg-rose text-white font-body text-sm rounded-full"
        >
          Ouvrir le panier
        </button>
        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Mon panier"
        >
          <p className="font-body text-sm text-chocolat">Contenu du panier ici.</p>
        </BottomSheet>
      </section>

      {/* EmptyState */}
      <section className="space-y-3">
        <h2 className="font-display text-xl text-chocolat">États vides</h2>
        <div className="border border-blush rounded-2xl">
          <EmptyState
            icon="🛒"
            message="Votre panier est vide. Découvrez nos desserts artisanaux."
            action={{ label: 'Voir les desserts', href: '#' }}
          />
        </div>
        <div className="border border-blush rounded-2xl">
          <EmptyState
            icon="📋"
            message="Vous n'avez pas encore passé de commande."
            action={{ label: 'Commander maintenant', href: '#' }}
          />
        </div>
        <div className="border border-blush rounded-2xl">
          <EmptyState
            icon="⚡"
            message="Connexion perdue. Vérifiez votre réseau et réessayez."
            action={{ label: 'Réessayer', onClick: () => window.location.reload() }}
          />
        </div>
      </section>

    </main>
  )
}
