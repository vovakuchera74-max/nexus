"use client"
import s from "../styles/Profile.module.scss"
import { useState } from "react"
import { ShoppingCart, ChevronDown, X , Heart } from 'lucide-react';
import CardCart from "./CartCard";
import { useCartStore } from "@/store/CartStore";
import { Inter } from "next/font/google";
import { useWishListStore } from "@/store/wishlistStore";
import WishCard from "./WishCard";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});
export default function HeaderActions (){
const [isCartOpen, setIsCartOpen] = useState(false);
const [isWishOpen, setIsWishOpen] = useState(false);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const items = useCartStore((state)=>state.items)
const wish = useWishListStore((state)=>state.Wish)
const getTotalPrice = useCartStore((state)=>state.getTotalPrice)
const getTotalCount = useCartStore((state)=>state.getTotalCount)
    return(
         <>
         <div className={s.link}>
                <button className={s.CartBlock} onClick={()=>setIsWishOpen(true)}><Heart size={19}></Heart> 
                <div className={s.textWrapper}>
                   <span className={s.Cart}>WishList</span>
                      {wish.length > 0 && <span className={`${s.badgge} ${inter.className}`}>{wish.length}</span>}
                 </div></button>
                 <button className={s.CartBlock} onClick={()=>setIsCartOpen(true)}><ShoppingCart size={20}></ShoppingCart>
                 <div className={s.textWrapper}>
    <span className={s.Cart}>Cart</span>
    {getTotalCount() > 0 && <span className={`${s.badgge} ${inter.className}`}>{getTotalCount()}</span>}
  </div>
                 
                 </button>
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
                {items.length === 0 ? (
  <div className={s.emptyState}>
    <ShoppingCart className={s.emptyimg} size={48} strokeWidth={1} />
    <div className={s.emptyTitle}>Your cart is empty</div>
    <div className={s.emptyText}>Add some gear to get started</div>
  </div>
) : (
  <>
    <div className={s.main}>
      {items.map((item) => (
        <CardCart key={item.id} item={item} />
      ))}
    </div>
    <div className={s.futter}>
      <div className={s.price}>
        <div className={s.word}>Subtotal</div>
        <div className={`${s.totalPrice} ${inter.className}`}>
          ${getTotalPrice().toFixed(2)}
        </div>
      </div>
      <button className={s.order}>
        Checkout - ${getTotalPrice().toFixed(2)}
      </button>
    </div>
  </>
)}

            </div>

          </div> 
          }

          {isWishOpen && 
          <div className={s.cartWrapper}>
            <div className={s.Overlay} onClick={()=>setIsWishOpen(false)}></div>
            <div className={s.CardPanel}>
                <div className={s.top}>
                    <div className={s.block}>
                         <Heart className={s.img} size={24}></Heart>
                        <span className={s.CartTop}>WishList ({wish.length})</span>
                    </div>
                    <button className={s.Xbtn} onClick={()=>setIsWishOpen(false)}><X size={20}></X></button>
                </div>
                {wish.length === 0 ? (
  <div className={s.emptyState}>
    <Heart className={s.emptyimg} size={48} strokeWidth={1} />
    <div className={s.emptyTitle}>Your wishlist is empty</div>
    <div className={s.emptyText}>Save items you love to find them later</div>
  </div>
) : (
  <>
    <div className={s.main}>
      {wish.map((wish) => (
        <WishCard wish={wish} key={wish.id}/>
      ))}
    </div>
  </>
)}

            </div>

          </div> 
          }

        </>
          
    )
}