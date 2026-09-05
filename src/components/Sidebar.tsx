'use client'
import s from '../styles/Sidebar.module.scss'
import { SlidersHorizontal, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFilterPanelStore } from '@/store/FilterPanelStore'


interface Category {
  id: string
  name: string
  slug: string
}
export default function Sidebar({
  size,
  product,
  categories,
  brands,
}: {
  size: boolean
  product: number
  categories: Category[]
  brands: string[]
}) {
  const { close } = useFilterPanelStore()
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCategories =
    searchParams.get('category')?.split(',').filter(Boolean) || []
  const selectedBrands =
    searchParams.get('brand')?.split(',').filter(Boolean) || []
  const maxPrice = Number(searchParams.get('maxPrice')) || 4000
  const inStock = searchParams.get('inStock') === 'true'
  const [IsPrice, setIsPrice] = useState<number>(maxPrice)
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    searchParams.get('maxPrice') ||
    inStock
  useEffect(() => {
    setIsPrice(Number(searchParams.get('maxPrice')) || 4000)
  }, [searchParams])

  const toggleCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategories.includes(slug)) {
      const newCategories = selectedCategories.filter((c) => c !== slug)
      params.set('category', newCategories.join(','))
    } else {
      const newCategories = [...selectedCategories, slug]
      params.set('category', newCategories.join(','))
    }
    router.push(`?${params.toString()}`)
  }

  const toggleBrand = (slugg: string) => {
    const paramsBrand = new URLSearchParams(searchParams.toString())

    if (selectedBrands.includes(slugg)) {
      const newBrands = selectedBrands.filter((c) => c !== slugg)
      paramsBrand.set('brand', newBrands.join(','))
    } else {
      const newBrands = [...selectedBrands, slugg]
      paramsBrand.set('brand', newBrands.join(','))
    }
    router.push(`?${paramsBrand.toString()}`)
  }
  const handleMaxPriceChange = (maxPrice: number) => {
    const params = new URLSearchParams(searchParams.toString())
    const ABSOLUTE_MAX_PRICE = 4000
    if (maxPrice < ABSOLUTE_MAX_PRICE) {
      params.set('maxPrice', String(maxPrice))
    } else {
      params.delete('maxPrice')
    }

    router.push(`?${params.toString()}`)
  }
  const toggleInStock = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.has('inStock')) {
      params.delete('inStock')
    } else {
      params.set('inStock', 'true')
    }

    // Оновлюємо URL без скролу наверх
    router.push(`?${params.toString()}`)
  }
  const resetFilters = () => {
    const params = new URLSearchParams()
    if (searchParams.get('sort')) params.set('sort', searchParams.get('sort')!)
    if (searchParams.get('view')) params.set('view', searchParams.get('view')!)
    if (searchParams.get('search'))
      params.set('search', searchParams.get('search')!)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className={size ? s.filtersblock : s.filters}>
      {size && (
        <div className={s.topFilter}>
          <div className={s.Howmanyreslts}>
            {product} <span>results</span>
          </div>
          <button className={s.btnFilterclose} onClick={() => close()}>
            <X size={14} />
          </button>
        </div>
      )}
      <div className={s.logoblockk}>
        <div className={s.logoFilter}>
          <SlidersHorizontal size={18}></SlidersHorizontal>
          <div className={s.filterword}>FILTERS</div>
        </div>
        {hasFilters && (
          <button
            className={s.resetALL}
            onClick={() => resetFilters()}
          >
            Reset all
          </button>
        )}
      </div>
      <div className={s.CategoryFilter}>
        <div className={s.Cat}>Category</div>
        <div className={s.OptionsCat}>
          {categories.map((cat) => (
  <label key={cat.id} className={s.checkboxLabel}>
    <input
      type="checkbox"
      className={s.checkboxInput}
      onChange={() => toggleCategory(cat.slug)}
      checked={selectedCategories.includes(cat.slug)}
    />
    <span className={s.checkboxCustom}></span>
    <span className={s.checkboxText}>{cat.name}</span>
  </label>
))}
        </div>
      </div>

      <div className={s.borde}></div>

      <div className={s.BrandFilter}>
        <div className={s.Cat}>Brand</div>
        <div className={s.OptionsCat}>
          {brands.map((brand) => (
            <label key={brand} className={s.checkboxLabel}>
              <input
                type="checkbox"
                className={s.checkboxInput}
                onChange={() => toggleBrand(brand)}
                checked={selectedBrands.includes(brand)}
              />
              <span className={s.checkboxCustom}></span>
              <span className={s.checkboxText}>{brand}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={s.borde}></div>

      <div className={s.PriceFilter}>
        <div className={s.curentPrice}>
          <div className={s.MaxPrice}>Max Price</div>
          <div className={s.curentP}> ${IsPrice.toLocaleString()}</div>
        </div>
        <input
          type="range"
          min={50}
          max={4000}
          value={IsPrice}
          onChange={(e) => setIsPrice(Number(e.target.value))}
          onMouseUp={() => handleMaxPriceChange(IsPrice)}
          onTouchEnd={() => handleMaxPriceChange(IsPrice)}
          className={s.Bar}
        />
        <div className={s.PriceOptions}>
          <div className={s.minmaxvalue}>$50</div>
          <div className={s.minmaxvalue}>$4 000</div>
        </div>
      </div>

      <div className={s.borde}></div>

      <label className={s.toggleLabel}>
        <input
          type="checkbox"
          className={s.toggleInput}
          checked={inStock}
          onChange={toggleInStock}
        />
        <span className={s.toggleSwitch}></span>
        <span className={s.toggleText}>
          In stock only
        </span>
      </label>
    </div>
  )
}
