import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Instant Dessert — Brunch',
  description: 'Réservez votre brunch artisanal Instant Dessert',
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
