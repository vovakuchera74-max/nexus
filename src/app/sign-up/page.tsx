'use client'
import s from '../../styles/AuthForm.module.scss'
import Link from 'next/link'
import { Gamepad2, User, Mail} from 'lucide-react'
import { FiGithub } from 'react-icons/fi'
import { CircleAlert } from 'lucide-react';
import { IoLockClosedOutline } from 'react-icons/io5'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp, signUpValue } from '../../validations/signUpSchema'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'


export default function SignUp() {
const handleGitHub = async () => {
  setAuthError(null)
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  })
  if (error) {
    setAuthError('Failed to sign in via GitHub. Please try again later.')
  }
}
  const router = useRouter()
  const [EyeOpen, setEyeOpen] = useState(false)
  const [EyeOpenRep, setEyeOpenRep] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting},
  } = useForm<signUpValue>({
    mode: 'onTouched',
    resolver: zodResolver(signUp),
  })
const onSubmit = async (data: signUpValue) => {
  setAuthError(null)
  const supabase = createClient()

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { username: data.username },
    },
  })

  if (error) {
    setAuthError(error.message)
    return
  }

  if (authData.user && authData.user.identities?.length === 0) {
    setAuthError('An account with this email already exists. Try signing in instead.')
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
        <div className={s.AuthWords}>Create Account</div>
        <div className={s.AuthLink}>
          <div className={s.Already}>Already a member?</div>
          <Link href={'/sign-in'} className={s.sign}>
            Sign in
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={s.AuthBlockBottom}
        >
          <div className={s.OptiBlock}>
            <label  htmlFor="username" className={s.Optiname}>Username</label>
            <label
              className={errors.username ? s.OptiwritenError : s.Optiwriten}
            >
              <User className={s.OptiImg} size={16} />
              <input
                {...register('username')}
                className={s.OptiInput}
                type="text"
                placeholder="YourName"
                id='username'
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
            </label>
            {errors.username && (
              <span id="username-error" role='alert' className={s.errorText}>{errors.username.message}</span>
            )}
          </div>
          <div className={s.OptiBlock}>
            <label htmlFor='email' className={s.Optiname}>Email</label>
            <label className={errors.email ? s.OptiwritenError : s.Optiwriten}>
              <Mail className={s.OptiImg} size={16} />
              <input
                {...register('email')}
                className={s.OptiInput}
                type="email"
                placeholder="User@nexusgg.com"
                id='email'
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </label>
            {errors.email && (
              <span role='alert' id='email-error' className={s.errorText}>{errors.email.message}</span>
            )}
          </div>
          <div className={s.OptiBlock}>
            <label htmlFor='password' className={s.Optiname}>Password</label>
            <label
              className={errors.password ? s.OptiwritenError : s.Optiwriten}
            >
              <IoLockClosedOutline className={s.OptiImg} size={16} />
              <input
                {...register('password')}
                className={s.OptiInput}
                type={EyeOpen ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                id='password'
                aria-describedby={errors.password ? "password-error" :undefined}
              />
              <button
                className={s.EyeRepet}
                type="button"
                onClick={() => setEyeOpen(!EyeOpen)}
                aria-label={EyeOpen ? 'Hide password' : 'Show password'}
              >
                {EyeOpen ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </label>
            {errors.password && (
              <span role='alert' id='password-error' className={s.errorText}>{errors.password.message}</span>
            )}
          </div>
          <div className={s.OptiBlock}>
            <label htmlFor='confirmpassword' className={s.Optiname}>Confirm Password</label>
            <label
              className={
                errors.confirmPassword ? s.OptiwritenError : s.Optiwriten
              }
            >
              <IoLockClosedOutline className={s.OptiImg} size={16} />
              <input
                {...register('confirmPassword')}
                className={s.OptiInput}
                type={EyeOpenRep ? 'text' : 'password'}
                placeholder="Repeat your password"
                id='confirmpassword'
                aria-describedby={errors.confirmPassword ? "confirmpassword-error" : undefined}
              />
              <button
                className={s.EyeRepet}
                type="button"
                onClick={() => setEyeOpenRep(!EyeOpenRep)}
                aria-label={EyeOpenRep ? 'Hide confirm password' : 'Show confirm password'}
              >
                {EyeOpenRep ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </label>
            {errors.confirmPassword && (
              <span className={s.errorText} id='confirmpassword-error' role='alert'>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
<label className={s.checkboxLabel}>
  <input
    {...register('terms')}
    type="checkbox"
    className={s.checkboxInput}
    aria-describedby={errors.terms ? 'terms-error' : undefined}
  />
  <span className={s.checkboxCustom}></span>
  <span className={s.checkboxText}>
    I agree to the{' '}
    <span className={s.someText1}>Terms of Service</span>and
    <span className={s.someText2}>Privacy Policy</span>
  </span>
</label>
{errors.terms && (
  <span id="terms-error" role="alert" className={s.errorText}>
    {errors.terms.message}
  </span>
)}
{authError && (
  <div className={s.authError} role="alert">
    <CircleAlert size={16} />
    {authError}
  </div>
)}

          <button className={s.Regbtn} disabled={isSubmitting}>
            <div className={s.RegbtnText}>
              {isSubmitting ? "Signing up..." : "Create Account"}
            </div>
            <div className={s.ArrowFor}>
              <ArrowRight size={17} />
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}
