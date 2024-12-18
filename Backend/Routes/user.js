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



router.post("/delroom/:id",UserAuth,user.deleteroom)
router.post("/updateroom/:id",UserAuth,user.updateroom)
router.get("/getallroom",UserAuth,user.getAllRooms)
router.get("/getroombyid/:roomid",UserAuth,user.getRoomsbyid)
router.post("/adddevice/:modelid/:roomId",UserAuth,user.addRoomDevice)
router.post("/deletedevice/:deviceId/:roomId",UserAuth,user.deleteRoomDevice)
router.get("/getroomdevices/:roomId",UserAuth,user.getRoomDevices)
router.post("/addPersonelDevice/:modelid",UserAuth,user.addPersonelDevice)
router.post("/getPersonelDevice",UserAuth,user.getPersonelDevices)











router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] , session: false }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/',session: false }), (req, res) => {

    const cookie=setcookies({ _id: req.user._id ,e_mail:req.user.e_mail})

    res.cookie("jwttoken",cookie.value,cookie.config);

    res.redirect('http://localhost:3000/home');
});

module.exports=router