import type { Metadata } from 'next'
import { cormorantGaramond, montserrat } from '@instantdessert/ui/fonts'
import { CookieBanner, Analytics } from '@instantdessert/ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'Instant Dessert',
  description: 'Pâtisserie artisanale livrée à domicile en Hauts-de-Seine',
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
