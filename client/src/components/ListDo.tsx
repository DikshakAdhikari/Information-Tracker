import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../store/authState";
import axios from "axios";
interface Todo {
  title: string;
  description: string;
  done: boolean;
  _id: number;
}

type Todos = Todo[];

export const ListDo = () => {
  const authStateValue = useRecoilValue(authState);
  //console.log(authStateValue);

  const navigate = useNavigate();
  //console.log(todos);

  const [todos, setTodos] = useState<Todos>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/todos/todo", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (typeof token === null || typeof token === undefined || !token) {
          navigate("/");
        } else {
          setTodos(data);
        }
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };
    getTodos();
  }, []);

  const onSubmit = async () => {
    const title = getValues("title");
    const description = getValues("description");
    const response = await fetch("http://localhost:3000/todos/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });
    const datas = await response.json();
    setTodos([...todos, datas]);
    reset();
  };

  const markDone = async (id: number) => {
    const response = await fetch(`http://localhost:3000/todos/${id}/done`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const updatedTodo = await response.json();
    setTodos(
      todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  //console.log(authStateValue.username);

  return (
    <>
    <div>
      <div className="flex justify-between p-4 text-center items-center bg-red-400">
        <h2 className=" font-bold text-gray-700">
          Welcome {authStateValue.username}
        </h2>

        <div>
          <button
            className=" bg-blue-950 p-3 rounded-lg text-white"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <h2 className=" text-[35px] m-4">Todo List</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col m-3 gap-5">
        <input
        className=" rounded-md shadow-xl p-3 "
          type="text"
          {...register("title", {
            required: "Title is required",
          })}
          placeholder="Title"
        />
        {errors.title && (
          <p className="text-red-500"> {`${errors.title.message}`} </p>
        )}

        <input
        className=" rounded-md shadow-xl p-3"
          type="text"
          {...register("description", {
            required: "Description is required",
          })}
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-500"> {`${errors.description.message}`} </p>
        )}
        <button
          disabled={isSubmitting}
          className=" w-[110px] bg-black font-semibold text-white p-3 rounded-md  disabled:bg-slate-500"
          type="submit"
        >
          Add Todo
        </button>

        </div>
      </form>
      <hr className=" border-[1px]" />
      </div>
      <div className=" bg-red-50 flex flex-col-reverse">
      {todos.map((todo) => (
        <div className=" p-3 shadow-sm flex flex-col gap-3" key={todo._id}>
          <div className=" gap-2 font-semibold text-[25px]">{todo.title}</div>
          <p className="text-[20px]">{todo.description}</p>
          <div className="flex gap-2">
          <button className={ ` ${todo.done ? ' bg-green-600' : 'bg-blue-500'} rounded-md p-3 text-white` } onClick={() => markDone(todo._id)}>
            {todo.done ? "Done" : "Mark as Done"}
          </button>
          <button className=" bg-red-600 rounded-md p-3 text-white"
            onClick={async () => {
              const res = await axios.delete(
                `http://localhost:3000/todos/${todo._id}/delete`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              //console.log(res.data);
              setTodos(res.data);
            }}
          >
            Delete
          </button>
          </div>
        </div>
      ))}
      </div>
    
    </>
  );
};
