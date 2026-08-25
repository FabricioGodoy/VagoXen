create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  description text not null default '',
  long_description text not null default '',
  price numeric(12, 2) not null,
  original_price numeric(12, 2),
  display_label text,
  audience_label text,
  whatsapp_message text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint products_price_positive check (price >= 0),
  constraint products_original_price_positive check (original_price is null or original_price >= 0)
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  role text not null,
  device text not null default 'all',
  storage_path text not null,
  alt text,
  sort_order integer not null default 0,
  width integer,
  height integer,
  format text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_images_role_valid check (role in ('card', 'gallery', 'size_guide')),
  constraint product_images_device_valid check (device in ('all', 'desktop', 'mobile')),
  constraint product_images_storage_path_not_empty check (length(trim(storage_path)) > 0),
  constraint product_images_dimensions_positive check (
    (width is null or width > 0) and (height is null or height > 0)
  ),
  constraint product_images_format_valid check (
    format is null or format in ('webp', 'avif', 'jpg', 'jpeg', 'png', 'svg')
  ),
  constraint product_images_order_unique unique (product_id, role, device, sort_order)
);

create unique index product_images_one_card_per_product_device
  on public.product_images(product_id, device)
  where role = 'card';

create unique index product_images_one_size_guide_per_product_device
  on public.product_images(product_id, device)
  where role = 'size_guide';

create index products_category_id_idx on public.products(category_id);
create index products_active_sort_idx on public.products(is_active, sort_order);
create index categories_active_sort_idx on public.categories(is_active, sort_order);
create index product_images_product_id_idx on public.product_images(product_id);
create index product_images_role_sort_idx on public.product_images(product_id, role, device, sort_order);

create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger product_images_set_updated_at
before update on public.product_images
for each row execute function public.set_updated_at();

create or replace function public.is_admin(user_uuid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = user_uuid
  );
$$;

revoke all on function public.is_admin(uuid) from public;
grant execute on function public.is_admin(uuid) to authenticated;

alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;

create policy "Users can read own admin membership"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin(auth.uid()));

create policy "Admins can insert admin users"
on public.admin_users
for insert
to authenticated
with check (public.is_admin(auth.uid()));

create policy "Admins can delete admin users"
on public.admin_users
for delete
to authenticated
using (public.is_admin(auth.uid()));

create policy "Public can read active categories"
on public.categories
for select
to anon, authenticated
using (is_active = true);

create policy "Admins can manage categories"
on public.categories
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read active products"
on public.products
for select
to anon, authenticated
using (
  is_active = true
  and exists (
    select 1
    from public.categories
    where categories.id = products.category_id
      and categories.is_active = true
  )
);

create policy "Admins can manage products"
on public.products
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "Public can read active product images"
on public.product_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products
    join public.categories on categories.id = products.category_id
    where products.id = product_images.product_id
      and products.is_active = true
      and categories.is_active = true
  )
);

create policy "Admins can manage product images"
on public.product_images
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products, public.product_images to anon, authenticated;
grant select, insert, update, delete on public.admin_users, public.categories, public.products, public.product_images to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'catalog',
  'catalog',
  true,
  10485760,
  array['image/avif', 'image/webp', 'image/jpeg', 'image/png', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can read catalog files"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'catalog');

create policy "Admins can upload catalog files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'catalog'
  and public.is_admin(auth.uid())
);

create policy "Admins can update catalog files"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'catalog'
  and public.is_admin(auth.uid())
)
with check (
  bucket_id = 'catalog'
  and public.is_admin(auth.uid())
);

create policy "Admins can delete catalog files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'catalog'
  and public.is_admin(auth.uid())
);
