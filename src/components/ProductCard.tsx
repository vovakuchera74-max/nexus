import { Product } from "@/types/Card";
import s from "../styles/ProductCard.module.scss"
import { Inter } from 'next/font/google';
import { ShoppingCart } from "lucide-react";
import Stars from "./Stars";
import NewOrSale from "./NewOrSale";
import AddToCartButton from "./AddToCartButton";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={s.ProductCard}>
      <div className={s.imgBlock}>
        <div className={`${s.badgeBlock} ${inter.className}`}>
          <NewOrSale isNew={product.is_new} isSele={product.discount_percent}></NewOrSale>

        </div>
        <img src={product.image_url} alt={product.name} />
      </div>
<div className={`${s.category} ${inter.className}`}>
  <span className={s.brand}>{product.brand}</span>
  <span className={s.categoryName}>{product.categories?.name}</span>
</div>
      <div className={s.ItemName}>{product.name}</div>

      <div className={`${s.raitingBlock} ${inter.className}`}>
        <div className={s.stars}>
          <Stars rating={product.rating}></Stars>
        </div>
        <div className={s.rating}>
           {product.rating} ({product.reviews_count.toLocaleString()})
        </div>

      </div>

     <div className={`${s.buyBlock} ${inter.className}`}>
  <div className={s.priceBlock}>
    <span className={s.price}>${product.price}</span>
    {product.old_price && (
      <span className={s.oldPrice}>${product.old_price}</span>
    )}
  </div>
  <div className={s.btnBlock}>
    <AddToCartButton product={product}></AddToCartButton>
  </div>
</div>
    </div>
  );
}