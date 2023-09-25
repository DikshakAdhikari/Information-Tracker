import axios from "axios";
import {useState,FC, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";


export const UpdateTodo:FC = () => {
  const {id}= useParams();
   const [title, setTitle]=useState('')
   const [description, setDescription]=useState('')
   const navigate= useNavigate();
    
   useEffect(()=> {
    const fun= async()=> {
        try{
            const todo= await axios.get(`http://localhost:3000/todos/${id}`);
            setTitle(todo.data.title)
            setDescription(todo.data.description)
        }
        catch(err){
            console.log(err);
            
        }

    }
    fun();
   },[])
   
 
    return(
        <>
        <div className="flex flex-col gap-10 ml-5 mt-10">
            <div className="font-bold  text-[35px]">Update Todo</div>
            <div className="flex gap-5">
                <div className="  text-[30px]">Title:</div>
                <input value={title}  type="text" onChange={(e)=> setTitle(e.target.value)} className=" shadow-lg w-[50%] rounded-md p-2" />
            </div>
            <div className="flex gap-5">
                <div className="  text-[30px]">Description:</div>
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)} className=" shadow-lg p-2 rounded-md" cols={60} rows={5}></textarea>
            </div>
            <button className="w-[200px]" onClick={async ()=> {
                try{
                    await axios.patch(`http://localhost:3000/todos/${id}`,{title,description});
                    alert("Todo updated successfully!")
                    navigate('/')
                    

                }catch(err){
                    console.log(err);
                    
                }
                
            }}>Update Todo</button>
    
        </div>
        </>
)
        
}