import s from '../styles/Header.module.scss'
import { Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './Search'
import HeaderActions from './ProfileCart'
import { createServerSupabase } from '@/lib/supabase-server'

export default async function Header() {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className={s.header}>
      <div className={s.headerbox}>
        <Link href={'/'} className={s.logo}>
          <div className={s.log}>
            <Gamepad2 size={22} />
          </div>
          <div className={`${s.name} ${s.orbitron}`}>
            NEXUS <span className={s.gg}>GG</span>
          </div>
        </Link>
        <SearchInput />
        <HeaderActions user={user} />
      </div>
    </header>
  )
}
