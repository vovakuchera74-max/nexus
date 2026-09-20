# 🎮 Nexus — Gaming Store

A full-featured gaming e-commerce store built with Next.js 16, Supabase, and TypeScript. Dark purple aesthetic, modern UI, and a complete shopping experience.

## 🔗 Demo

> [Live Demo](https://nexus-five-pied.vercel.app) · [GitHub](https://github.com/vovakuchera74-max/nexus)

---

## 📸 Screenshots

![Home](public/screenshots/home.png)
![Settings](public/screenshots/settings.png)
---

## ✨ Features

- 🛍️ **Product Catalog** — grid and list view, with filtering by category, brand, price range, and stock
- 🔍 **Search** — debounced real-time search across all products
- 🛒 **Cart** — add/remove items, subtotal — synced to your account when signed in, with local persistence for guests
- ❤️ **Wishlist** — save favorite items, with toggle and badge count — synced to your account when signed in, with local persistence for guests
- 🔐 **Authentication** — email/password sign up & sign in, GitHub OAuth
- 👤 **Profile** — update username, email, password, and avatar from a settings modal
- ♿ **Accessible modals** — Escape to close, focus trap, and focus return on all dialogs
- 🎨 **Dark UI** — custom dark purple palette with hover effects and animations
- 📱 Responsive — desktop-first layout with slide-in filter drawer on mobile
- ⚙️ **Skeleton & Error pages** — loading states and error boundaries
- 🧪 **Tested** — unit and component tests for stores, hooks, and form validation

---

## 🛠️ Tech Stack

| Category   | Technology                   |
| ---------- | ----------------------------- |
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
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

## 🗄️ Database Setup

This project uses Supabase (PostgreSQL). To set up your own instance:

### 1. Create the tables

Run `supabase/schema.sql` in your Supabase project's SQL Editor to create the tables and access policies.

### 2. (Optional) Seed sample data

Run `supabase/seed.sql` to populate the catalog with a few sample products.

### 3. User profiles

User profile data (username, avatar) is stored in Supabase Auth's `user_metadata` — there is no separate `profiles` table.

### 4. Storage (avatars)

Create a public bucket named `avatars` in Storage for profile pictures.

### 5. Cart & Wishlist sync

Cart and wishlist are stored locally (`localStorage`, via Zustand's `persist` middleware) for guests, and additionally synced to `cart_items`/`wishlist_items` tables in Supabase for signed-in users, with Row Level Security scoped to `auth.uid()`.

- On every cart/wishlist change while signed in, the current state is written to the database (`src/lib/syncGuestData.ts`).
- On sign up or sign in, any items already in the browser's local storage are merged with what's already saved to the account (quantities are summed for the cart; the wishlist is de-duplicated by product), so items added as a guest aren't lost.

This currently works for email/password sign up and sign in. GitHub OAuth sign-in does not yet trigger this merge, since its callback runs server-side and has no access to the browser's local storage — a client-side auth-state listener would be needed to extend it there.

### 6. GitHub OAuth setup

To enable "Sign in with GitHub":

1. Create a new OAuth App at [github.com/settings/developers](https://github.com/settings/developers)
2. Set the **Homepage URL** to your site's URL (e.g. `http://localhost:3000` for local dev, or your production domain)
3. Set the **Authorization callback URL** to your Supabase callback, shown in Supabase Dashboard → Authentication → Providers → GitHub (looks like `https://<project-ref>.supabase.co/auth/v1/callback`)
4. Copy the generated **Client ID** and **Client Secret** into Supabase Dashboard → Authentication → Providers → GitHub
5. In Supabase Dashboard → Authentication → URL Configuration, add `<your-site-url>/auth/callback` to the **Redirect URLs** allow list (for both local and production URLs, if you use both)

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
middleware.ts      # Refreshes the Supabase session on every request  
supabase/          # schema.sql and seed.sql for setting up the database
tests/             # Jest + React Testing Library tests
```

---

## 🧪 Tests

```bash
npm test
```
