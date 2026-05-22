'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

const STORAGE_KEY = 'cookie_consent'
type ConsentValue = 'accepted' | 'refused'

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentValue | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue | null
    if (stored) {
      setConsent(stored)
    } else {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
  }

  function refuse() {
    localStorage.setItem(STORAGE_KEY, 'refused')
    setConsent('refused')
    setVisible(false)
  }

  return (
    <>
      {consent === 'accepted' && process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {visible && (
        <div
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-modal="false"
          className="fixed bottom-0 left-0 right-0 z-50 bg-chocolat text-creme px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p id="cookie-banner-title" className="font-body text-sm leading-relaxed">
            Nous utilisons des cookies analytiques pour améliorer votre expérience.{' '}
            <a href="/confidentialite" className="underline hover:text-rose transition-colors">
              Politique de confidentialité
            </a>
          </p>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={refuse}
              className="min-h-[44px] min-w-[44px] px-5 py-2 font-body text-sm border border-creme/50 rounded hover:bg-creme hover:text-chocolat transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={accept}
              className="min-h-[44px] min-w-[44px] px-5 py-2 font-body text-sm bg-rose text-white rounded hover:opacity-90 transition-opacity"
            >
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  )
}
