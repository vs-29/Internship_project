

import dotenv from "dotenv";
import express from "express";
import ConnectDb from "./db/index.js";
import Time_zone_routes from "./routes/Time_zone_routes.js"
import cors from "cors";


dotenv.config({path:'./.env'});

const app=express();

app.use(express.json());
app.use(cors());

app.use('/api',Time_zone_routes);

app.get("/",(req,res)=>{
    res.send("Hello!!");
})
ConnectDb().then(()=>{
    try{
        console.log(process.env.PORT);
        app.listen(process.env.PORT|| 3000,()=>{
            console.log(`http://localhost:${process.env.PORT}`);
        })
    }catch(err){
      console.log("failed to connect to db",err);
    }

})











