import type { Metadata } from 'next'
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
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
