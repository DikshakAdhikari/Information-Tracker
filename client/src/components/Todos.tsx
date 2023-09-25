import axios from 'axios'
import { useState } from 'react'
import { useGetTodos } from '../hook/useGetTodos';
import { useNavigate } from 'react-router-dom';


export const Todos= ()=> {
    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');
    return(
        <>
        <div className="flex flex-col gap-10 ml-5 mt-10">
            <div className='font-bold text-[30px] '>Add Todo</div>
            <div className="flex gap-5">
                <div className="  text-[30px]">Title:</div>
                <input type="text" placeholder='Enter Title' onChange={(e)=> setTitle(e.target.value)} className=" shadow-lg   w-[50%] rounded-md p-2" />
            </div>
            <div className="flex gap-5">
                <div className="  text-[30px]">Description:</div>
                <textarea placeholder='Enter Description' onChange={(e)=> setDescription(e.target.value)} className="p-2 rounded-md shadow-lg" cols={60} rows={5}></textarea>
            </div>
            <button className="w-[200px]" onClick={async ()=> {
                await axios.post('http://localhost:3000/todos/todo',{title,description});
             
                
            }}>Save Todo</button>
    
        </div>
        <hr className="my-10" />


        <div>
            <TodoList />
        </div>
        </>
    )
}
interface Todo{
    id: number;
    title: string;
    description: string;
}


const TodoList = ()=> {
    
    const {loading, todos}= useGetTodos();

    const navigate= useNavigate();
    
    if(loading){
        return(<div>Loading....</div>)
    }
    
    
    
    return (
        <>
        <div className='font-bold text-[30px]  ml-5'>Todo List</div>
        {todos.length === 0 ? <div className='mt-5 ml-3 text-[25px]'>Empty Todo List.. Add Todo!</div> :
        <div className='flex flex-col-reverse'>
            {
            todos.map((todo:Todo)=> (
                <div className='m-5 shadow-lg p-5 flex flex-col gap-3' key={todo.id}>
                    <div className='font-bold text-[25px] '>{todo.title}</div>
                    <div className=' font-bold'>{todo.description}</div>
                    <div className='flex gap-3'>
                    <button onClick={()=>{
                        
                        navigate(`/updateTodo/${todo.id}`);
                       
                        }} >Edit</button>
                    <button onClick={async()=> {
                        try{
                            await axios.delete(`http://localhost:3000/todos/${todo.id}`)
                            
                        }catch(err){
                            console.log(err);
                            
                        }
                       
                    }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
}
        </>

    )
}