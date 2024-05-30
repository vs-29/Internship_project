import express from "express";
import { addTimeZone,getTimeZone ,deleteTimeZone,updateTimezone} from "../controllers/Time_zone_controller.js";


const router=express.Router();

router.post('/timezone',addTimeZone);
router.get('/timezone',getTimeZone);
router.delete('/timezone/:id',deleteTimeZone);
router.put('/timezone/:id',updateTimezone);

export default router;
