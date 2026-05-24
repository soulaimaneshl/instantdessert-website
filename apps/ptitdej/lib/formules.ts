export interface Formule {
  id: string
  nom: string
  tagline: string
  personnes: number
  prix: number
  inclus: string[]
  emoji: string
  populaire?: boolean
}

export const FORMULES: Formule[] = [
  {
    id: 'solo',
    nom: 'Solo Gourmand',
    tagline: 'Un matin rien que pour vous',
    personnes: 1,
    prix: 18.90,
    emoji: '☕',
    inclus: [
      '2 viennoiseries maison (croissant + pain au chocolat)',
      '1 jus de fruit pressé du jour',
      '1 boisson chaude (café, thé ou chocolat)',
      '1 pâtisserie signature',
    ],
  },
  {
    id: 'duo',
    nom: 'Duo Sucré',
    tagline: 'Partagez un moment de douceur',
    personnes: 2,
    prix: 34.90,
    emoji: '🥐',
    populaire: true,
    inclus: [
      '4 viennoiseries maison assorties',
      '2 jus de fruits pressés du jour',
      '2 boissons chaudes au choix',
      '2 pâtisseries signatures',
      '1 corbeille de fruits frais',
    ],
  },
  {
    id: 'famille',
    nom: 'Formule Famille',
    tagline: 'Le brunch du dimanche en famille',
    personnes: 4,
    prix: 62.90,
    emoji: '🧁',
    inclus: [
      '8 viennoiseries maison assorties',
      '4 jus de fruits pressés du jour',
      '4 boissons chaudes au choix',
      '4 pâtisseries signatures',
      '1 corbeille de fruits frais',
      '1 plateau de fromages affinés',
      '1 planche de charcuteries',
    ],
  },
  {
    id: 'grand',
    nom: 'Grand Brunch',
    tagline: 'Pour les grandes occasions',
    personnes: 6,
    prix: 89.90,
    emoji: '🎉',
    inclus: [
      '12 viennoiseries maison assorties',
      '6 jus de fruits pressés du jour',
      '6 boissons chaudes au choix',
      '6 pâtisseries signatures',
      '2 corbeilles de fruits frais',
      '1 plateau de fromages affinés',
      '1 planche de charcuteries',
      '2 œufs parfaits (brouillés ou cocotte)',
      'Granola maison + yaourt fermier',
    ],
  },
]

export function getFormule(id: string): Formule | undefined {
  return FORMULES.find(f => f.id === id)
}
