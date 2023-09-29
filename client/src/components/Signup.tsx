import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {z} from 'zod'

export const Signup = () => {
    const signUpSchema= z.object({
        username: z.string().min(7).max(20).email(),
        password: z.string().min(5, "Password must be atleast of length 5").max(20),
        confirmPassword: z.string().min(5).max(20),
    }).refine((data)=> data.password === data.confirmPassword , {message: "Password don't match", path: ["confirmPassword"], });

     type TsignUpSchema= z.infer<typeof signUpSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TsignUpSchema>({
        resolver: zodResolver(signUpSchema)
  });

  const handle =async (data: TsignUpSchema)=> {
    const res= await new Promise((resolve)=> setTimeout(resolve, 3000) )
    reset();
  }

  //console.log(errors);
  
  return <>
    <form onSubmit={handleSubmit(handle)}>
        <div className=" flex flex-col gap-3 justify-center items-center h-[100vh]">
            <div  className=" text-[30px]">Register</div>
            <input {...register("username")}  placeholder="Username"  className=" border-black shadow-lg p-2 rounded-md w-[300px]" />
            {errors.username && <p className=" text-red-500">{errors.username.message}</p> }
            <input {...register("password")} type="password" placeholder="Password" className="p-2 shadow-lg rounded-md w-[300px]" />
            {errors.password && <p className=" text-red-500">{errors.password.message}</p> }
            <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="p-2 shadow-lg rounded-md w-[300px]" />
            {errors.confirmPassword && <p className=" text-red-500">{errors.confirmPassword.message}</p> }
            <button disabled={isSubmitting} className="bg-blue-500 p-2 rounded-md text-black disabled:bg-slate-500" type="submit">Submit</button>

        </div>
    </form>
  </>;
};
