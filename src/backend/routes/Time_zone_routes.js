import express from "express";
import { addTimeZone,getTimeZone ,deleteTimeZone,updateTimezone} from "../controllers/Time_zone_controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router=express.Router();


router.post('/',verifyAdmin,addTimeZone);
router.get('/',getTimeZone);
router.delete('/:id',verifyAdmin,deleteTimeZone);
router.put('/:id',verifyAdmin,updateTimezone);



export default router;
