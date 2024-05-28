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

export const deleteTimeZone=async(req,res)=>{
  try{
     await TimeZone.findByIdAndDelete(req.params.id);
     res.status(200).json("TimeZone Deleted");
  }catch(error){
     res.status(500).json({message:error.message});
  }
}

export const updateTimezone=async (req,res)=>{
  try {
    const updatedTimeZone=await TimeZone.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json("TimeZone updated Succesfully");
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}




 
