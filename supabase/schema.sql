create table public.categories (
  id uuid not null default gen_random_uuid (),
  name text not null,
  slug text not null,
  created_at timestamp with time zone null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_slug_key unique (slug)
);

create table public.products (
  id uuid not null default gen_random_uuid (),
  name text not null,
  slug text not null,
  description text null,
  price numeric(10, 2) not null,
  old_price numeric(10, 2) null,
  brand text not null,
  category_id uuid null,
  image_url text not null,
  rating numeric(2, 1) null default 0,
  reviews_count integer null default 0,
  stock integer null default 0,
  is_new boolean null default false,
  discount_percent integer null,
  created_at timestamp with time zone null default now(),
  constraint products_pkey primary key (id),
  constraint products_slug_key unique (slug),
  constraint products_category_id_fkey foreign key (category_id) references categories (id)
);

alter table public.categories enable row level security;
alter table public.products enable row level security;

create policy "Public can view categories"
  on public.categories for select
  to public
  using (true);

create policy "Public can view products"
  on public.products for select
  to public
  using (true);

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  product_id uuid references public.products(id) not null,
  quantity int not null default 1,
  created_at timestamp with time zone default now(),
  unique (user_id, product_id)
);

create table public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  product_id uuid references public.products(id) not null,
  created_at timestamp with time zone default now(),
  unique (user_id, product_id)
);

alter table public.cart_items enable row level security;
alter table public.wishlist_items enable row level security;

create policy "Users manage their own cart items"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage their own wishlist items"
  on public.wishlist_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);