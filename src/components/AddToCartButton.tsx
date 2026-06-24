"use client"
import s from "../styles/ProductCard.module.scss"
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/CartStore";
import type { Product } from "@/types/Card";


export default function  AddToCartButton ({ product }: { product: Product }){
const addItem = useCartStore((state)=>state.addItem)

    return(
        <button className={s.addBtn} onClick={() => addItem(product)}>
    <ShoppingCart size={16} />
    Add
  </button>
    )
}