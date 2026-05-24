-- Migration 009 — Réservations brunch (Story 6.2)

create table if not exists brunch_reservations (
  id                  uuid primary key default gen_random_uuid(),
  formule_id          text not null,
  formule_nom         text not null,
  personnes           integer not null,
  total               numeric(8,2) not null,
  date_brunch         date not null,
  prenom              text not null,
  nom                 text not null,
  email               text not null,
  telephone           text not null,
  adresse_ligne1      text not null,
  adresse_code_postal text not null,
  adresse_ville       text not null,
  statut              text not null default 'confirmee'
                      check (statut in ('confirmee', 'annulee')),
  stripe_session_id   text unique,
  created_at          timestamptz not null default now()
);

alter table brunch_reservations enable row level security;

-- Accès public en insert via service_role (webhook Stripe)
create policy "service_insert_brunch"
  on brunch_reservations for insert to service_role
  with check (true);

create policy "service_update_brunch"
  on brunch_reservations for update to service_role
  using (true);

-- Admin
create policy "admin_all_brunch"
  on brunch_reservations for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
