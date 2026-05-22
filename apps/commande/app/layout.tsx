import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Instant Dessert — Commander',
  description: 'Commandez vos desserts artisanaux livrés en Hauts-de-Seine',
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
