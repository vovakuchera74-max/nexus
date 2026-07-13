"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import s from "../styles/SortDropdown.module.scss"
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';


const options = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
];


export default function SortDropdown(){
    const [isOpenSort, setIsOpenSort] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'featured';
  const currentLabel = options.find(o => o.value === currentSort)?.label || 'Featured';
  function handleSelect(value: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.set('sort', value); // value а не currentLabel
  router.push(`?${params.toString()}`);
  setIsOpenSort(false);
}


    return(
         <div className={s.SortDropdown}>
      <div onClick={() => setIsOpenSort(!isOpenSort)} className={`${s.trigger} ${isOpenSort ? s.triggerOpen : ''}`}>
        <div className={s.Sorticon}><ArrowUpDown className={s.updown} size={13} /></div>
        <div className={s.SortValue}>{currentLabel}</div>
        <div className={s.arrowicon}>
          {isOpenSort ? <ChevronUp size={14} className={s.updown}/> : <ChevronDown size={14} className={s.updown}/>}
        </div>
      </div>

      {isOpenSort && (
        <div className={s.sortlible}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${s.option} ${currentSort === option.value ? s.active : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
    )
}