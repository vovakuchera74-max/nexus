'use client'
import s from '../styles/Fav.module.scss'
import { Heart } from 'lucide-react'
import type { Product } from '@/types/Card'
import { useWishListStore } from '../store/WishlistStore'
export default function Fav({ product,version }: { product: Product,version:boolean }) {
  const toggleWish = useWishListStore((state) => state.toggleWish)
  const isFav = useWishListStore((state) =>
    state.Wish.some((w) => w.id === product.id)
  )

  return (
    <button
      className={version ?isFav ? s.heartactiv : s.heart : isFav ? s.heartactivVersion : s.heartVersion}
      onClick={() => toggleWish(product)}
    >
      <Heart
        size={version ? 14 : 20}
        fill={isFav ? '#A855F7' : 'none'}
        color={isFav ? '#A855F7' : 'rgb(107, 104, 144)'}
      ></Heart>
    </button>
  )
}
