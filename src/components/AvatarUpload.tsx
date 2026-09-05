'use client'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import s from '../styles/Profile.module.scss'

export default function AvatarUpload({ user }: { user: User | null }) {
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const supabase = createClient()

    const { error } = await supabase.storage
      .from('avatars')
      .upload(`${user?.id}/${file.name}`, file, { upsert: true })

    if (error) {
      console.log(error)
      return
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${user?.id}/${file.name}`)

    await supabase.auth.updateUser({
      data: { avatar_url: urlData.publicUrl },
    })

    router.refresh()
  }

  return (
    <div className={s.photoAvatarBlock}>
      <button
        type="button"
        className={s.photoAvatar}
        onClick={() => avatarInputRef.current?.click()}
      >
        <Image
          fill
          sizes="90px"
          src={user?.user_metadata?.avatar_url || '/default.avif'}
          alt=""
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
      </button>
      <button
        type="button"
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
  )
}