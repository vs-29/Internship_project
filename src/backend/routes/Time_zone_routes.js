import express from "express";
import { addTimeZone,getTimeZone ,deleteTimeZone,updateTimezone} from "../controllers/Time_zone_controller.js";


const router=express.Router();


router.post('/',addTimeZone);
router.get('/',getTimeZone);
router.delete('/:id',deleteTimeZone);
router.put('/:id',updateTimezone);



export default router;
