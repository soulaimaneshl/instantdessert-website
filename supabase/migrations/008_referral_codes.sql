-- Migration 008 — Parrainage (Story 5.3)

create table if not exists referral_codes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid unique not null references auth.users(id) on delete cascade,
  code       text unique not null,
  uses_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table referral_codes enable row level security;

-- Le client voit et gère son propre code
create policy "owner_read_referral"
  on referral_codes for select to authenticated
  using (user_id = auth.uid());

create policy "owner_insert_referral"
  on referral_codes for insert to authenticated
  with check (user_id = auth.uid());

-- Service role pour la validation au checkout et l'incrément dans le webhook
create policy "service_all_referral"
  on referral_codes for all to service_role
  with check (true);

-- Admin
create policy "admin_all_referral"
  on referral_codes for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
