import s from '../styles/CartCard.module.scss'
import { Trash2 } from 'lucide-react'
import type { Product } from '@/types/Card'
import { Inter } from 'next/font/google'
import Image from 'next/image'
interface CartItem extends Product {
  quantity: number
}

import { useCartStore } from '@/store/CartStore'
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})
export default function CardCart({ item }: { item: CartItem }) {
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className={`${s.Card} ${inter.className}`}>
<div className={s.Cartimg}>
  <Image
    src={item.image_url}
    alt={item.name}
    fill
    sizes="70px"
    style={{ objectFit: 'cover' }}
  />
</div>
      <div className={s.InfoBlock}>
        <div className={s.Brend}>{item.brand}</div>
        <div className={s.title}>{item.name}</div>
        <div className={s.info}>
          <div className={s.QtyCost}>
            <span className={s.qty}>Qty: {item.quantity} ×</span>
            <span className={s.cost}>${item.price}</span>
          </div>
          <button className={s.basket} onClick={() => removeItem(item.id)}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}
