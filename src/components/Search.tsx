"use client"

import s from "../styles/Search.module.scss";
import { Search } from 'lucide-react';
import { useState, ChangeEvent } from "react";

export function SearchInput() {
  const [searchValue, setSearchValue] = useState('');

  // Типізуємо івент для звичайного текстового інпуту
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={s.search}>
      <span className={s.iconWrapper}>
        <Search size={20} />
      </span>
      <input 
        type="text" 
        placeholder="Search pc, consoles, gear…" 
        value={searchValue} 
        onChange={handleSearchChange} 
      />
    </div>
  );
}