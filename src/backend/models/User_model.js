import mongoose,{Schema} from "mongoose";

const UserSchema= new Schema({
 fullname:{
    type:String,
    required:true,
    unique:true,
 },
 password:{
    type:String,
    required:true,
    unique:true,
 },
 isAdmin:{
    type:Boolean,
    default:false,
 }
},{timestamps:true})





export const User=mongoose.model("User",UserSchema);