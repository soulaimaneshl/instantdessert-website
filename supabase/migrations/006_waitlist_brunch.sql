-- Migration 006 — Liste d'attente brunch (Story 3.7)

create table if not exists waitlist_brunch (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  prenom     text,
  created_at timestamptz not null default now(),
  constraint waitlist_brunch_email_unique unique (email)
);

alter table waitlist_brunch enable row level security;

-- Accès public en lecture seule par l'utilisateur anonyme (inscription)
create policy "public_insert_waitlist"
  on waitlist_brunch for insert to anon, authenticated
  with check (true);

-- Seul l'admin peut lire la liste
create policy "admin_read_waitlist"
  on waitlist_brunch for select to authenticated
  using (public.is_admin());
