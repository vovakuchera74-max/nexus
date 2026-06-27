import type { Product } from "@/types/Card";
import { supabase } from "@/lib/supabase";
import s from "../styles/main.module.scss"
import ProductCard from "@/components/ProductCard";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});
export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .returns<Product[]>();
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
              <div className={s.somefilter}></div>
              <div className={s.changsee}></div>
            </div>
          </div>

          <div className={s.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>

    </main>

  );
}