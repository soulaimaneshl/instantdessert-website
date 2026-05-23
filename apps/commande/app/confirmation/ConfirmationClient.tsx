'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '../../lib/cart'

interface Props {
  sessionId?: string
}

export function ConfirmationClient({ sessionId }: Props) {
  const { clear } = useCart()

  useEffect(() => {
    if (sessionId) clear()
  }, [sessionId, clear])

  if (!sessionId) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-2xl text-chocolat/50 mb-6">Page introuvable</p>
        <Link href="/" className="min-h-[44px] inline-flex items-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  const orderRef = sessionId.startsWith('test_')
    ? 'TEST-0001'
    : sessionId.slice(-8).toUpperCase()

  return (
    <div className="text-center space-y-8">
      {/* Icône succès */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-full bg-blush flex items-center justify-center">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>

      {/* Message principal */}
      <div className="space-y-3">
        <p className="font-body text-xs text-rose uppercase tracking-widest">Commande confirmée</p>
        <h1 className="font-display text-4xl text-chocolat">Merci pour votre commande !</h1>
        <p className="font-body text-sm text-chocolat/60 leading-relaxed max-w-md mx-auto">
          Votre paiement a bien été reçu. Nos pâtissiers préparent vos délices avec soin.
        </p>
      </div>

      {/* Référence commande */}
      <div className="bg-white border border-blush rounded-2xl p-6 space-y-4 text-left max-w-sm mx-auto">
        <div className="flex justify-between items-center">
          <span className="font-body text-xs text-chocolat/50 uppercase tracking-wide">Référence</span>
          <span className="font-body text-sm text-chocolat font-medium">#{orderRef}</span>
        </div>
        <div className="border-t border-blush pt-4 space-y-2">
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-rose shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div>
              <p className="font-body text-sm text-chocolat font-medium">Livraison en 45 minutes</p>
              <p className="font-body text-xs text-chocolat/50">Notre coursier vous contactera par téléphone</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-rose shrink-0 mt-0.5">
              <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m8-7v7"/>
            </svg>
            <div>
              <p className="font-body text-sm text-chocolat font-medium">Email de confirmation</p>
              <p className="font-body text-xs text-chocolat/50">Un récapitulatif vous a été envoyé</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/catalogue"
          className="min-h-[44px] inline-flex items-center justify-center px-8 py-3 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity">
          Commander à nouveau
        </Link>
        <Link href="/"
          className="min-h-[44px] inline-flex items-center justify-center px-8 py-3 border border-chocolat/20 text-chocolat font-body text-sm rounded-full hover:border-chocolat transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
