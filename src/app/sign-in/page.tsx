'use client'
import s from '../../styles/SignIn.module.scss'
import Link from 'next/link'
import { CircleAlert } from 'lucide-react';
import { Gamepad2,Mail} from 'lucide-react'
import { Inter } from 'next/font/google'
import { FiGithub } from 'react-icons/fi'
import { IoLockClosedOutline } from 'react-icons/io5'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, signInValue } from '../../validations/signInSchema'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})

export default function SignIn() {
const handleGitHub = async () => {
  setAuthError(null)
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) {
    setAuthError('Failed to sign in via GitHub. Please try again later.')
  }
}
  const router = useRouter()
  const [EyeOpen, setEyeOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<signInValue>({
    mode: 'onTouched',
    resolver: zodResolver(signIn),
  })
const onSubmit = async (data: signInValue) => {
  setAuthError(null)
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })
  if (error) {
    setAuthError('Incorrect email or password. Please try again.')
    return
  }
  router.push('/')
}

  return (
    <div className={s.SingUpPage}>
      <div className={`${s.corner} ${s.cornerTopLeft}`}></div>
      <div className={`${s.corner} ${s.cornerTopRight}`}></div>
      <div className={`${s.corner} ${s.cornerBottomLeft}`}></div>
      <div className={`${s.corner} ${s.cornerBottomRight}`}></div>
      <div className={s.SingUpBlock}>
        <Link href={'/'} className={s.SingUpLogo}>
          <div className={s.log}>
            <Gamepad2 size={20} />
          </div>
          <div className={`${s.name} ${s.orbitron}`}>
            NEXUS <span className={s.gg}>GG</span>
          </div>
        </Link>
        <div className={s.SingUpWords}>Sign In</div>
        <div className={`${s.SingUpLink} ${inter.className}`}>
          <div className={s.Already}>Don&apos;t have an account?</div>
          <Link href={'sign-up'} className={s.sign}>
            Create one
          </Link>
        </div>
        <div className={`${s.SingUpСhoice} ${inter.className}`}>
          <div className={s.GitBlock} onClick={handleGitHub}>
            <div className={s.GitImg}>
              <FiGithub size={16} />
            </div>
            <div className={s.GitWords}>GitHub</div>
          </div>
        </div>
        <div className={`${s.SingUpBorder} ${inter.className}`}>
          <div className={s.Line}></div>
          <div className={s.Words}>or with email</div>
          <div className={s.Line}></div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${s.SingUpBlockBottom} ${inter.className}`}
        >
          <div className={s.OptiBlock}>
            <div className={s.Optiname}>Email</div>
            <label
              className={errors.password ? s.OptiwritenError : s.Optiwriten}
            >
              <Mail className={s.OptiImg} size={16} />
              <input
                {...register('email')}
                className={s.OptiInput}
                type="email"
                placeholder="User@nexusgg.com"
              />
            </label>
            {errors.email && (
              <span className={s.errorText}>{errors.email.message}</span>
            )}
          </div>
          <div className={s.OptiBlock}>
            <div className={s.Optiname}>Password</div>
            <label
              className={errors.password ? s.OptiwritenError : s.Optiwriten}
            >
              <IoLockClosedOutline className={s.OptiImg} size={16} />
              <input
                {...register('password')}
                className={s.OptiInput}
                type={EyeOpen ? 'text' : 'password'}
                placeholder="Min. 8 characters"
              />
              <button
                type="button"
                className={s.EyeRepet}
                onClick={() => setEyeOpen(!EyeOpen)}
              >
                {EyeOpen ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </label>
            {errors.password && (
              <span className={s.errorText}>{errors.password.message}</span>
            )}
          </div>
          {authError && (
  <div className={s.authError}>
    <CircleAlert size={16} />
    {authError}
  </div>
)}
          <button className={s.Regbtn}>
            <div className={s.RegbtnText}>Sign In</div>
            <div className={s.ArrowFor}>
              <ArrowRight className={s.abc} size={16} />
            </div>
          </button>
        </form>
        <div className={`${s.ConfirmOpt} ${inter.className}`}>
          By signing in you agree to<span className={s.someText1}>Terms</span>{' '}
          and <span className={s.someText2}>Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}
