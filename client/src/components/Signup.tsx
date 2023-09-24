import axios from 'axios'
import {useState} from 'react'

export const Signup = ()=> {
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
    return(
        <>
        <div className='flex flex-col justify-center items-center text-center my-10 gap-5 h-[80vh]'>
             <div className=''>Signup</div>
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
                    const res= await axios.post('http://localhost:3000/user/signup', {username, password});
                    alert('signup successfully');
                    console.log(res);     
                }catch(err){
                    console.log(err);
                    
                }
               
            }}>Signup</button>


        </div>
</>
    )
}