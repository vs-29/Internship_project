import mongoose from "mongoose";
import { Db_Name } from "../constants.js";

const ConnectDb= async ()=>{
  
    try{
    //  console.log(process.env.Mongo_URL);
      const connection_instance= await mongoose.connect(`${process.env.Mongo_URL}/${Db_Name}`);
      console.log(`\n Mongo Db connected !! Db Host:${connection_instance.connection.host}`);
    }catch(error){
       console.log("Mongo Db Connection Failed",error);
       process.exit(1);
    }
}


export default ConnectDb;