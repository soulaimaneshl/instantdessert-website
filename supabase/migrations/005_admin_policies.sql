-- Migration 005 — Politiques admin (back-office portail)
-- L'admin utilise le service_role key côté serveur → accès total sans RLS.
-- Ces policies protègent contre les accès directs non autorisés.

-- ── Rôle admin custom ────────────────────────────────────────────────────────
-- Ajouter is_admin dans les métadonnées via le dashboard Supabase :
-- UPDATE auth.users SET raw_app_meta_data = '{"is_admin": true}' WHERE email = 'admin@instantdessert.fr';

create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean,
    false
  );
$$;

-- ── Products : admin peut tout faire ────────────────────────────────────────
create policy "admin_all_products"
  on products for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Restaurants : admin peut tout voir et modifier ───────────────────────────
create policy "admin_all_restaurants"
  on restaurants for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Commandes B2C : admin peut tout voir et modifier ────────────────────────
create policy "admin_all_orders_b2c"
  on orders_b2c for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin_all_items_b2c"
  on order_items_b2c for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Commandes B2B : admin peut tout voir et modifier ────────────────────────
create policy "admin_all_orders_b2b"
  on orders_b2b for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin_all_items_b2b"
  on order_items_b2b for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Profils : admin peut voir tous les profils ───────────────────────────────
create policy "admin_read_profiles"
  on profiles for select to authenticated
  using (public.is_admin());

-- ── Vue admin : commandes récentes toutes sources ────────────────────────────
create or replace view admin_orders_recent as
  select
    'B2C'                   as type,
    o.id::text              as id,
    p.prenom || ' ' || o.adresse_nom as client,
    p.email,
    o.statut,
    o.total,
    o.created_at
  from orders_b2c o
  join profiles p on p.id = o.user_id
  union all
  select
    'B2B'                   as type,
    o.id::text              as id,
    r.nom                   as client,
    u.email,
    o.statut,
    null::numeric           as total,
    o.created_at
  from orders_b2b o
  join restaurants r on r.id = o.restaurant_id
  join auth.users u on u.id = r.user_id
  order by created_at desc
  limit 50;
