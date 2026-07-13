"use client"
import { SlidersHorizontal ,X} from 'lucide-react';
import s from "../styles/btnfilter.module.scss"
import Sidebar from "./Sidebar";
import { useFilterPanelStore } from "@/store/FilterPanelStore";
export default function Dropfilter ({product}:{product:number}){
const { isOpen, close ,open } = useFilterPanelStore();


    return(
        <>
        <div onClick={()=>open()} className={s.btnFilter}>
            <SlidersHorizontal size={13}/>
        </div>
                  {isOpen && 
          <div className={s.FilterWraper}>
            <div className={s.Overlay} onClick={()=>close()}></div>
            <Sidebar size={true} product={product} ></Sidebar>
            

          </div> 
          }
        </>
    )
}