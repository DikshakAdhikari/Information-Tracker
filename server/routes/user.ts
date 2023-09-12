import express from 'express'
import { User } from '../models/user'
import jwt from 'jsonwebtoken'
import {verifyJwt} from '../middleware/verifyJwt'
const router= express.Router();

router.post('/signup', async(req,res)=> {
    try{
        const {username, password}= req.body;
        const user= await User.findOne({username: username})
      
        if(user){
           return  res.json({message: 'user already exists!'})
        }else{
            const newUser= new User({username,password});
            await newUser.save();
            if(!process.env.SECRET_KEY){
                return res.sendStatus(403);
            }
            const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
            res.json({message: "SignedUp successfully", token})
        }

    }catch(err){
        console.log(err);
    }
});


router.post('/login', async(req,res)=> {
    try{
        const {username} = req.body;
        const user= await User.findOne({username: username})
        if(user){
            if(!process.env.SECRET_KEY){
                return res.sendStatus(403);
            }
            const token= jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})
            return res.json({message: 'Logged in successfully', token})
        }else{
            return res.json({message:'User does not exists'});
        }
    }catch(err){
        console.log(err);
    }
});

router.get('/me', verifyJwt, async (req,res)=> {
    try{
        const userId= req.headers["userId"];
        const user= await User.findById(userId);
        if(!user){
            return res.sendStatus(403);
        }
        const username = user.username
        res.json(username);

    }catch(err){
        console.log("puppu");
        console.log(err);
    }
})



export default router