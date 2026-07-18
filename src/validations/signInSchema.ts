import { z } from "zod"

export const signIn = z.object({
  email: z.string().min(1,"Email is required").email("Invalid email"),
  password: z.string().min(1,"Password is required").min(8, "At least 8 characters"),
})
export type signInValue = z.infer<typeof signIn>