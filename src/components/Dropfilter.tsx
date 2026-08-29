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
      <div onClick={() => open()} className={s.btnFilter}>
        <SlidersHorizontal size={13} />
      </div>
      {isOpen && (
        <div className={s.FilterWraper}>
          <div className={s.Overlay} onClick={() => close()}></div>
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