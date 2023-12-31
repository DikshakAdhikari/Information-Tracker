import { useState, useEffect } from 'react';

import {useRecoilValue} from "recoil";
import { useNavigate } from 'react-router-dom';
import { authState } from '../store/authState';
import axios from 'axios';

interface Todo{
    title:string,
    description: string,
    done:boolean,
    _id:number,
}

type Todos= Todo[]



const List = () => {
    const [todos, setTodos] = useState<Todos>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);
   
    
    const navigate= useNavigate()
    //console.log(todos);

   
    useEffect(() => {
        const getTodos = async () => {
            try{
              
                const token= localStorage.getItem('token');
                
                const response = await fetch('https://list-task-lemon.vercel.app/todos/todo', {
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
        const response = await fetch('https://list-task-lemon.vercel.app/todos/todo', {
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
        const response = await fetch(`https://list-task-lemon.vercel.app/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    return (
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
            <h2>Task Tracker</h2>
            <input required={true} type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <input required={true} type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button onClick={addTodo}>Add Task</button>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                    <button onClick={async()=> {
                        const res = await axios.delete(`https://list-task-lemon.vercel.app/todos/${todo._id}/delete`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
                        //console.log(res.data);
                        setTodos(res.data)
                        
                    }}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default List;