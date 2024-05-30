import { User } from "../models/User_model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"


const register=async(req,res)=>{
    try{
        var salt=bcrypt.genSaltSync(10);
        var hash=bcrypt.hashSync(req.body.password,salt);

        const newUser=new User({
            ...req.body,password:hash,
        })
        await newUser.save();
        res.status(201).send("user created successfully");
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const login=async()=>{
    try {
        
    } catch (error) {
        
    }
}

