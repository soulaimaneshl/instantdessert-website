import type { Metadata, Viewport } from 'next'
import { cormorantGaramond, montserrat } from '@instantdessert/ui/fonts'
import { CartProvider } from '../lib/cart'
import { Analytics } from '@instantdessert/ui'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_COMMANDE_URL ?? 'https://instantdessert.fr'),
  title: {
    default: 'Commander — Instant Dessert',
    template: '%s — Instant Dessert',
  },
  description: 'Commandez vos pâtisseries artisanales livrées à domicile en Hauts-de-Seine. Tartes, choux, chocolats préparés chaque jour.',
  openGraph: {
    type: 'website',
    siteName: 'Instant Dessert',
    locale: 'fr_FR',
    description: 'Pâtisseries artisanales livrées à domicile en Hauts-de-Seine.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FFF7EE',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorantGaramond.variable} ${montserrat.variable}`}>
      <body className="font-body bg-creme text-chocolat antialiased">
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
