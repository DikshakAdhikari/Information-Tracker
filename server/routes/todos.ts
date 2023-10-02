import express from 'express'
import { Todo } from '../models/todos'
import {verifyJwt} from '../middleware/verifyJwt'
const router= express.Router();

router.post('/todo', verifyJwt, async (req,res)=> {
    try{
        const {title, description}= req.body;
        const done= false
        const userId= req.headers["userId"];
        const obj= {title, description,done,userId};
        const todos = new Todo(obj);
        await todos.save();
        res.json(todos);
    }catch(err){
        res.status(403).json(err)
    }
});

router.delete('/:courseId/delete', verifyJwt, async (req,res)=> {
    try{
        const {courseId}= req.params;
        const exceptDelete= await Todo.findByIdAndDelete(courseId);
        //console.log(exceptDelete); //displays what element we deleted
        const userId= req.headers["userId"];
        console.log(userId);
        
        const todos= await Todo.find({});
        const userTodos= todos.filter((todo)=> todo.userId === userId);
        // console.log(userTodos);
        
        res.json(userTodos)
        
    }catch(err){
        res.json(err);
    }
})

router.get('/todo', verifyJwt, async(req,res)=> {
    try{
         const todos= await Todo.find({});
        //console.log(todos);
        const userId= req.headers["userId"];
       // console.log(userId);
        const userTodos =  todos.filter((t)=> t.userId === userId)
        //console.log(userTodos);
        res.json({userTodos});

    }catch(err){
        res.json(err);
    }
})

router.patch('/:courseId/done', verifyJwt, async (req,res)=> {
    try{
        const {courseId} = req.params;
        const userId= req.headers["userId"];
        const updatedTodo= await Todo.findOneAndUpdate({_id:courseId, userId:userId}, {done: true}, {new:true});
        if(updatedTodo){
            return res.json(updatedTodo);
        }else
        return res.json({message:'Todo not found'})
    }catch(err){
        res.status(403).json(err)
    }
});




export default router