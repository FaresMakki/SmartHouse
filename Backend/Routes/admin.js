const express=require('express')
const router=express.Router();
const admin=require("../Controller/admin")


router.post("/signup",admin.Signup)
router.get("/login",admin.login)
router.get("/logout",admin.logout)

module.exports=router