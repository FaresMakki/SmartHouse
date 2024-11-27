const express=require('express')
const router=express.Router();
const user=require("../Controller/user")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {setcookies} = require("../utils/generateToken");
const {UserAuth} = require("../utils/UserAuth");



router.post("/signup",user.Signup)
router.post("/verify/:activationcode/:id",user.AccountActivation)

router.get("/logout",user.logout)

router.post("/login",user.login)
router.post("/room",UserAuth,user.addroom)



router.delete("/delroom/:id",UserAuth,user.deleteroom)
router.put("/updateroom/:id",UserAuth,user.updateroom)
router.get("/getallroom",UserAuth,user.getAllRooms)
router.post("/adddevice/:modelid/:roomId",UserAuth,user.addRoomDevice)
router.delete("/deletedevice/:deviceId/:roomId",UserAuth,user.deleteRoomDevice)
router.get("/getroomdevices/:roomId",UserAuth,user.getRoomDevices)











router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] , session: false }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/',session: false }), (req, res) => {

    const cookie=setcookies({ _id: req.user._id ,e_mail:req.user.e_mail})

    res.cookie("jwttoken",cookie.value,cookie.config);

    res.redirect('http://localhost:3000/home');
});

module.exports=router