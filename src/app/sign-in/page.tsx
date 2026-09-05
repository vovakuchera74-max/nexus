'use client'
import s from '../../styles/AuthForm.module.scss'
import Link from 'next/link'
import { CircleAlert } from 'lucide-react';
import { Gamepad2,Mail} from 'lucide-react'
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
    formState: { errors,isSubmitting},
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
    <div className={s.AuthPage}>
      <div className={`${s.corner} ${s.cornerTopLeft}`}></div>
      <div className={`${s.corner} ${s.cornerTopRight}`}></div>
      <div className={`${s.corner} ${s.cornerBottomLeft}`}></div>
      <div className={`${s.corner} ${s.cornerBottomRight}`}></div>
      <div className={s.AuthBlock}>
        <Link href={'/'} className={s.AuthLogo}>
          <div className={s.log}>
            <Gamepad2 size={20} />
          </div>
          <div className={`${s.name} ${s.orbitron}`}>
            NEXUS <span className={s.gg}>GG</span>
          </div>
        </Link>
        <div className={s.AuthWords}>Sign In</div>
        <div className={s.AuthLink}>
          <div className={s.Already}>Don&apos;t have an account?</div>
          <Link href={'/sign-up'} className={s.sign}>
            Create one
          </Link>
        </div>
        <div className={s.AuthChoice}>
          <button className={s.GitBlock} onClick={handleGitHub}>
            <div className={s.GitImg}>
              <FiGithub size={16} />
            </div>
            <div className={s.GitWords}>GitHub</div>
          </button>
        </div>
        <div className={s.AuthBorder}>
          <div className={s.Line}></div>
          <div className={s.Words}>or with email</div>
          <div className={s.Line}></div>
        </div>
       <form onSubmit={handleSubmit(onSubmit)} className={s.AuthBlockBottom}>
  <div className={s.OptiBlock}>
    <label htmlFor="email" className={s.Optiname}>Email</label>
    <label
      className={errors.email ? s.OptiwritenError : s.Optiwriten}
    >
      <Mail className={s.OptiImg} size={16} />
      <input
        {...register('email')}
        id="email"
        className={s.OptiInput}
        type="email"
        placeholder="User@nexusgg.com"
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
    </label>
    {errors.email && (
      <span id="email-error" className={s.errorText} role="alert">
        {errors.email.message}
      </span>
    )}
  </div>

  <div className={s.OptiBlock}>
    <label htmlFor="password" className={s.Optiname}>Password</label>
    <label
      className={errors.password ? s.OptiwritenError : s.Optiwriten}
    >
      <IoLockClosedOutline className={s.OptiImg} size={16} />
      <input
        {...register('password')}
        id="password"
        className={s.OptiInput}
        type={EyeOpen ? 'text' : 'password'}
        placeholder="Min. 8 characters"
        aria-describedby={errors.password ? 'password-error' : undefined}
      />
      <button
        type="button"
        className={s.EyeRepet}
        onClick={() => setEyeOpen(!EyeOpen)}
        aria-label={EyeOpen ? 'Hide password' : 'Show password'}
      >
        {EyeOpen ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </label>
    {errors.password && (
      <span id="password-error" className={s.errorText} role="alert">
        {errors.password.message}
      </span>
    )}
  </div>

  {authError && (
    <div className={s.authError} role="alert">
      <CircleAlert size={16} />
      {authError}
    </div>
  )}
  <button className={s.Regbtn} disabled={isSubmitting}>
    <div className={s.RegbtnText}>
      {isSubmitting ? 'Signing in...' : 'Sign In'}
    </div>
    <div className={s.ArrowFor}>
      <ArrowRight className={s.abc} size={16} />
    </div>
  </button>
</form>
        <div className={s.ConfirmOpt}>
          By signing in you agree to<span className={s.someText1}>Terms</span>{' '}
          and <span className={s.someText2}>Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}
