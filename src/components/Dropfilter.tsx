'use client'
import { SlidersHorizontal } from 'lucide-react'
import s from '../styles/Btnfilter.module.scss'
import Sidebar from './Sidebar'
import { useFilterPanelStore } from '@/store/FilterPanelStore'

interface Category {
  id: string
  name: string
  slug: string
}

export default function Dropfilter({
  product,
  categories,
  brands,
}: {
  product: number
  categories: Category[]
  brands: string[]
}) {
  const { isOpen, close, open } = useFilterPanelStore()

  return (
    <>
      <button onClick={() => open()} className={s.btnFilter}>
        <SlidersHorizontal size={13} />
      </button>
      {isOpen && (
        <div className={s.FilterWraper}>
          <button className={s.Overlay} onClick={() => close()}></button>
          <Sidebar
            size={true}
            product={product}
            categories={categories}
            brands={brands}
          />
        </div>
      )}
    </>
  )
}