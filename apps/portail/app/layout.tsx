import type { Metadata } from 'next'
import { cormorantGaramond, montserrat } from '@instantdessert/ui/fonts'
import { CookieBanner, Analytics } from '@instantdessert/ui'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://instantdessert.fr'),
  title: {
    default: 'Instant Dessert — Pâtisserie artisanale',
    template: '%s | Instant Dessert',
  },
  description: 'Desserts artisanaux préparés chaque jour et livrés à domicile en Hauts-de-Seine.',
  openGraph: {
    type: 'website',
    siteName: 'Instant Dessert',
    locale: 'fr_FR',
    description: 'Desserts artisanaux préparés chaque jour et livrés à domicile en Hauts-de-Seine.',
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
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
