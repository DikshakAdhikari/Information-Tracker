import { useForm } from "react-hook-form";
import type {FieldValues} from "react-hook-form"

export const SignupWithReactFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues, //to check whether password is equal to confirm password
  } = useForm();

  const onSubmit= async (data: FieldValues)=> { //we need to implicitily import the type of data i.e. FieldValues from the 'react-hook-form'
    await new Promise((resolve)=> setTimeout(resolve, 1000));
    reset() //now we got reset() function from react-hook-form also ,  so need not to implicitily set the states manually after submitting form
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2"> {/* handleSubmit() function is similar to e.preventDefault() and the argumemt inside it is data i.e. it only does not prevent default but also validate data according to us. To validate data we put another function onSubmit inside it to get data for furthur validation */ }
      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
        className=" px-4 py-2 rounded"
      />
      {/* register("email") -> This function returns props , so we wanna spread these props on this input so for doing that we use spread operator */}
      {errors.email && (<p className="text-red-500"> {`${errors.email.message}`} </p>)}


      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 10,
            message: "Password must be at least 10 characters",
          },
        })}
        type="password"
        placeholder="Password"
        className=" px-4 py-2 rounded"
      />
      {errors.password && (<p className="text-red-500"> {`${errors.password.message}`} </p>)}





{/* Check also we are writing confirm password logic also inside */}
      <input
        {...register("confirmPassword" ,{
            required: "Confirm password is required",
            validate: (value)=> value === getValues("password") || "Passwords must match"
        })}
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
};
