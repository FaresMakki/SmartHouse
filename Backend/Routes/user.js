const express=require('express')
const router=express.Router();
const user=require("../Controller/user")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {setcookies} = require("../utils/generateToken");
const {UserAuth} = require("../utils/UserAuth");



router.post("/signup",user.Signup)
router.post("/verify/:activationcode/:id",user.AccountActivation)
router.get("/login",user.login)
router.get("/logout",user.logout)
router.get("/room",UserAuth,user.addroom)
router.get("/get/:modelid/:roomId",UserAuth,user.addRoomDevice)











router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] , session: false }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/',session: false }), (req, res) => {

    const cookie=setcookies({ _id: req.user._id ,e_mail:req.user.e_mail})

    res.cookie("jwttoken",cookie.value,cookie);

    res.redirect('http://localhost:3000/protected');
});

module.exports=router