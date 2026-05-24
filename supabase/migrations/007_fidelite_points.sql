-- Migration 007 — Programme de fidélité par points (Story 5.1)
-- Règle : 1€ dépensé = 1 point

create table if not exists fidelite_points (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  order_id   uuid unique references orders_b2c(id) on delete set null,
  points     integer not null check (points > 0),
  created_at timestamptz not null default now()
);

alter table fidelite_points enable row level security;

-- Le client voit uniquement ses propres points
create policy "owner_read_points"
  on fidelite_points for select to authenticated
  using (user_id = auth.uid());

-- Seul le service_role peut insérer (via webhook Stripe)
create policy "service_insert_points"
  on fidelite_points for insert to service_role
  with check (true);

-- Admin peut tout voir
create policy "admin_all_points"
  on fidelite_points for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Vue : solde total par utilisateur
create or replace view fidelite_solde as
  select user_id, coalesce(sum(points), 0)::integer as total_points
  from fidelite_points
  group by user_id;
