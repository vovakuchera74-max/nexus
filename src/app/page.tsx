import type { Product } from '@/types/Card'
import { createServerSupabase } from '@/lib/supabase-server'
import s from '../styles/Main.module.scss'
import ProductCard from '@/components/ProductCard'
import { Inter } from 'next/font/google'
import SortDropdown from '@/components/SortDropdown'
import Sidebar from '@/components/Sidebar'
import Dropfilter from '@/components/Dropfilter'
import Header from '@/components/Header'
import Link from 'next/link'
import { SearchX } from 'lucide-react';
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string
    view?: string
    search?: string
    category?: string
    brand?: string
    maxPrice?: string
    inStock?: string
  }>
}) {
  const {
    sort: sortParam,
    view,
    search,
    category,
    brand,
    maxPrice,
    inStock,
  } = await searchParams
   const supabase = await createServerSupabase()
  const sort = sortParam || 'featured'
  let query = supabase.from('products').select('*, categories(name)')
  if (category) {
    const slugs = category.split(',')
    const { data: cats } = await supabase
      .from('categories')
      .select('id')
      .in('slug', slugs)

    if (cats) {
      query = query.in(
        'category_id',
        cats.map((c) => c.id)
      )
    }
  }

  if (sort === 'price_asc') {
    query = query.order('price', { ascending: true })
  } else if (sort === 'price_desc') {
    query = query.order('price', { ascending: false })
  } else if (sort === 'newest') {
    query = query.order('created_at', { ascending: false })
  } else if (sort === 'rating') {
    query = query.order('rating', { ascending: false })
  }
  if (search) {
    query = query.ilike('name', `%${search}%`)
  }
  if (maxPrice) {
    query = query.lte('price', Number(maxPrice))
  }
  if (inStock === 'true') {
    query = query.gt('stock', 0)
  }
  if (brand) {
    query = query.in('brand', brand.split(','))
  }
const { data: products, error } = await query.returns<Product[]>()

if (error) {
  throw new Error(error.message)
}

if (!products || products.length === 0) {
  return (
     <>
      <Header></Header>

      <main className={s.main}>
        <div className={s.content}>
          <Sidebar product={products.length} size={false} />

          <div className={s.ProductBlock}>
            <div className={`${s.minifilter} ${inter.className}`}>
              <div className={s.many}>
                {products.length} <span>products</span>
              </div>
              <div className={s.Blockfil}>
                <SortDropdown></SortDropdown>
                <Dropfilter product={products.length}></Dropfilter>
              </div>
            </div>


  <div className={s.emptyState}>
    <SearchX size={48} className={s.im}/>
    <div className={s.Emp}>No products found</div>
    <div className={`${s.Try} ${inter.className}`}>Try adjusting your filters or search</div>
    <Link className={`${s.Clearr} ${inter.className}`} href="/">Clear filters</Link>
  </div>

          </div>
        </div>
      </main>
    </>
  )
}

  return (
    <>
      <Header></Header>

      <main className={s.main}>
        <div className={s.content}>
          <Sidebar product={products.length} size={false} />

          <div className={s.ProductBlock}>
            <div className={`${s.minifilter} ${inter.className}`}>
              <div className={s.many}>
                {products.length} <span>products</span>
              </div>
              <div className={s.Blockfil}>
                <SortDropdown></SortDropdown>
                <Dropfilter product={products.length}></Dropfilter>
              </div>
            </div>

            <div className={s.productsGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} view={view} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
