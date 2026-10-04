'use client'
import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/store/CartStore'
import type { Product } from '@/types/Card'
import s from '../styles/ProductCard.module.scss'

export default function AddToCartButton({ product,version }: { product: Product,version:boolean }) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      className={`${version ? s.addBtn : s.ADDbtn} ${added ? s.addedBtn : ''}`}
      onClick={handleAdd}
      disabled={added}
    >
      {added ? (
        <>
          <Check size={version ? 16 : 18} /> {version ? "Added!" : "Added to Cart!"} 
        </>
      ) : (
        <>
          <ShoppingCart size={version ? 16 : 18} />{version ? "Add" : "Add to Cart"} 
        </>
      )}
    </button>
  )
}
