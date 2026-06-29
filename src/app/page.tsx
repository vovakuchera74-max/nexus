import type { Product } from "@/types/Card";
import { supabase } from "@/lib/supabase";
import s from "../styles/main.module.scss"
import ProductCard from "@/components/ProductCard";
import { Inter } from "next/font/google";
import SortDropdown from "@/components/SortDropdown";
import ViewToggle from "@/components/ViewToggle";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default async function Home({searchParams}:{searchParams: Promise<{ sort?: string ; view: string ; search : string}>}) {
  const { sort: sortParam , view , search} = await searchParams;
  const sort = sortParam || 'featured';
  let query = supabase
  .from('products')
  .select('*, categories(name)');


  if (sort === 'price_asc') {
  query = query.order("price",{ ascending: true } )
} else if (sort === 'price_desc') {
  query = query.order("price",{ ascending: false } )
}
else if(sort === 'newest'){
query = query.order("created_at",{ ascending: false } )
}
else if(sort === 'rating'){
query = query.order("rating",{ ascending: false } )
}
if (search) {
  query = query.ilike('name', `%${search}%`);
}
  const { data: products } = await query.returns<Product[]>();
  if (!products) return

  return (

    <main className={s.main}>

      <div className={s.storis}></div>

      <div className={s.content}>

        <div className={s.filterBlock}></div>

        <div className={s.ProductBlock}>

          <div className={`${s.minifilter} ${inter.className}`}>
            <div className={s.many}>{products.length}   <span>products</span></div>
            <div className={s.Blockfil}>
              <SortDropdown></SortDropdown>
              <ViewToggle></ViewToggle>
            </div>
          </div>

         <div className={view === "list" ? s.listGrid : s.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} view={view} />
            ))}
          </div>
        </div>

      </div>

    </main>

  );
}