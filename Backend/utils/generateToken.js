const jwt=require("jsonwebtoken")
const { serialize } = require("cookie")

 function generatejwt(jwtpayload){
    const privatekey=process.env.JWT_SECRET
    return jwt.sign(jwtpayload, privatekey, {expiresIn: "1d"})
}
 function setcookies(jwtpayload){
    const token=generatejwt(jwtpayload)



     return {config:{
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         path: "/",
         maxAge: 60 * 60 * 24 * 30 * 1000,
     },value:token};

}
module.exports = { setcookies };
