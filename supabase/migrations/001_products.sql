-- Migration 001 — Table products
-- Catalogue commun B2B (pro) et B2C (commande)

create table if not exists products (
  id               uuid primary key default gen_random_uuid(),
  nom              text not null,
  description      text not null,
  prix_b2b         numeric(8,2) not null,
  prix_b2c         numeric(8,2) not null,
  categorie        text not null,
  actif            boolean not null default true,
  dlc              text not null,           -- ex: "48h après livraison"
  allergenes       text[] not null default '{}',
  conditionnement  text not null,           -- ex: "Boîte de 6 pièces"
  created_at       timestamptz not null default now()
);

-- RLS : activé sur products
alter table products enable row level security;

-- Public (non authentifié) : SELECT autorisé, mais prix_b2b masqué via vue
create policy "public_read_products"
  on products for select
  to anon
  using (actif = true);

-- Partenaires authentifiés : SELECT complet (prix_b2b visible)
create policy "partner_read_products"
  on products for select
  to authenticated
  using (actif = true);

-- Vue publique sans prix B2B (utilisée par la vitrine pro non authentifiée)
create or replace view products_public as
  select id, nom, description, prix_b2c, categorie, dlc, allergenes, conditionnement
  from products
  where actif = true;

-- Données de démo (4 produits lancement)
insert into products (nom, description, prix_b2b, prix_b2c, categorie, dlc, allergenes, conditionnement) values
(
  'Tarte au citron meringuée',
  'Fond de pâte sablée maison, crème citron acidulée et meringue italienne dorée à la flamme.',
  4.50, 6.80,
  'Tartes',
  '48h après livraison',
  ARRAY['gluten', 'œufs', 'produits laitiers'],
  'Pièce individuelle (Ø 10cm)'
),
(
  'Paris-Brest praliné',
  'Pâte à choux dorée, mousseline praliné aux noisettes du Piémont, craquelin caramélisé.',
  5.20, 7.90,
  'Choux',
  '24h après livraison',
  ARRAY['gluten', 'œufs', 'produits laitiers', 'fruits à coque'],
  'Pièce individuelle (Ø 12cm)'
),
(
  'Fondant chocolat noir 70%',
  'Cœur coulant intense, ganache Valrhona, cacao en poudre non sucré.',
  3.80, 5.90,
  'Chocolat',
  '72h après livraison',
  ARRAY['gluten', 'œufs', 'produits laitiers'],
  'Pièce individuelle (80g)'
),
(
  'Millefeuille vanille Bourbon',
  'Feuilletage inversé pur beurre, crème diplomate vanille Bourbon de Madagascar, glaçage fondant marbré.',
  5.50, 8.20,
  'Classiques',
  '24h après livraison',
  ARRAY['gluten', 'œufs', 'produits laitiers'],
  'Pièce individuelle (rectangle 6×12cm)'
);
