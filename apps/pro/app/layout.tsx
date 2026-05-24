import type { Metadata } from 'next'
import { cormorantGaramond, montserrat } from '@instantdessert/ui/fonts'
import { CookieBanner, Analytics } from '@instantdessert/ui'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PRO_URL ?? 'https://instantdessert.fr'),
  title: {
    default: 'Instant Dessert Pro — Espace Partenaires',
    template: '%s | Instant Dessert Pro',
  },
  description: 'Approvisionnez votre établissement en pâtisseries artisanales. Commandes B2B, livraison en Hauts-de-Seine.',
  openGraph: {
    type: 'website',
    siteName: 'Instant Dessert Pro',
    locale: 'fr_FR',
    description: 'Espace partenaire Instant Dessert — commandes B2B pour restaurants et établissements.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false },
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
        <Analytics />
      </body>
    </html>
  )
}
