import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "./lib/types";

// Why do we need zod when we already have react-hook-form?
// bcz we only wanna have validation on the client side but we also wanna have validation on the server side. So we are validating this form here on the client but when we get data on the server we basically wanna do validation again cz we cannot trust anything coming from the client on the server.
//The validation gonna remain the same only we can create one schema with the zod and use it on both the client and as well on server.
// npm i zod @hookform/resolvers




export const SignupRhfWithZod = ()=> {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      } = useForm<TSignUpSchema>({ //This we done to connect zod with react-hook-form , for that we make use of resolver what we installed while installling zod
        resolver: zodResolver(signUpSchema)
      });
    
      const onSubmit= async (data: TSignUpSchema)=> { 
        await new Promise((resolve)=> setTimeout(resolve, 1000));
        reset() 
      }
    
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2"> 
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className=" px-4 py-2 rounded"
          />
          
          {errors.email && (<p className="text-red-500"> {`${errors.email.message}`} </p>)}
    
    
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className=" px-4 py-2 rounded"
          />
          {errors.password && (<p className="text-red-500"> {`${errors.password.message}`} </p>)}
    
    
    
    
    
    
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            className=" px-4 py-2 rounded"
          />
          {errors.confirmPassword && (<p className="text-red-500"> {`${errors.confirmPassword.message}`} </p>)}
    
    
    
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-blue-500 disabled:bg-gray-500 py-2 rounded"
          >
            Submit
          </button>
        </form>
      );

}