import { User } from "../models/User_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";


export const register=async(req,res,next)=>{
    try{
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt);

        const normalizedFullName = req.body.fullname.replace(/\s+/g, ' ').toLowerCase(); 
        const existingUser=await User.findOne({ fullname:normalizedFullName });

        if(existingUser)
        {
         return res.status(400).json({error:'Full Name Already exist'});
        }
        const newUser=new User({
           fullname: normalizedFullName ,
           password: hash,
        })
        await newUser.save();
        res.status(201).send(newUser);
    }catch(error){
        next(error);
    }
}

export const login=async(req,res,next)=>{
    try {
     const normalizedFullName = req.body.fullname.replace(/\s+/g, ' ').toLowerCase();
     const user=await User.findOne({ fullname: normalizedFullName });
     if(!user)return(createError(404,"User not found!"));

     const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password);
     if(!isPasswordCorrect)return next(createError(400,"Wrong Password or UserName!"));

     res.status(200).json(user);
    } catch (error) {
        
    }
}

