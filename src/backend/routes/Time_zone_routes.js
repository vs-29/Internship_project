import express from "express";
import { addTimeZone,getTimeZone } from "../controllers/Time_zone_controller.js";


const router=express.Router();

router.post('/timezone',addTimeZone);
router.get('/timezone',getTimeZone);


export default router;
