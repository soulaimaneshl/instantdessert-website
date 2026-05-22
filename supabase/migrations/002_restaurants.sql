-- Migration 002 — Table restaurants (partenaires B2B)

create table if not exists restaurants (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users(id) on delete cascade,
  nom                 text not null,
  adresse             text not null,
  telephone           text not null,
  statut_validation   text not null default 'en_attente'
                      check (statut_validation in ('en_attente', 'valide', 'refuse')),
  created_at          timestamptz not null default now()
);

alter table restaurants enable row level security;

-- Un partenaire ne voit que sa propre fiche
create policy "owner_read_restaurant"
  on restaurants for select
  to authenticated
  using (user_id = auth.uid());

create policy "owner_update_restaurant"
  on restaurants for update
  to authenticated
  using (user_id = auth.uid());

-- Insertion autorisée depuis le server action (service role)
create policy "service_insert_restaurant"
  on restaurants for insert
  to service_role
  with check (true);
