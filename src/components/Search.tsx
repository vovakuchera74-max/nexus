'use client'
import s from '../styles/Search.module.scss'
import { Search, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
export function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  )
  const debouncedValue = useDebounce(searchValue, 500)
  const [IsSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
  const currentParams = searchParams.toString()
  const params = new URLSearchParams(currentParams)

  if (debouncedValue) {
    params.set('search', debouncedValue)
  } else {
    params.delete('search')
  }

  const nextParams = params.toString()
  if (nextParams === currentParams) return

  router.replace(`?${nextParams}`)
}, [debouncedValue, searchParams, router])

  return (
    <>
      <div className={s.search}>
        <span className={s.iconWrapper}>
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search pc, consoles, gear…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <button className={s.searchMini} onClick={() => setIsSearchOpen(true)}>
        <span className={s.iconWrapper}>
          <Search size={19} />
        </span>
        <input
          type="text"
          placeholder="I search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          readOnly
        />
      </button>
      {IsSearchOpen && (
        <div className={s.Full}>
          <button
            className={s.OverlayForSearch}
            onClick={() => setIsSearchOpen(false)}
          ></button>
          <div className={s.SearchFullHeader}>
            <div className={s.inputWrapper}>
              <button
                className={s.ArrowIcon}
                onClick={() => setIsSearchOpen(false)}
              >
                <ArrowLeft size={22} />
              </button>
              <input
                autoFocus
                type="text"
                placeholder="Search pc, consoles, gear…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
