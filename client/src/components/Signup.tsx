import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import {signUpSchema,TsignUpSchema} from 'dikshakk'
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate= useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TsignUpSchema>({
        resolver: zodResolver(signUpSchema)
  });

  const handle =async (data: TsignUpSchema)=> {
    try{
    const res= await axios.post('http://localhost:3000/user/signup', {username: data.username, password: data.password, confirmPassword:data.confirmPassword}); 
   // console.log(res.data);

    if(res.data.errors){
      const errors= res.data.errors;
      if(errors.username){
        setError("username", {
          type:'server',
          message:errors.username,
        })
      }else if(errors.password){
        setError("password",{
          type:"server",
          message:errors.password,
        })
      }else if(errors.confirmPassword){
        setError("confirmPassword",{
          type:"server",
          message:errors.confirmPassword,
        })
      }else{
        alert("Something went wrong");
      }
    }else{
      alert(res.data.message);
      navigate('/signin')
    }
      
    //reset();
  }catch(err){
    alert("Submission failed")
    console.log(err);
    
  }
  }

  //console.log(errors);
  
  return <>
    <form  onSubmit={handleSubmit(handle)}>
        <div className=" flex flex-col gap-3 justify-center items-center h-[100vh]">
            <div  className=" text-[30px]">Register</div>
            <input {...register("username")}  placeholder="Username"  className=" border-black shadow-lg p-2 rounded-md w-[300px]" />
            {errors.username && <p className=" text-red-700">{errors.username.message}</p> }
            <input {...register("password")} type="password" placeholder="Password" className="p-2 shadow-lg rounded-md w-[300px]" />
            {errors.password && <p className=" text-red-700">{errors.password.message}</p> }
            <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="p-2 shadow-lg rounded-md w-[300px]" />
            {errors.confirmPassword && <p className=" text-red-700">{errors.confirmPassword.message}</p> }
            <button disabled={isSubmitting} className="bg-blue-500 p-2 rounded-md text-black disabled:bg-slate-500" type="submit">Submit</button>
            <div>Already registered? <Link className=" text-blue-900" to='/signin'>Signin</Link> to continue </div>

        </div>
    </form>
  </>;
};
