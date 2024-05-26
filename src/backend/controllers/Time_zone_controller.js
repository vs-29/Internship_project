import { TimeZone } from "../models/TimeZone_model.js";

 export const addTimeZone=async (req,res)=>{
    const newTimeZone=new TimeZone(req.body);
  
    try{
     
      const savedTimeZone=await newTimeZone.save();
      res.status(201).json(savedTimeZone);
    }catch(error){
      res.status(400).json({message:error.message});
    }
};

export const getTimeZone= async (req,res)=>{
  try {
    const timeZones=await TimeZone.find({});
    res.status(200).json(timeZones);
  } catch (error) {
    res.status(500).json({message:error.message});
  }

}




 
