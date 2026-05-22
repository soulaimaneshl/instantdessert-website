import { Cormorant_Garamond, Montserrat } from 'next/font/google'

/*
 * Cormorant Garamond — Titres Display, H1, H2
 * Variable CSS : --font-cormorant-garamond (résolu par --font-display dans tokens.css)
 */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
})

/*
 * Montserrat — H3, body, small, caption
 * Variable CSS : --font-montserrat (résolu par --font-body dans tokens.css)
 */
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})
