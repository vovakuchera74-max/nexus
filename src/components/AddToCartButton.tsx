"use client"
import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/store/CartStore';
import type { Product } from '@/types/Card';
import s from '../styles/ProductCard.module.scss';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      className={`${s.addBtn} ${added ? s.addedBtn : ''}`}
      onClick={handleAdd}
      disabled={added}
    >
      {added ? (
        <><Check size={16} /> Added!</>
      ) : (
        <><ShoppingCart size={16} /> Add</>
      )}
    </button>
  );
}