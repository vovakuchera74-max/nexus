"use client"
import s from "../styles/Fav.module.scss"
import { Heart } from 'lucide-react';
import type { Product } from "@/types/Card";
import { useWishListStore } from "../store/wishlistStore"
export default function Fav ({ product }: { product: Product }){
 const toggleWish = useWishListStore(state => state.toggleWish);
  const isFav = useWishListStore(state => 
  state.Wish.some(w => w.id === product.id)
);

    return(
        <button className={ isFav ? s.heartactiv : s.heart} onClick={() => toggleWish(product)}>
            <Heart 
            size={14}
            fill={isFav ? '#A855F7' : 'none'}
        color={isFav ? '#A855F7' : "rgb(107, 104, 144)"}
            
            ></Heart>

        </button>
    )
}