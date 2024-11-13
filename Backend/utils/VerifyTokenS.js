const jwt = require("jsonwebtoken");

 function verifyTokenS(request){
    try {

        const jwttoken=request.cookies.jwttoken
        if(!jwttoken)return null;
        return jwt.verify(jwttoken, process.env.JWT_Secret )
    }catch (err)
    {return null}
}
module.exports = {  verifyTokenS };
