const {sendConfirmationEmail} = require("../utils/nodemailer");
const bcrypt=require("bcryptjs")
const {v4:uuidv4}=require("uuid")
const {createUserschema, loginschema} = require("../utils/ValidationShemas");
const usermodel=require("../Models/user")
const productmodel=require("../Models/produit")
const EmailValidation=require("../Models/EmailValidation")
const {setcookies} = require("../utils/generateToken");
// const {verifyTokenS} = require("../utils/VerifyTokenS");
const {Types} = require("mongoose");

exports.Signup=async (req,res)=> {
    try{

        const userexist=await usermodel.findOne({e_mail:req.body.e_mail})
        if(userexist){
            return res.status(400).json({message:'this user is already exist'});

        }





        const model = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Region: req.body.Region,
            PhoneNum: req.body.PhoneNum,
            e_mail: req.body.e_mail,
            Password: req.body.Password,
            PreferredSettings: [],
            Rooms: [],
            PersonalDevices: [],
            isActive: false,
            oauth:false
        };

        const validation=createUserschema.safeParse(model)
        if (!validation.success){
            return res.status(400).json({message:validation.error.errors[0].message});

        }

        model.Password=bcrypt.hashSync(model.Password)
        let activationCode=uuidv4()
        const user = new usermodel(model);
        const savedUser = await user.save();
        sendConfirmationEmail(model.e_mail,activationCode,savedUser._id)

        const Vmodel = {
            ValidationCode: activationCode,
            Userid: savedUser._id,

        };
        const Emailvalidation = new EmailValidation(Vmodel);
        const savedEV = await Emailvalidation.save();

        res.status(200).json({message:"user added successfully"});

    } catch (err) {
        res.status(400).json({ err });
    }
}
exports.logout=async (req,res)=> {
    try{
        res.clearCookie('jwttoken');
        res.status(200).json({message:"logout"})
    } catch (err) {
        res.status(500).json({ error:"internal server error"});
    }
}
exports.login=async (req,res)=> {
    try{


        const validation=loginschema.safeParse({
            e_mail:req.body.e_mail,
            Password:req.body.Password
        })
        if (!validation.success){

            return res.status(400).json({message:validation.error.errors[0].message})

        }


        const user=await usermodel.findOne({e_mail:req.body.e_mail})

        if(!user){
            return res.status(400).json({message:"invalid e-mail or password"});

        }
        const ispasswordmatch= await bcrypt.compare(req.body.Password,user.Password)

        if(!ispasswordmatch){
            return res.status(400).json({message:"invalid e-mail or password"});
        }
        const jwtpayload={
            _id:user._id,
            e_mail:user.e_mail,
            FirstName:user.FirstName,
            LastName:user.LastName,
            Region:user.Region

        }

        const cookie=setcookies(jwtpayload)

        res.status(200).cookie("jwttoken", cookie.value,cookie.config).json({ message: "user authenticated successfully" });

    } catch (err) {
        res.status(400).json({ err });
    }
}
exports.AccountActivation=async (req,res)=> {
    try{


        EmailValidation.findOne({ValidationCode:req.params.activationcode}).then(async (input) => {
                if (!input) {
                    await usermodel.findOne({_id: req.params.id}).then(async (user) => {
                        if (!user) {
                            return res.status(404).json({message: "Account does not exist"})
                        } else {
                            activationCode = uuidv4()

                            const Vmodel = {
                                ValidationCode: activationCode,
                                Userid: user._id,

                            };

                            const Emailvalidation = new EmailValidation(Vmodel);

                            const savedEV = await Emailvalidation.save();

                            sendConfirmationEmail(user.e_mail, activationCode, user._id)
                            return res.status(404).json({message: "Token expire wi send you a new Verification email"})

                        }

                    }).catch((err) => {
                        return res.status(500).json({message: "Internal server error", error: err})


                    })

                } else {

                    const x=await usermodel.updateOne(
                        {_id: req.params.id},
                        {$set: {isActive: true}}
                    )
                    return res.status(200).json({message: "account activated successfully you can go an login"});


                }
            }
        )

    } catch (err) {
        return  res.status(400).json({ err });
    }
}
exports.addroom=async (req,res)=> {
    try{
        const user=await usermodel.findOne({_id:req.user._id})

        if (!user){
            return res.status(400).json({message:"user does not exist"})

        }
        const room = {
            name:req.body.name,
            devices:[]
        }
        user.Rooms.push(room)
        user.save()



        res.status(200).json({ message: "Room added successfully" });

    } catch (err) {
        res.status(400).json({ err });
    }
}
exports.addRoomDevice=async (req,res)=> {
    try{



        const modelId = req.params.modelid;

        const prod = await productmodel.aggregate([
            {
                $match: {
                    "subDevices.models._id": new Types.ObjectId(modelId)
                }
            },
            {
                $project: {
                    category: 1,
                    description: 1,
                    subDevice: {
                        $filter: {
                            input: "$subDevices",
                            as: "subDevice",
                            cond: {
                                $in: [new Types.ObjectId(modelId), "$$subDevice.models._id"]
                            }
                        }
                    }
                }
            },
            {
                $unwind: "$subDevice"
            },
            {
                $unwind: "$subDevice.models"
            },
            {
                $match: {
                    "subDevice.models._id": new Types.ObjectId(modelId)
                }
            },
            {
                $project: {
                    category: 1,
                    description: 1,
                    "subDevice.name": 1,
                    "subDevice.picture": 1,
                    "subDevice.models.modelName": 1,
                    "subDevice.models.modelDetails": 1,
                    "subDevice.models.picture": 1
                }
            }
        ]);
        const user=await usermodel.findOne({_id:req.user._id})


        const device={
            deviceType: prod[0].category,
            deviceName: prod[0].subDevice.name,
            modelId: prod[0].subDevice.models.modelName,
            status: "off",
            connectionType:"Bluetooth",
            batteryLevel:"100%",
            powerConsumption:"20W",
            lastMaintenance: "----",
        }
        const room = user.Rooms.find(Rooms => Rooms._id.toString() === req.params.roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });
        room.devices.push(device);
        await user.save();

        res.status(200).json({ message:"device added successfully" });

    } catch (err) {
        console.log(err)
        res.status(400).json({ err });
    }
}
exports.deleteroom = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const roomIndex = user.Rooms.findIndex(room => room._id.toString() === req.params.id);

        if (roomIndex === -1) {
            return res.status(404).json({ message: "Room not found" });
        }

        user.Rooms.splice(roomIndex, 1);

        await user.save();

        res.status(200).json({ message: "Room deleted successfully" });
    } catch (err) {
        res.status(400).json({ err });
    }
};
exports.getAllRooms = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        res.status(200).json({ rooms: user.Rooms });
    } catch (err) {
        res.status(400).json({ err });
    }
};

exports.updateroom = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const room = user.Rooms.find(room => room._id.toString() === req.params.id);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        room.name = req.body.name;

        await user.save();

        res.status(200).json({ message: "Room updated successfully" });
    } catch (err) {
        res.status(400).json({ err });
    }
};
exports.deleteRoomDevice = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const room = user.Rooms.find(room => room._id.toString() === req.params.roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const deviceIndex = room.devices.findIndex(device => device._id.toString() === req.params.deviceId);

        if (deviceIndex === -1) {
            return res.status(404).json({ message: "Device not found" });
        }

        room.devices.splice(deviceIndex, 1);

        await user.save();

        res.status(200).json({ message: "Device deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};
exports.getRoomDevices = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const room = user.Rooms.find(room => room._id.toString() === req.params.roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ devices: room.devices });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};











