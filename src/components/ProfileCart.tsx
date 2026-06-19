"use client"
import s from "../styles/Profile.module.scss"
import { useState } from "react"
import { ShoppingCart, ChevronDown, X } from 'lucide-react';
import CardCart from "./CartCard";
export default function HeaderActions (){
const [isCartOpen, setIsCartOpen] = useState(false);
const [isProfileOpen, setIsProfileOpen] = useState(false);
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
                        <span className={s.CartTop}>Cart</span>
                    </div>
                    <button className={s.Xbtn} onClick={()=>setIsCartOpen(false)}><X size={20}></X></button>
                </div>
                <div className={s.main}>
                    <CardCart></CardCart>


                </div>
                <div className={s.futter}>
                    <div className={s.price}>
                        <div className={s.word}>Subtotal</div>
                        <div className={s.totalPrice}> $199.98</div>
                    </div>
                    <button className={s.order}>Checkout - </button>
                </div>
            </div>

          </div> 
          }

        </>
          
    )
}