create table public.image_variants (
  id uuid primary key default gen_random_uuid(),
  image_id uuid not null references public.product_images(id) on delete cascade,
  width integer not null,
  height integer,
  format text not null,
  storage_path text not null unique,
  file_size_bytes bigint not null default 0,
  created_at timestamptz not null default now(),
  constraint image_variants_width_positive check (width > 0),
  constraint image_variants_height_positive check (height is null or height > 0),
  constraint image_variants_file_size_non_negative check (file_size_bytes >= 0),
  constraint image_variants_format_valid check (format in ('webp', 'avif', 'jpg', 'jpeg', 'png', 'svg')),
  constraint image_variants_storage_path_not_empty check (length(trim(storage_path)) > 0),
  constraint image_variants_unique_size_format unique (image_id, width, format)
);

create index image_variants_image_id_idx on public.image_variants(image_id);
create index image_variants_format_width_idx on public.image_variants(format, width);

alter table public.image_variants enable row level security;

create policy "Public can read active product image variants"
on public.image_variants
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.product_images
    join public.products on products.id = product_images.product_id
    join public.categories on categories.id = products.category_id
    where product_images.id = image_variants.image_id
      and products.is_active = true
      and categories.is_active = true
  )
);

create policy "Admins can manage image variants"
on public.image_variants
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

grant select on public.image_variants to anon, authenticated;
grant select, insert, update, delete on public.image_variants to authenticated;
