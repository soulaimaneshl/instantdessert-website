-- Migration 003 — Tables commandes B2B

create table if not exists orders_b2b (
  id            uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  statut        text not null default 'recue'
                check (statut in ('recue', 'en_preparation', 'livree', 'annulee')),
  created_at    timestamptz not null default now()
);

create table if not exists order_items_b2b (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references orders_b2b(id) on delete cascade,
  product_id uuid not null references products(id),
  quantite   integer not null check (quantite > 0)
);

alter table orders_b2b enable row level security;
alter table order_items_b2b enable row level security;

-- Un partenaire voit et crée uniquement ses propres commandes
create policy "owner_read_orders_b2b"
  on orders_b2b for select to authenticated
  using (restaurant_id in (
    select id from restaurants where user_id = auth.uid()
  ));

create policy "owner_insert_orders_b2b"
  on orders_b2b for insert to authenticated
  with check (restaurant_id in (
    select id from restaurants where user_id = auth.uid()
  ));

create policy "owner_read_items_b2b"
  on order_items_b2b for select to authenticated
  using (order_id in (
    select o.id from orders_b2b o
    join restaurants r on r.id = o.restaurant_id
    where r.user_id = auth.uid()
  ));

create policy "owner_insert_items_b2b"
  on order_items_b2b for insert to authenticated
  with check (order_id in (
    select o.id from orders_b2b o
    join restaurants r on r.id = o.restaurant_id
    where r.user_id = auth.uid()
  ));
