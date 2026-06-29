"use client"
import s from "../styles/ViewToggle.module.scss"
import { useRouter, useSearchParams } from "next/navigation"
import { List } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
export default function ViewToggle (){
  const router = useRouter();
  const searchParams = useSearchParams();
  function View(value: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.set('view', value);
  router.push(`?${params.toString()}`);
}
const currentView = searchParams.get('view') || 'grid';


return(
    <div className={s.ViewToggleBlock}>
        <button onClick={()=>View("grid")}  className={`${s.GridView} ${currentView === 'grid' ? s.active : ''}`}><LayoutGrid size={18}/></button>
        <button onClick={()=>View("list")} className={`${s.FlexView} ${currentView === 'list' ? s.active : ''}`}><List size={18}/></button>
    </div>
)
}