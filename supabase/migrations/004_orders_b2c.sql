-- Migration 004 — Profils clients + Commandes B2C

-- ── Profils (étend auth.users) ──────────────────────────────────────────────
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  prenom     text,
  email      text not null,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "owner_read_profile"
  on profiles for select to authenticated
  using (id = auth.uid());

create policy "owner_update_profile"
  on profiles for update to authenticated
  using (id = auth.uid());

-- Création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, prenom)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'prenom'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Commandes B2C ────────────────────────────────────────────────────────────
create table if not exists orders_b2c (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  statut             text not null default 'en_attente'
                     check (statut in ('en_attente', 'en_preparation', 'en_livraison', 'livre', 'annule')),
  total              numeric(8,2) not null,
  adresse_prenom     text not null,
  adresse_nom        text not null,
  adresse_telephone  text not null,
  adresse_ligne1     text not null,
  adresse_code_postal text not null,
  adresse_ville      text not null,
  stripe_session_id  text,
  created_at         timestamptz not null default now()
);

create table if not exists order_items_b2c (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references orders_b2c(id) on delete cascade,
  product_id text not null,
  nom        text not null,
  prix       numeric(8,2) not null,
  quantite   integer not null check (quantite > 0)
);

alter table orders_b2c enable row level security;
alter table order_items_b2c enable row level security;

-- Un client voit uniquement ses commandes
create policy "owner_read_orders_b2c"
  on orders_b2c for select to authenticated
  using (user_id = auth.uid());

create policy "owner_insert_orders_b2c"
  on orders_b2c for insert to authenticated
  with check (user_id = auth.uid());

create policy "owner_read_items_b2c"
  on order_items_b2c for select to authenticated
  using (order_id in (
    select id from orders_b2c where user_id = auth.uid()
  ));

create policy "owner_insert_items_b2c"
  on order_items_b2c for insert to authenticated
  with check (order_id in (
    select id from orders_b2c where user_id = auth.uid()
  ));

-- Service role peut insérer (depuis les Server Actions Stripe webhook)
create policy "service_insert_orders_b2c"
  on orders_b2c for insert to service_role
  with check (true);

create policy "service_insert_items_b2c"
  on order_items_b2c for insert to service_role
  with check (true);
