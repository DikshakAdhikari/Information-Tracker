import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { signInSchema, TsignInSchema } from "dikshakk";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/authState";

export const Signin = () => {
  const navigate = useNavigate();
  const setRecoilState= useSetRecoilState(authState)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TsignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const handle = async (data: TsignInSchema) => {
    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        username: data.username,
        password: data.password,
      });
      //console.log(res.data);

      if (res.data.errors) {
        const errors = res.data.errors;
        if (errors.username) {
          setError("username", {
            type: "server",
            message: errors.username,
          });
        } else if (errors.password) {
          setError("password", {
            type: "server",
            message: errors.password,
          });
        } else {
          alert("Something went wrong");
        }
      } else {
        alert(res.data.message);
        if (!res.data.token) {
          navigate("/");
        } else {
          localStorage.setItem("token", res.data.token);
         // console.log(res);
          
          setRecoilState({
            token: res.data.token,
            username:getValues("username")
          })
          navigate("/list");
        }
      }

      //reset();
    } catch (err) {
      alert("Submission failed");
      console.log(err);
    }
  };

  //console.log(errors);

  return (
    <>
      <form onSubmit={handleSubmit(handle)}>
        <div className=" flex flex-col gap-3 justify-center items-center h-[100vh]">
          <div className=" text-[30px]">Signin</div>
          <input
            {...register("username")}
            placeholder="Username"
            className=" border-black shadow-lg p-2 rounded-md w-[300px]"
          />
          {errors.username && (
            <p className=" text-red-700">{errors.username.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="p-2 shadow-lg rounded-md w-[300px]"
          />
          {errors.password && (
            <p className=" text-red-700 ">{errors.password.message}</p>
          )}
          <button
            disabled={isSubmitting}
            className="bg-blue-500 p-2 rounded-md text-black disabled:bg-slate-500"
            type="submit"
          >
            Submit
          </button>
          <div>
            Don't have account?{" "}
            <Link className=" text-blue-900" to="/">
              Signup
            </Link>{" "}
            to register
          </div>
        </div>
      </form>
    </>
  );
};
