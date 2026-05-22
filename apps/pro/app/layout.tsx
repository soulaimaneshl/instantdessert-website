import type { Metadata } from 'next'
import { cormorantGaramond, montserrat } from '@instantdessert/ui/fonts'
import { CookieBanner } from '@instantdessert/ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'Instant Dessert Pro — Espace Partenaires',
  description: 'Approvisionnez votre établissement en pâtisseries artisanales. Demandez votre accès partenaire.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${cormorantGaramond.variable} ${montserrat.variable}`}
    >
      <body className="font-body bg-creme text-chocolat antialiased">
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
