"use client"
import s from "../styles/Profile.module.scss"
import { useState } from "react"
import { ShoppingCart, ChevronDown, X } from 'lucide-react';
import CardCart from "./CartCard";
import { useCartStore } from "@/store/CartStore";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});
export default function HeaderActions (){
const [isCartOpen, setIsCartOpen] = useState(false);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const items = useCartStore((state)=>state.items)
const getTotalPrice = useCartStore((state)=>state.getTotalPrice)
const getTotalCount = useCartStore((state)=>state.getTotalCount)
    return(
         <>
         <div className={s.link}>
                <button className={s.CartBlock} onClick={()=>setIsCartOpen(true)}><ShoppingCart size={20}></ShoppingCart><span className={s.Cart}>Cart</span></button>
                <div className={s.Profile}></div>
          </div>
          {isCartOpen && 
          <div className={s.cartWrapper}>
            <div className={s.Overlay} onClick={()=>setIsCartOpen(false)}></div>
            <div className={s.CardPanel}>
                <div className={s.top}>
                    <div className={s.block}>
                         <ShoppingCart className={s.img} size={22}></ShoppingCart>
                        <span className={s.CartTop}>Cart ({getTotalCount()})</span>
                    </div>
                    <button className={s.Xbtn} onClick={()=>setIsCartOpen(false)}><X size={20}></X></button>
                </div>
                <div className={s.main}>
                    {items.map((item) => (
  <CardCart key={item.id} item={item}></CardCart>
))}


                </div>
                <div className={s.futter}>
                    <div className={s.price}>
                        <div className={s.word}>Subtotal</div>
                        <div className={`${s.totalPrice} ${inter.className}` }> ${getTotalPrice()}</div>
                    </div>
                    <button className={s.order}>Checkout - ${getTotalPrice()}</button>
                </div>
            </div>

          </div> 
          }

        </>
          
    )
}