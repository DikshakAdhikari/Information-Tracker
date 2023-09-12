import express, { Request,Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyJwt= async (req:Request,res:Response,next:NextFunction)=> {

    try{
        const data= req.headers.authorization;
      //  console.log(data);
        if(data){
            const token= data.split(" ")[1];
         //console.log(token);
        
         if(!process.env.SECRET_KEY){
            return res.sendStatus(403);
         }

        jwt.verify(token,process.env.SECRET_KEY , (err, payload)=> {
            if(err){
                return res.status(400).json(`damnnnnnnn ${err}`);
            }
            if(!payload){
                return res.sendStatus(403)
            }
            if(typeof payload === "string"){
                return res.sendStatus(403)
            }
            
            req.headers["userId"]= payload.id;
            next();
        })
        }else{
            res.sendStatus(401);
        }
        
    }catch(err){
      
        console.log(err);
    }
}

