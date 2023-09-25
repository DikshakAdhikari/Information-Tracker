import axios from 'axios';
import {useState, useEffect} from 'react'

interface Todo{
    id: number;
    title: string;
    description: string;
}

type todoArray= Todo[];

export const useGetTodos = ()=> {
    const [todos, setTodos]= useState<todoArray>([]);
    const [loading, setLoading]= useState<boolean>(true)
   
    

    useEffect(()=> {
        const fun = async ()=> {
            try{
                const res= await axios.get<todoArray>('http://localhost:3000/todos');     
               
                setTodos(res.data);
                setLoading(false)
            }catch(err){
                setLoading(true)
                console.log(err);
                
            }
        }
        fun();
    },[todos])

    return{
        loading,
        todos:todos,
      
    }
}