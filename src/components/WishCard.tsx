import s from '../styles/CartCard.module.scss'
import { X, ShoppingCart } from 'lucide-react'
import type { Product } from '@/types/Card'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useCartStore } from '@/store/CartStore'
import { useWishListStore } from '@/store/WishlistStore'
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})
export default function WishCard({ wish }: { wish: Product }) {
  const removeWish = useWishListStore((state) => state.removeItem)
  const Add = useCartStore((state) => state.addItem)

  return (
    <div className={`${s.Card} ${inter.className}`}>
      <div className={s.Cartimg}>
  <Image
    src={wish.image_url}
    alt={wish.name}
    fill
    sizes="70px"
    style={{ objectFit: 'cover' }}
  />
</div>
      <div className={s.InfoBlock}>
        <div className={s.Brend}>{wish.brand}</div>
        <div className={s.title}>{wish.name}</div>
        <div className={s.info}>
          <div className={s.QtyCost}>
            <span className={s.cost}>${wish.price}</span>
          </div>
          <div className={s.btnpls}>
            <button className={s.Addbtn} onClick={() => Add(wish)}>
              <ShoppingCart size={12} /> <span>Add</span>
            </button>
            <button className={s.basket} onClick={() => removeWish(wish.id)}>
              <X size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
}
