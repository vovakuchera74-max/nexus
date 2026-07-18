import { z } from "zod"

export const signUp = z.object({
  username: z.string().min(1,"Username is required").min(3,"At least 3 characters").max(12,"Max 12 characters"),
  email: z.string().min(1,"Email is required").email("Invalid email"),
  password: z.string().min(1,"Password is required").min(8, "At least 8 characters"),
  confirmPassword: z.string().min(1,"Please confirm your password"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type signUpValue = z.infer<typeof signUp>