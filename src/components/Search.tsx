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
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedValue) {
      params.set('search', debouncedValue)
    } else {
      params.delete('search')
    }
    router.push(`?${params.toString()}`)
  }, [debouncedValue])

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
      <div className={s.searchMini} onClick={() => setIsSearchOpen(true)}>
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
      </div>
      {IsSearchOpen && (
        <div className={s.Full}>
          <div
            className={s.OverlayForSearch}
            onClick={() => setIsSearchOpen(false)}
          ></div>
          <div className={s.SearchFullHeader}>
            <div className={s.inputWrapper}>
              <div
                className={s.ArrowIcon}
                onClick={() => setIsSearchOpen(false)}
              >
                <ArrowLeft size={22} />
              </div>
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
