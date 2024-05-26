import mongoose,{Schema} from "mongoose";

const TimeZoneSchema= new Schema(
    {
        ZoneName:{
            type:String,
            required:true,
            uppercase:true,
        },
        Zone_offset:{
            type:String,
            required:true,
        }
        
    },{
        timestamps:true,
    }
)

export const TimeZone=mongoose.model("TimeZone",TimeZoneSchema);