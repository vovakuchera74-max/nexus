import type { Product } from '@/types/Card'
import { createServerSupabase } from '@/lib/supabase-server'
import s from '../styles/Main.module.scss'
import ProductCard from '@/components/ProductCard'
import SortDropdown from '@/components/SortDropdown'
import Sidebar from '@/components/Sidebar'
import Dropfilter from '@/components/Dropfilter'
import Header from '@/components/Header'
import Link from 'next/link'
import { SearchX } from 'lucide-react';
import Pagination from "../components/Pagination"

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
    page?: string
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
    page
  } = await searchParams
   const supabase = await createServerSupabase()
  const sort = sortParam || 'featured'
  let query = supabase.from('products').select('*, categories(name)', { count: 'exact' })
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
  const PAGE_SIZE = 4
const pageParam = Number(page) || 1
const from = (pageParam - 1) * PAGE_SIZE
const to = from + PAGE_SIZE - 1

  query = query.range(from, to)

const { data: products, count, error } = await query.returns<Product[]>()
const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1
if (error) {
  throw new Error(error.message)
}
const [{ data: categoriesData }, { data: brandRows }] = await Promise.all([
  supabase.from('categories').select('id, name, slug').order('name'),
  supabase.from('products').select('brand'),
])

const categories = categoriesData ?? []
const brands = Array.from(new Set((brandRows ?? []).map((p) => p.brand))).sort()

if (!products || products.length === 0) {
  return (
     <>
      <Header></Header>

      <main className={s.main}>
        <div className={s.content}>
          <Sidebar categories={categories} brands={brands} product={products.length} size={false} />

          <div className={s.ProductBlock}>
            <div className={s.minifilter}>
              <div className={s.many}>
                {products.length} <span>products</span>
              </div>
              <div className={s.Blockfil}>
                <SortDropdown></SortDropdown>
                <Dropfilter categories={categories} brands={brands} product={products.length}></Dropfilter>
              </div>
            </div>


  <div className={s.emptyState}>
    <SearchX size={48} className={s.im}/>
    <div className={s.Emp}>No products found</div>
    <div className={s.Try}>Try adjusting your filters or search</div>
    <Link className={s.Clearr} href="/">Clear filters</Link>
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
          <Sidebar categories={categories} brands={brands} product={products.length} size={false} />

          <div className={s.ProductBlock}>
            <div className={s.minifilter}>
              <div className={s.many}>
                {products.length} <span>products</span>
              </div>
              <div className={s.Blockfil}>
                <SortDropdown></SortDropdown>
                <Dropfilter categories={categories} brands={brands} product={products.length}></Dropfilter>
              </div>
            </div>

            <div className={s.productsGrid}>
              {products.map((product , index) => (
                <ProductCard key={product.id} product={product} view={view} priority={index < 6}/>
              ))}
            </div>
            <Pagination 
  currentPage={pageParam} 
  totalPages={totalPages} 
  searchParams={{sort,view,search,category,brand,maxPrice,inStock,page}} 
/>
          </div>
        </div>
      </main>
    </>
  )
}
