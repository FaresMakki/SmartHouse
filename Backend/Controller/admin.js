const adminmodule = require("../Models/admin");
const bcrypt = require("bcryptjs");
const {loginschema} = require("../utils/ValidationShemas");
const {setcookies} = require("../utils/generateToken");

exports.logout=async (req,res)=> {
    try{
        res.clearCookie('jwttoken');
        res.status(200).json({message:"logout"})
    } catch (err) {
        res.status(500).json({ error:"internal server error"});
    }
}

exports.Signup=async (req,res)=> {
    try{
        const model = {
            FirstName:"makki",
            LastName: "fares",
            e_mail: "faresmakki21@gmail.com",
            Password:bcrypt.hashSync("fares000"),
        };

        const admin = new adminmodule(model);
        const savedadmin = await admin.save();

        res.status(200).json({message:"admin added successfully"});

    } catch (err) {
            res.status(400).json({ err });
        }
    }

exports.login=async (req,res)=> {
    try{


        const validation=loginschema.safeParse({
            e_mail:req.body.e_mail,
            Password:req.body.Password
        })
        if (!validation.success){
            //@ts-ignore

            return res.status(400).json({message:validation.error.errors[0].message})

        }


        const admin=await adminmodule.findOne({e_mail:req.body.e_mail})

        if(!admin){
            return res.status(400).json({message:"invalid e-mail or password"});

        }
        const ispasswordmatch= await bcrypt.compare(req.body.Password,admin.Password)

        if(!ispasswordmatch){
            return res.status(400).json({message:"invalid e-mail or password"});
        }

        const jwtpayload={
            _id:admin._id,
            e_mail:admin.e_mail,
            FirstName:admin.FirstName,
            LastName:admin.LastName,
        }
        const cookie=setcookies(jwtpayload)

        res.status(200).cookie("jwttoken", cookie.value,cookie).json({ message: "admin authenticated successfully" });

    } catch (err) {
        res.status(400).json({ err });
    }
}




