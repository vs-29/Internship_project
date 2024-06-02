import { User } from "../models/User_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";


export const register=async(req,res,next)=>{
    try{
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt);

        const normalizedFullName = req.body.fullname.replace(/\s+/g, ' ').trim().toLowerCase(); 
        const existingUser=await User.findOne({ fullname:normalizedFullName });

        if(existingUser)
        {
         return res.status(400).json({error:'User Already exist'});
        }
        const newUser=new User({
            
           fullname: normalizedFullName ,
           password: hash,
           isAdmin:req.body.isAdmin|| false,
        })
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        next(error);
    }
}

export const login=async(req,res,next)=>{
    try {
     const normalizedFullName = req.body.fullname.replace(/\s+/g, ' ').trim().toLowerCase();
     const user=await User.findOne({ fullname: normalizedFullName });
     if(!user){
        return next(createError(404,"User not found!"));
     }
     const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password);
     if(!isPasswordCorrect)return next(createError(400,"Wrong Password or UserName!"));

     const token=jwt.sign({id:user._id,isAdmin:user.isAdmin },process.env.JWT)
     const {password,...otherDetails}=user._doc
     res.cookie("access_token",token,{
        httpOnly:true,
     }).status(200).json({...otherDetails});
    } catch (error) {
        next(error);
    }
}

