import Link from 'next/link' 
import s from "../styles/Pagination.module.scss"
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  searchParams
}: {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => {
    const params = new URLSearchParams()

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value)
      }
    })
    
    if (page > 1) {
      params.set('page', String(page))
    } else {
      params.delete('page')
    }
    return `?${params.toString()}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={s.PaginationBar}>
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} className={s.PaginationBack}>
          <ChevronLeft size={22} />
        </Link>
      ) : (
        <button className={s.PaginationBack} disabled>
          <ChevronLeft size={22} />
        </button>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={p === currentPage ? s.PaginationNumberActive : s.PaginationNumber}
        >
          {p}
        </Link>
      ))}
      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} className={s.PaginationNext}>
          <ChevronRight size={22} />
        </Link>
      ) : (
        <button className={s.PaginationNext} disabled>
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  )
}