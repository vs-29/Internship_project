import { TimeZone } from "../models/TimeZone_model.js";

 export const addTimeZone=async (req,res,next)=>{
    const newTimeZone=new TimeZone(req.body);
  
    try{
     
      const savedTimeZone=await newTimeZone.save();
      res.status(201).json(savedTimeZone);
    }catch(error){
     next(error);
    }
};

export const getTimeZone= async (req,res,next)=>{
  try {
    const timeZones=await TimeZone.find({});
    res.status(200).json(timeZones);
  } catch (error) {
   next(error);
  }

}

export const deleteTimeZone=async(req,res,next)=>{
  try{
     await TimeZone.findByIdAndDelete(req.params.id);
     res.status(200).json("TimeZone Deleted");
  }catch(error){
     next(error);
  }
}

export const updateTimezone=async (req,res,next)=>{
  try {
   
    const updatedTimeZone=await TimeZone.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json(updatedTimeZone);
  } catch (error) {
    next(error);
  }
}




 
