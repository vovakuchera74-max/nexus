"use client"
import s from "../styles/Profile.module.scss"
import { useState } from "react"
import { ShoppingCart, ChevronDown,ChevronUp, X ,Settings , Heart,LogOut  } from 'lucide-react';
import CardCart from "./CartCard";
import { useCartStore } from "@/store/CartStore";
import { Inter } from "next/font/google";
import { useWishListStore } from "@/store/wishlistStore";
import WishCard from "./WishCard";
import { UserRound } from 'lucide-react';
import Link from "next/link";
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react';
import { Mail} from "lucide-react"
import { IoLockClosedOutline } from "react-icons/io5";


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});
export default function HeaderActions({ user }: { user: User | null }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNickFocused, setIsNickFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();
const [isCartOpen, setIsCartOpen] = useState(false);
const [isWishOpen, setIsWishOpen] = useState(false);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const items = useCartStore((state)=>state.items)
const wish = useWishListStore((state)=>state.Wish)
const getTotalPrice = useCartStore((state)=>state.getTotalPrice)
const getTotalCount = useCartStore((state)=>state.getTotalCount)
const handleSignOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  router.refresh();
}
    return(
         <>
         <div className={s.link}>
                <button className={s.CartBlock} onClick={()=>setIsWishOpen(true)}><Heart size={19}></Heart> 
                <div className={s.textWrapper}>
                   <span className={s.Cart}>WishList</span>
                      {wish.length > 0 && <span className={`${s.badgge} ${inter.className}`}>{wish.length}</span>}
                 </div></button>
                 <button className={s.CartBlock2} onClick={()=>setIsCartOpen(true)}><ShoppingCart size={20}></ShoppingCart>
                 <div className={s.textWrapper}>
    <span className={s.Cart}>Cart</span>
    {getTotalCount() > 0 && <span className={`${s.badgge} ${inter.className}`}>{getTotalCount()}</span>}
  </div>
                 
                 </button>

                <div className={isProfileOpen ?s.ProfileActiv :s.Profile } onClick={()=>setIsProfileOpen(!isProfileOpen)}>
                  <div className={s.ProIcon}><UserRound size={20} /></div>
                  <div className={s.ProWords}>Profile</div>
                 <div className={s.arroww}>{isProfileOpen ? <ChevronUp size={14} className={s.updown2}/> : <ChevronDown size={14} className={s.updown2}/>}</div>

                 {isProfileOpen && 
                 (user ? 
                    <div className={ `${s.ProfileOptions} ${inter.className}`}>
                  <div className={s.ProfileTop}>
                    <div className={s.Photo}><img src="https://genshinbuild.com/images/Icons/Hu_Tao.png" alt="" /></div>
                    <div className={s.DataBlock}>
                      <div className={s.ProfileNick}>{user.user_metadata.username || user.user_metadata.user_name || user.email}</div>
                      <div className={s.ProfileEmail}>{user.email}</div>
                    </div>
                  </div>
                  <div className={s.Profilemain}>
                    <div className={s.ProOptions} onClick={()=>setIsWishOpen(true)}>
                      <div className={s.ProIcon}><Heart size={16}></Heart></div>
                      <div className={s.Proname}>WishList</div>
                    </div>
                    <div className={s.ProOptions} onClick={()=>setIsCartOpen(true)}>
                      <div className={s.ProIcon}><ShoppingCart size={16}></ShoppingCart></div>
                      <div className={s.Proname}  >Cart</div>
                    </div>
                    <div className={s.ProOptions} onClick={()=>setIsSettingsOpen(true)}>
                      <div className={s.ProIcon} ><Settings size={16}></Settings></div>
                      <div className={s.Proname}>Settings</div>
                    </div>
                  </div>
                  <div  onClick={handleSignOut} className={s.Profilbottom}>
                    <div className={s.SingOutIcon}><LogOut size={16}></LogOut> </div>
                    <Link href={"/"} className={s.SingOutWord}>Sing Out</Link>
                  </div>
                 </div>
                 :
                 <div className={ `${s.ProfileOptions} ${inter.className}`}>
                  <div className={s.ProfileTop}>
                    <div className={s.DataBlock}>
                      <div className={s.ProfilHellow}>Welcome!</div>
                      <div className={s.ProfileSomeText}>Log in to access your profile, wishlist.</div>
                    </div>
                  </div>
                  <div className={s.Profilemain}>
                    <div className={s.ProOptions} onClick={()=>setIsWishOpen(true)}>
                      <div className={s.ProIcon}><Heart size={16}></Heart></div>
                      <div className={s.Proname}>WishList</div>
                    </div>
                    <div className={s.ProOptions} onClick={()=>setIsCartOpen(true)}>
                      <div className={s.ProIcon}><ShoppingCart size={16}></ShoppingCart></div>
                      <div className={s.Proname}  >Cart</div>
                    </div>
                  </div>
                  <div className={s.Profilbottom2}>
                    <Link className={s.SignInBtn} href={"sign-up"}>Sign In</Link>
                    <Link className={s.SignUpBtn} href={"sign-in"}>Create Account</Link>
                  </div>
                 </div>
                 )  
                 }
                </div>


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
          {isSettingsOpen &&
          <div className={s.FullScrin}>
            <div className={s.Overlay3} onClick={()=>setIsSettingsOpen(false)}></div>
            <div className={ `${s.SettingsBlock} ${inter.className}`}>
              <div className={s.CloseBlock}>
                <div className={s.AccountSettings}>Account Settings</div>
                <div className={s.Xbtn2} onClick={()=>setIsSettingsOpen(false)}><X size={20}></X></div>
              </div>
              <div className={s.Avatar}>
                <img className={s.photoAvatar} src="https://genshinbuild.com/images/Icons/Hu_Tao.png" alt="" />
                <div className={s.NickEmailBlock}>
                  <div className={s.Nick}>Vova</div>
                  <div className={s.Email}>Vovanlucjera@gmail.com</div>
                </div>
              </div>
              <div className={s.NickWords}>
        <UserRound size={18} className={s.OptiImg}></UserRound>        
  <input
    onFocus={() => setIsNickFocused(true)}
    placeholder="Change nickname"
    className={s.NickInput}
  />
  {isNickFocused && (
    <>
      <button ><Check size={20}></Check></button>
      <button onClick={() => setIsNickFocused(false)}><X size={20}></X></button>
    </>
  )}
</div>
              <div className={s.NickWords2}>
                 <Mail className={s.OptiImg} size={18}/>
  <input
    onFocus={() => setIsEmailFocused(true)}
    placeholder="Change email"
    className={s.NickInput}
    type="email"
  />
  {isEmailFocused && (
    <>
      <button ><Check size={20}></Check></button>
      <button onClick={() => setIsEmailFocused(false)}><X size={20}></X></button>
    </>
  )}
</div>
              <div className={s.NickWords2}>
                 <IoLockClosedOutline className={s.OptiImg} size={18}/>
  <input
    onFocus={() => setIsPasswordFocused(true)}
    placeholder="Change password"
    className={s.NickInput}
    type="password"
  />
  {isPasswordFocused && (
    <>
      <button ><Check size={20}></Check></button>
      <button onClick={() => setIsPasswordFocused(false)}><X size={20}></X></button>
    </>
  )}
</div>
            </div>
        </div>
          }

        </>
          
    )
}