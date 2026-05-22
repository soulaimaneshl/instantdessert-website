export interface Product {
  id: string
  nom: string
  categorie: string
  description: string
  descriptionLongue: string
  prix: number
  allergenes: string[]
  poids: string
  pairings: string[] // ids des produits "souvent dégustés avec"
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    nom: 'Tarte au citron meringuée',
    categorie: 'Tartes',
    description: 'Citron de Sicile, meringue italienne dorée au chalumeau',
    descriptionLongue: 'Un équilibre parfait entre l\'acidité vive du citron de Sicile et la douceur aérienne de la meringue italienne. La pâte sablée maison apporte le croustillant idéal.',
    prix: 6.90,
    allergenes: ['Gluten', 'Œufs', 'Lait'],
    poids: '120g',
    pairings: ['2', '5', '7', '8'],
  },
  {
    id: '2',
    nom: 'Paris-Brest praliné',
    categorie: 'Choux',
    description: 'Praliné maison, crème mousseline, noisettes du Piémont',
    descriptionLongue: 'Notre Paris-Brest revisite le classique avec un praliné noisette fait maison et une crème mousseline légère. Les noisettes du Piémont torréfiées apportent une profondeur aromatique incomparable.',
    prix: 7.50,
    allergenes: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],
    poids: '150g',
    pairings: ['1', '4', '5', '8'],
  },
  {
    id: '3',
    nom: 'Fondant chocolat noir 70%',
    categorie: 'Chocolat',
    description: 'Cœur coulant, chocolat Valrhona Grand Cru, fleur de sel',
    descriptionLongue: 'Un fondant à la texture soyeuse avec un cœur coulant intense. Réalisé avec le chocolat Valrhona Guanaja 70%, relevé d\'une pointe de fleur de sel de Guérande.',
    prix: 5.90,
    allergenes: ['Gluten', 'Œufs', 'Lait'],
    poids: '80g',
    pairings: ['6', '5', '7', '8'],
  },
  {
    id: '4',
    nom: 'Millefeuille vanille Bourbon',
    categorie: 'Classiques',
    description: 'Feuilletage caramélisé, crème pâtissière vanille Bourbon',
    descriptionLongue: 'Trois couches de pâte feuilletée inversée caramélisée, garnie d\'une crème pâtissière généreusement parfumée à la vanille Bourbon de Madagascar.',
    prix: 7.20,
    allergenes: ['Gluten', 'Œufs', 'Lait'],
    poids: '130g',
    pairings: ['1', '2', '6', '8'],
  },
  {
    id: '5',
    nom: 'Éclair café',
    categorie: 'Choux',
    description: 'Pâte à choux dorée, crème café, glaçage fondant',
    descriptionLongue: 'La pâte à choux croustillante renferme une crème diplomate au café arabica grand cru. Recouvert d\'un glaçage fondant lisse et brillant.',
    prix: 5.50,
    allergenes: ['Gluten', 'Œufs', 'Lait'],
    poids: '90g',
    pairings: ['3', '7', '8', '2'],
  },
  {
    id: '6',
    nom: 'Tarte framboise & rose',
    categorie: 'Tartes',
    description: 'Framboises fraîches, crème légère à l\'eau de rose',
    descriptionLongue: 'Un fond de tarte sablé à la pistache, garni d\'une crème légère parfumée à l\'eau de rose et recouvert de framboises fraîches du jour.',
    prix: 7.90,
    allergenes: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],
    poids: '125g',
    pairings: ['1', '4', '7', '8'],
  },
  {
    id: '7',
    nom: 'Mousse chocolat au lait',
    categorie: 'Chocolat',
    description: 'Chocolat au lait Jivara, texture aérienne, éclats cacao',
    descriptionLongue: 'Une mousse d\'une légèreté exceptionnelle réalisée avec le chocolat au lait Jivara de Valrhona. Servie avec des éclats de cacao torréfié pour le croquant.',
    prix: 5.20,
    allergenes: ['Œufs', 'Lait'],
    poids: '100g',
    pairings: ['3', '5', '8', '2'],
  },
  {
    id: '8',
    nom: 'Financier amande & miel',
    categorie: 'Petits gâteaux',
    description: 'Beurre noisette, amandes, miel de fleurs',
    descriptionLongue: 'Le financier revisité avec du beurre noisette artisanal, de la poudre d\'amande brute et un filet de miel de fleurs sauvages. Moelleux à cœur, croûte légèrement dorée.',
    prix: 3.50,
    allergenes: ['Gluten', 'Œufs', 'Lait', 'Fruits à coque'],
    poids: '60g',
    pairings: ['1', '5', '3', '6'],
  },
]

export const CATEGORIES = ['Tout', ...Array.from(new Set(PRODUCTS.map(p => p.categorie)))]

export function getProduct(id: string) {
  return PRODUCTS.find(p => p.id === id)
}

export function getPairings(product: Product) {
  return product.pairings.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as Product[]
}
