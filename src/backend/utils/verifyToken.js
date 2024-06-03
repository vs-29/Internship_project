import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    // console.info(req.headers);
    if(!token){
        return next(createError(401,"You are not authenticated User!!"))
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err)return next(createError(403,"Token is not valid!"));
        req.user=user;

        res.locals.user=token;
        next();
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,(err)=>{
        if(err)return next(createError(403,"you are not authenticated"))
        if(req.user.id==req.params.id || req.user.isAdmin){
            next(); 
        }else{
         return next(createError(403,"You are not authorized!"))
        }
    })
}


export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,(err)=>{

        if(req.user && req.user.isAdmin){
           next();
        }else if(!req.user){
        //  return next(createError(403,"You are not authorized!"))
        return res.status(403).json({message:"not valid ",user:res.locals.user});
        }else if(!req.user.isAdmin){
            return res.status(403).json({message:"you are not authorized"});
        }
        
    })
}