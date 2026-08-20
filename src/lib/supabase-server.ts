import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServerSupabase = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
  try {
    cookiesToSet.forEach(({ name, value, options }) =>
      cookieStore.set(name, value, options)
    )
  } catch {
    // ігноруємо — це очікувано, якщо викликається з Server Component,
    // де Next.js забороняє змінювати cookies напряму;
    // у такому разі сесію оновлює middleware (наступний крок, I16)
  }
},
      },
    }
  )
}
