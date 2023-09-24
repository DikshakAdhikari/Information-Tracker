import axios from 'axios'
import React from 'react';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Signin = ()=> {
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
  
    return(
        <>
        <div className='flex flex-col justify-center items-center text-center my-10 gap-5 h-[80vh]'>
             <div className=''>Signin</div>
            <div className='flex gap-3'>
                <div>Username: </div>
                <input type="text" onChange={(e)=> setUsername(e.target.value)} />
            </div>
        
            <div className='flex gap-3'>
                <div>Password: </div>
                <input type="password" onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <button onClick={async()=> {
                try{
                    const res= await axios.post('http://localhost:3000/user/login', {username, password});
                    alert('signedin successfully');
                
                    console.log(res);     
                }catch(err){
                    console.log(err);
                    
                }
               
            }}>Signin</button>

        </div>
</>
    )
}