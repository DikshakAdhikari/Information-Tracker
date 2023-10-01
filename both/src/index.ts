import { z } from 'zod'

export const signUpSchema= z.object({
    username: z.string().min(7).max(20).email(),
    password: z.string().min(5, "Password must be atleast of length 5").max(20),
    confirmPassword: z.string().min(5).max(20),
}).refine((data)=> data.password === data.confirmPassword , {message: "Password don't match", path: ["confirmPassword"], });

export const signInSchema= z.object({
    username: z.string().min(7).max(20).email(),
    password: z.string().min(5, "Password must be atleast of length 5").max(20),
})

 export type TsignUpSchema= z.infer<typeof signUpSchema>
 export type TsignInSchema= z.infer<typeof signInSchema>