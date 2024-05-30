import mongoose,{Schema} from "mongoose";
import aggregatePaginate from "mongoose-agregate-paginate-v2";

const UserSchema= new Schema({
 username:{
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


UserSchema.plugin(aggregatePaginate);


export const User=mongoose.model("User",UserSchema);