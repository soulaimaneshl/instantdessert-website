import type { Metadata } from 'next'
import { cormorantGaramond, montserrat } from '@instantdessert/ui/fonts'
import { Analytics } from '@instantdessert/ui'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PTITDEJ_URL ?? 'https://instantdessert.fr'),
  title: {
    default: 'Petit-déjeuner — Instant Dessert',
    template: '%s | Instant Dessert',
  },
  description: 'Viennoiseries et douceurs fraîches livrées dès l\'aurore en Hauts-de-Seine.',
  openGraph: {
    type: 'website',
    siteName: 'Instant Dessert',
    locale: 'fr_FR',
    description: 'Viennoiseries et douceurs fraîches livrées dès l\'aurore en Hauts-de-Seine.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
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
        <Analytics />
      </body>
    </html>
  )
}
