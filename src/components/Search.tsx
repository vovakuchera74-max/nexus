"use client"
import s from "../styles/Search.module.scss";
import { Search } from 'lucide-react';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebonce } from "@/hooks/useDebounce";
export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const debouncedValue = useDebonce(searchValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set('search', debouncedValue);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  }, [debouncedValue]);

  return (
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
  );
}