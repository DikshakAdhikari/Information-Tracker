import {z} from "zod"

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(10 , "Password muse be atleast 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords must match",
    path:["confirmPassword"],
  }); //we have a .refine() method in zod , so the argument insie it is all the data of the form. So using it we check for password and confirm password same or not. If not same then we need to show some error as message to the required feild like here we connect to confirmPassword feild i.e. path: ["confirmPassword"]
  
export type TSignUpSchema= z.infer<typeof signUpSchema> //it will create typescript type for signUpSchema