'use client'
import s from '../styles/Profile.module.scss'
import { useState, useRef } from 'react'
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  X,
  Settings,
  Heart,
  LogOut,
} from 'lucide-react'
import CardCart from './CartCard'
import { useCartStore } from '@/store/CartStore'
import { Inter } from 'next/font/google'
import { useWishListStore } from '@/store/WishlistStore'
import WishCard from './WishCard'
import { UserRound } from 'lucide-react'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { Mail } from 'lucide-react'
import { IoLockClosedOutline } from 'react-icons/io5'
import { Camera } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})
export default function HeaderActions({ user }: { user: User | null }) {
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newNick, setNewNick] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isNickFocused, setIsNickFocused] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishOpen, setIsWishOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const wish = useWishListStore((state) => state.Wish)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const getTotalCount = useCartStore((state) => state.getTotalCount)
  const hasHydrated = useCartStore((state) => state.hasHydrated)
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
  }
  const handleSaveNick = async () => {
    const supabase = createClient()
    await supabase.auth.updateUser({
      data: { username: newNick },
    })
    setIsNickFocused(false)
    setNewNick('')
    router.refresh()
  }
  const handleSaveEmail = async () => {
    console.log('newEmail:', newEmail)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    })
    if (error) {
      console.log(error)
      return
    }
    setIsEmailFocused(false)
    setNewEmail('')
    router.refresh()
  }
  const handleSavePassword = async () => {
    const supabase = createClient()
    await supabase.auth.updateUser({
      password: newPassword,
    })
    setIsPasswordFocused(false)
    setNewPassword('')
    router.refresh()
  }
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const supabase = createClient()

    // завантажуємо файл в Storage
    const { error } = await supabase.storage
      .from('avatars')
      .upload(`${user?.id}/${file.name}`, file, { upsert: true })

    if (error) {
      console.log(error)
      return
    }

    // отримуємо публічний URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${user?.id}/${file.name}`)

    // зберігаємо URL в user_metadata
    await supabase.auth.updateUser({
      data: { avatar_url: urlData.publicUrl },
    })

    router.refresh()
  }
  return (
    <>
      <div className={s.link}>
        <button className={s.CartBlock} onClick={() => setIsWishOpen(true)}>
          <Heart size={19}></Heart>
          <div className={s.textWrapper}>
            <span className={s.Cart}>WishList</span>
            {wish.length > 0 && (
              <span className={`${s.badgge} ${inter.className}`}>
                {wish.length}
              </span>
            )}
          </div>
        </button>
        <button className={s.CartBlock2} onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={20}></ShoppingCart>
          <div className={s.textWrapper}>
            <span className={s.Cart}>Cart</span>
            {hasHydrated && getTotalCount() > 0 && (
  <span className={`${s.badgge} ${inter.className}`}>
    {getTotalCount()}
  </span>
)}
          </div>
        </button>

        <div
          className={isProfileOpen ? s.ProfileActiv : s.Profile}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className={s.ProIcon}>
            <UserRound size={20} />
          </div>
          <div className={s.ProWords}>Profile</div>
          <div className={s.arroww}>
            {isProfileOpen ? (
              <ChevronUp size={14} className={s.updown2} />
            ) : (
              <ChevronDown size={14} className={s.updown2} />
            )}
          </div>

          {isProfileOpen &&
            (user ? (
              <div className={`${s.ProfileOptions} ${inter.className}`}>
                <div className={s.ProfileTop}>
                  <div className={s.Photo}>
                    <img
                      src={
                        user?.user_metadata?.avatar_url ||
                        'https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette_719432-3512.jpg'
                      }
                      alt=""
                    />
                  </div>
                  <div className={s.DataBlock}>
                    <div className={s.ProfileNick}>
                      {user.user_metadata.username ||
                        user.user_metadata.user_name ||
                        user.email}
                    </div>
                    <div className={s.ProfileEmail}>{user.email}</div>
                  </div>
                </div>
                <div className={s.Profilemain}>
                  <div
                    className={s.ProOptions}
                    onClick={() => setIsWishOpen(true)}
                  >
                    <div className={s.ProIcon}>
                      <Heart size={16}></Heart>
                    </div>
                    <div className={s.Proname}>WishList</div>
                  </div>
                  <div
                    className={s.ProOptions}
                    onClick={() => setIsCartOpen(true)}
                  >
                    <div className={s.ProIcon}>
                      <ShoppingCart size={16}></ShoppingCart>
                    </div>
                    <div className={s.Proname}>Cart</div>
                  </div>
                  <div
                    className={s.ProOptions}
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    <div className={s.ProIcon}>
                      <Settings size={16}></Settings>
                    </div>
                    <div className={s.Proname}>Settings</div>
                  </div>
                </div>
                <div onClick={handleSignOut} className={s.Profilbottom}>
                  <div className={s.SingOutIcon}>
                    <LogOut size={16}></LogOut>{' '}
                  </div>
                  <Link href={'/'} className={s.SingOutWord}>
                    Sing Out
                  </Link>
                </div>
              </div>
            ) : (
              <div className={`${s.ProfileOptions} ${inter.className}`}>
                <div className={s.ProfileTop}>
                  <div className={s.DataBlock}>
                    <div className={s.ProfilHellow}>Welcome!</div>
                    <div className={s.ProfileSomeText}>
                      Log in to access your profile, wishlist.
                    </div>
                  </div>
                </div>
                <div className={s.Profilemain}>
                  <div
                    className={s.ProOptions}
                    onClick={() => setIsWishOpen(true)}
                  >
                    <div className={s.ProIcon}>
                      <Heart size={16}></Heart>
                    </div>
                    <div className={s.Proname}>WishList</div>
                  </div>
                  <div
                    className={s.ProOptions}
                    onClick={() => setIsCartOpen(true)}
                  >
                    <div className={s.ProIcon}>
                      <ShoppingCart size={16}></ShoppingCart>
                    </div>
                    <div className={s.Proname}>Cart</div>
                  </div>
                </div>
                <div className={s.Profilbottom2}>
                  <Link className={s.SignInBtn} href={'/sign-in'}>
                    Sign In
                  </Link>
                  <Link className={s.SignUpBtn} href={'/sign-up'}>
                    Create Account
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isCartOpen && (
        <div className={s.cartWrapper}>
          <div className={s.Overlay} onClick={() => setIsCartOpen(false)}></div>
          <div className={s.CardPanel}>
            <div className={s.top}>
              <div className={s.block}>
                <ShoppingCart className={s.img} size={22}></ShoppingCart>
                <span className={s.CartTop}>Cart ({getTotalCount()})</span>
              </div>
              <button className={s.Xbtn} onClick={() => setIsCartOpen(false)}>
                <X size={20}></X>
              </button>
            </div>
            {items.length === 0 ? (
              <div className={s.emptyState}>
                <ShoppingCart
                  className={s.emptyimg}
                  size={48}
                  strokeWidth={1}
                />
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
      )}

      {isWishOpen && (
        <div className={s.cartWrapper}>
          <div className={s.Overlay} onClick={() => setIsWishOpen(false)}></div>
          <div className={s.CardPanel}>
            <div className={s.top}>
              <div className={s.block}>
                <Heart className={s.img} size={24}></Heart>
                <span className={s.CartTop}>WishList ({wish.length})</span>
              </div>
              <button className={s.Xbtn} onClick={() => setIsWishOpen(false)}>
                <X size={20}></X>
              </button>
            </div>
            {wish.length === 0 ? (
              <div className={s.emptyState}>
                <Heart className={s.emptyimg} size={48} strokeWidth={1} />
                <div className={s.emptyTitle}>Your wishlist is empty</div>
                <div className={s.emptyText}>
                  Save items you love to find them later
                </div>
              </div>
            ) : (
              <>
                <div className={s.main}>
                  {wish.map((wish) => (
                    <WishCard wish={wish} key={wish.id} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {isSettingsOpen && (
        <div className={s.FullScrin}>
          <div
            className={s.Overlay3}
            onClick={() => setIsSettingsOpen(false)}
          ></div>
          <div className={`${s.SettingsBlock} ${inter.className}`}>
            <div className={s.CloseBlock}>
              <div className={s.AccountSettings}>Account Settings</div>
              <div className={s.Xbtn2} onClick={() => setIsSettingsOpen(false)}>
                <X size={20}></X>
              </div>
            </div>
            <div className={s.Avatar}>
              <div className={s.photoAvatarBlock}>
                <div
                  className={s.photoAvatar}
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <img
                    src={
                      user?.user_metadata?.avatar_url ||
                      'https://img.magnific.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette_719432-3512.jpg'
                    }
                    alt=""
                  />
                </div>
                <button
                  className={s.Pgotik}
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <Camera size={11} />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className={s.hidden}
                  onChange={handleAvatarChange}
                />
              </div>
              <div className={s.NickEmailBlock}>
                <div className={s.Nick}>
                  {user?.user_metadata?.username || user?.email}
                </div>
                <div className={s.Email}>{user?.email}</div>
              </div>
            </div>
            <div className={s.NickWords}>
              <UserRound size={18} className={s.OptiImg}></UserRound>
              <input
                onFocus={() => setIsNickFocused(true)}
                placeholder="Change nickname"
                className={s.NickInput}
                value={newNick}
                onChange={(e) => setNewNick(e.target.value)}
              />
              {isNickFocused && (
                <>
                  <button className={s.yes} onClick={handleSaveNick}>
                    <Check size={16}></Check>
                  </button>
                  <button
                    className={s.no}
                    onClick={() => {
                      setIsNickFocused(false)
                      setNewNick('')
                    }}
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
            <div className={s.NickWords2}>
              <Mail className={s.OptiImg} size={18} />
              <input
                onFocus={() => setIsEmailFocused(true)}
                placeholder="Change email"
                className={s.NickInput}
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              {isEmailFocused && (
                <>
                  <button className={s.yes} onClick={handleSaveEmail}>
                    <Check size={16}></Check>
                  </button>
                  <button
                    className={s.no}
                    onClick={() => {
                      setIsEmailFocused(false)
                      setNewEmail('')
                    }}
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
            <div className={s.NickWords2}>
              <IoLockClosedOutline className={s.OptiImg} size={18} />
              <input
                onFocus={() => setIsPasswordFocused(true)}
                placeholder="Change password"
                className={s.NickInput}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {isPasswordFocused && (
                <>
                  <button className={s.yes} onClick={handleSavePassword}>
                    <Check size={16}></Check>
                  </button>
                  <button
                    className={s.no}
                    onClick={() => {
                      setIsPasswordFocused(false)
                      setNewPassword('')
                    }}
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
