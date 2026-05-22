import type { Metadata } from 'next'
import { cormorantGaramond, montserrat } from '@instantdessert/ui/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Instant Dessert Pro',
  description: 'Espace partenaires Instant Dessert',
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
      </body>
    </html>
  )
}
