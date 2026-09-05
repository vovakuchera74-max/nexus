'use client'
import { useState } from 'react'
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Settings,
  Heart,
  LogOut,
  UserRound,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import s from '../styles/Profile.module.scss'

export default function ProfileDropdown({
  user,
  onOpenWishlist,
  onOpenCart,
  onOpenSettings,
}: {
  user: User | null
  onOpenWishlist: () => void
  onOpenCart: () => void
  onOpenSettings: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const selectAndClose = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsOpen(false)
    router.push('/')
  }

  return (
    <div className={s.ProfileWrapper}>
      <button
        type="button"
        className={isOpen ? s.ProfileActiv : s.Profile}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className={s.ProIcon}>
          <UserRound size={20} />
        </div>
        <div className={s.ProWords}>Profile</div>
        <div className={s.arroww}>
          {isOpen ? (
            <ChevronUp size={14} className={s.updown2} />
          ) : (
            <ChevronDown size={14} className={s.updown2} />
          )}
        </div>
      </button>

      {isOpen &&
        (user ? (
          <div className={s.ProfileOptions}>
            <div className={s.ProfileTop}>
              <div className={s.Photo}>
                <Image
                  fill
                  sizes="50px"
                  src={user?.user_metadata?.avatar_url || '/default.avif'}
                  alt=""
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
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
              <button
                type="button"
                className={s.ProOptions}
                onClick={() => selectAndClose(onOpenWishlist)}
              >
                <div className={s.ProIcon}>
                  <Heart size={16}></Heart>
                </div>
                <div className={s.Proname}>WishList</div>
              </button>
              <button
                type="button"
                className={s.ProOptions}
                onClick={() => selectAndClose(onOpenCart)}
              >
                <div className={s.ProIcon}>
                  <ShoppingCart size={16}></ShoppingCart>
                </div>
                <div className={s.Proname}>Cart</div>
              </button>
              <button
                type="button"
                className={s.ProOptions}
                onClick={() => selectAndClose(onOpenSettings)}
              >
                <div className={s.ProIcon}>
                  <Settings size={16}></Settings>
                </div>
                <div className={s.Proname}>Settings</div>
              </button>
            </div>
            <button type="button" onClick={handleSignOut} className={s.Profilbottom}>
              <div className={s.SignOutIcon}>
                <LogOut size={16}></LogOut>{' '}
              </div>
              <span className={s.SignOutWord}>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className={s.ProfileOptions}>
            <div className={s.ProfileTop}>
              <div className={s.DataBlock}>
                <div className={s.ProfilHellow}>Welcome!</div>
                <div className={s.ProfileSomeText}>
                  Log in to access your profile, wishlist.
                </div>
              </div>
            </div>
            <div className={s.Profilemain}>
              <button
                type="button"
                className={s.ProOptions}
                onClick={() => selectAndClose(onOpenWishlist)}
              >
                <div className={s.ProIcon}>
                  <Heart size={16}></Heart>
                </div>
                <div className={s.Proname}>WishList</div>
              </button>
              <button
                type="button"
                className={s.ProOptions}
                onClick={() => selectAndClose(onOpenCart)}
              >
                <div className={s.ProIcon}>
                  <ShoppingCart size={16}></ShoppingCart>
                </div>
                <div className={s.Proname}>Cart</div>
              </button>
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
  )
}