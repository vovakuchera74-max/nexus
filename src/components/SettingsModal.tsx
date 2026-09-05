'use client'
import { useState } from 'react'
import { X, UserRound, Mail, Check } from 'lucide-react'
import { IoLockClosedOutline } from 'react-icons/io5'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import AvatarUpload from './AvatarUpload'
import s from '../styles/Profile.module.scss'

export default function SettingsModal({
  user,
  isOpen,
  onClose,
}: {
  user: User | null
  isOpen: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newNick, setNewNick] = useState('')
  const [isNickFocused, setIsNickFocused] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

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

  if (!isOpen) return null

  return (
    <div className={s.FullScrin}>
      <div className={s.Overlay3} onClick={onClose}></div>
      <div className={s.SettingsBlock}>
        <div className={s.CloseBlock}>
          <div className={s.AccountSettings}>Account Settings</div>
          <button type="button" className={s.Xbtn2} onClick={onClose}>
            <X size={20}></X>
          </button>
        </div>
        <div className={s.Avatar}>
          <AvatarUpload user={user} />
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
  )
}