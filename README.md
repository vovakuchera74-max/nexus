# 🎮 Nexus — Gaming Store

A full-featured gaming e-commerce store built with Next.js 16, Supabase, and TypeScript. Dark purple aesthetic, modern UI, and a complete shopping experience.

## 🔗 Demo

> [Live Demo](https://nexus.vercel.app) · [GitHub](https://github.com/vovakuchera74-max/nexus)

---

## 📸 Screenshots

![Home](public/screenshots/home.png)
![Catalog](public/screenshots/settings.png)
---

## ✨ Features

- 🛍️ **Product Catalog** — grid and list view, with filtering by category, brand, price range, and stock
- 🔍 **Search** — debounced real-time search across all products
- 🛒 **Cart** — add/remove items, quantity control, subtotal — persisted in Zustand
- ❤️ **Wishlist** — save favorite items, with toggle and badge count
- 🔐 **Authentication** — email/password sign up & sign in, GitHub OAuth
- 👤 **Profile** — update username, email, and password from a settings modal
- 🎨 **Dark UI** — custom dark purple palette with hover effects and animations
- 📱 Responsive — desktop-first layout with slide-in filter drawer on mobile
- ⚙️ **Skeleton & Error pages** — loading states and error boundaries

---

## 🛠️ Tech Stack

| Category   | Technology                   |
| ---------- | ---------------------------- |
| Framework  | Next.js 16 (App Router)      |
| Language   | TypeScript                   |
| Styling    | SCSS Modules                 |
| Database   | Supabase (PostgreSQL)        |
| Auth       | Supabase Auth + GitHub OAuth |
| State      | Zustand                      |
| Forms      | React Hook Form + Zod        |
| Icons      | Lucide React, React Icons    |
| Testing    | Jest + React Testing Library |
| Deployment | Vercel                       |

---
## 🚀 Getting Started

### Installation

```bash
# Clone the repo
git clone https://github.com/vovakuchera74-max/nexus.git
cd nexus

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
## 🗄️ Database Setup

This project uses Supabase (PostgreSQL). To set up your own instance:

### 1. Create the tables

Run this in the Supabase SQL Editor:

\`\`\`sql
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
\`\`\`

### 2. Enable RLS and policies

Both tables have Row Level Security enabled with public read-only access:

\`\`\`sql
alter table public.categories enable row level security;
alter table public.products enable row level security;

create policy "Public can view categories" on public.categories
  for select using (true);

create policy "Public can view products" on public.products
  for select using (true);
\`\`\`

### 3. User profiles

User profile data (username, avatar) is stored in Supabase Auth's `user_metadata` — there is no separate `profiles` table.

### 4. Storage (avatars)

Create a public bucket named `avatars` in Storage for profile pictures.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks (useDebounce)
├── lib/              # Supabase clients (browser, server)
├── store/            # Zustand stores (cart, wishlist)
├── styles/           # SCSS Modules
├── types/            # TypeScript interfaces
└── validations/      # Zod schemas
```

---

## 🧪 Tests

```bash
npm test
```
