import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authState";
import axios from "axios";
interface Todo{
    title:string,
    description: string,
    done:boolean,
    _id:number,
}

type Todos= Todo[]


export const ListDo = ()=> {
    const authStateValue = useRecoilValue(authState);
    //console.log(authStateValue);
    
    const navigate= useNavigate()
    //console.log(todos);

    const [todos, setTodos] = useState<Todos>([]);

   
    useEffect(() => {
        const getTodos = async () => {
            try{
              
                const token= localStorage.getItem('token');
                
                const response = await fetch('http://localhost:3000/todos/todo', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const data = await response.json();
            if(typeof token === null || typeof token === undefined ||!token ){
                    navigate('/')
            }else{
                setTodos(data);
            }
            }catch(err){
                
                console.log(err);
                navigate('/')
                
            }
            
        };
        getTodos();
    }, []);

    
    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todos/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
        setTitle('')
        setDescription('')
    };

    const markDone = async (id:number) => {
        const response = await fetch(`http://localhost:3000/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };




    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },

    } =useForm();


    <form>
          <div>
            <div style={{display: "flex"}}>
                <h2>Welcome {authStateValue.username}</h2>
                <div style={{marginTop: 25, marginLeft: 20}}>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                       navigate('/signin');
                    }}>Logout</button>
                </div>
            </div>
            <h2>Todo List</h2>
            <input required={true} type='text' {...register('title')} placeholder='Title' />
            <input required={true} type='text' {...register('description')} placeholder='Description' />
            <button onClick={addTodo}>Add Todo</button>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                    <button onClick={async()=> {
                        const res = await axios.delete(`http://localhost:3000/todos/${todo._id}/delete`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
                        //console.log(res.data);
                        setTodos(res.data)
                        
                    }}>Delete</button>
                </div>
            ))}
        </div>
        
    </form>

}