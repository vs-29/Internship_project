import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User_controller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


const router=express.Router();

router.get('/checkauthentication',verifyToken,(req,res,next)=>{
    res.send("hello User logged-In!")
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user/admin logged in with authorized update/delete permissions of his/her account")
})

router.get("/checkadmin",verifyAdmin,(req,res,next)=>{
    res.send("hello Admin, logged in with authorized update/delete permissions of all accounts")
})

router.get('/',verifyAdmin,getUsers);
router.get('/:id',verifyUser,getUser);
router.delete('/:id',verifyUser,deleteUser);
router.put('/:id',verifyUser,updateUser);



export default router;