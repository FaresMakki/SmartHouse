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
const {transformSettings} = require("../utils/settingsmanagment");

exports.Signup=async (req,res)=> {
    try{

        const userexist=await usermodel.findOne({e_mail:req.body.e_mail})
        if(userexist){
            return res.status(400).json({error:'User already exists.'});

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
            return res.status(400).json({error:validation.error.errors[0].message});
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

        res.status(200).json({success: "User added successfully."});

    } catch (err) {
        res.status(400).json({error: err });
    }
}
exports.logout=async (req,res)=> {
    try{
        res.clearCookie('jwttoken');
        res.status(200).json({success: "Logout"})
    } catch (err) {
        res.status(500).json({error: "Internal server error."});
    }
}
exports.login=async (req,res)=> {
    try{
        const validation=loginschema.safeParse({
            e_mail:req.body.e_mail,
            Password:req.body.Password
        })
        if (!validation.success){
            return res.status(400).json({error:validation.error.errors[0].message})
        }
        const user=await usermodel.findOne({e_mail:req.body.e_mail})

        if(!user){
            return res.status(400).json({error: "Invalid e-mail or password."});
        }

        const ispasswordmatch= await bcrypt.compare(req.body.Password,user.Password)

        if(!ispasswordmatch){
            return res.status(400).json({error: "Invalid e-mail or password."});
        }
        const jwtpayload={
            _id:user._id,
            e_mail:user.e_mail,
            FirstName:user.FirstName,
            LastName:user.LastName,
            Region:user.Region

        }
        const cookie=setcookies(jwtpayload)

        res.status(200).cookie("jwttoken", cookie.value,cookie.config).json({ success: "User authenticated successfully." });

    } catch (err) {
        res.status(400).json({ error: err });
    }
}
exports.AccountActivation=async (req,res)=> {
    try{

        EmailValidation.findOne({ValidationCode:req.params.activationcode}).then(async (input) => {
                if (!input) {
                    await usermodel.findOne({_id: req.params.id}).then(async (user) => {
                        if (!user) {
                            return res.status(404).json({error: "Account does not exist"})
                        } else {
                            activationCode = uuidv4()

                            const Vmodel = {
                                ValidationCode: activationCode,
                                Userid: user._id,

                            };

                            const Emailvalidation = new EmailValidation(Vmodel);

                            const savedEV = await Emailvalidation.save();

                            sendConfirmationEmail(user.e_mail, activationCode, user._id)
                            return res.status(404).json({error: "Token expire wi send you a new Verification email"})

                        }

                    }).catch((err) => {
                        return res.status(500).json({error: err})


                    })

                } else {

                    const x=await usermodel.updateOne(
                        {_id: req.params.id},
                        {$set: {isActive: true}}
                    )
                    return res.status(200).json({success: "account activated successfully you can go an login"});


                }
            }
        )

    } catch (err) {
        return  res.status(400).json({ err });
    }
}
exports.addroom = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const room = {
            name: req.body.name,
            icon: req.body.icon,
            nature: req.body.type,
            devices: [],
        };

        user.Rooms.push(room);

        const savedUser = await user.save();

        const addedRoom = savedUser.Rooms[savedUser.Rooms.length - 1];

        res.status(200).json({ success: "Room added successfully", room: addedRoom });
    } catch (err) {
        res.status(400).json({ err });
    }
};

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
                    "subDevice.settings": 1,
                    "subDevice.models.modelName": 1,
                    "subDevice.models.modelDetails": 1,
                    "subDevice.models.picture": 1,

                }
            }
        ]);
        console.log("-------------------------------------------------------------------------------------------------------")
        console.log(prod[0].subDevice)

        console.log("-------------------------------------------------------------------------------------------------------")

        const user=await usermodel.findOne({_id:req.user._id})

        const transformed = transformSettings(prod[0].subDevice.settings);

        const device={
            deviceType: prod[0].category,
            deviceName: prod[0].subDevice.name,
            modelName: prod[0].subDevice.models.modelName,
            Settings: transformed,
            picture: prod[0].subDevice.picture

        }

        const room = user.Rooms.find(Rooms => Rooms._id.toString() === req.params.roomId);
        console.log(1)

        if (!room) return res.status(404).json({ error: "Room not found." });
        room.devices.push(device);
        console.log(1)

        await user.save();

        res.status(200).json({ success: "Device added successfully." });

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err });
    }
}

exports.deleteroom = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        const roomIndex = user.Rooms.findIndex(room => room._id.toString() === req.params.id);

        if (roomIndex === -1) {
            return res.status(404).json({ error: "Room not found." });
        }

        user.Rooms.splice(roomIndex, 1);

        await user.save();

        res.status(200).json({ success: "Room deleted successfully." });
    } catch (err) {
        res.status(400).json({ err });
    }
};
exports.getAllRooms = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        res.status(200).json({ success: user.Rooms });
    } catch (err) {
        res.status(400).json({error:  err });
    }
};
exports.getRoomsbyid = async (req, res) => {
    const roomid = req.params.roomid; // Get the room ID from the request parameters

    try {
        // Find the user and filter the specific room
        const user = await usermodel.findOne(
            { _id: req.user._id, "Rooms._id": roomid }, // Ensure the user has the room
            { "Rooms.$": 1 } // Return only the matched room
        );

        if (!user || !user.Rooms || user.Rooms.length === 0) {
            return res.status(404).json({ error: "Room not found." });
        }

        // Return the specific room
        res.status(200).json({ success: user.Rooms[0] });
    } catch (err) {
        res.status(500).json({ error: "Internal server error.", details: err.message });
    }
};

// exports.updateroom = async (req, res) => {
//     try {
//         const user = await usermodel.findOne({ _id: req.user._id });
//
//         if (!user) {
//             return res.status(400).json({ error: "User does not exist." });
//         }
//
//         const room = user.Rooms.find(room => room._id.toString() === req.params.id);
//
//         if (!room) {
//             return res.status(404).json({ error: "Room not found." });
//         }
//
//
//         room.name = req.body.name;
//
//         await user.save();
//
//         res.status(200).json({ success: "Room updated successfully." });
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// };

exports.updateroom = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        const room = user.Rooms.find(room => room._id.toString() === req.params.id);

        if (!room) {
            return res.status(404).json({ error: "Room not found." });
        }

        if (req.body.name) {
            room.name = req.body.name;
        }
        if (req.body.icon) {
            room.icon = req.body.icon;
        }
        if (req.body.nature) {
            const allowedNatures = [
                "Living Room", "Bedroom", "Kitchen", "Bathroom", "Balcony", "Garage",
                "Garden", "Office", "Basement", "Attic", "Dining Room", "Hallway",
                "Laundry Room", "Library", "Lobby", "Pantry", "Playroom", "Studio",
                "Terrace", "Veranda", "Walk-in Closet", "Workshop"
            ];

            if (allowedNatures.includes(req.body.nature)) {
                room.nature = req.body.nature;
            } else {
                return res.status(400).json({ error: "Invalid room nature provided." });
            }
        }
        if(req.body.devices){
            room.devices = req.body.devices;
        }

        await user.save();

        res.status(200).json({ success: "Room updated successfully." });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while updating the room.", details: err });
    }
};

exports.deleteRoomDevice = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });
        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        const room = user.Rooms.find(room => room._id.toString() === req.params.roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found." });
        }

        const deviceIndex = room.devices.findIndex(device => device._id.toString() === req.params.deviceId);

        if (deviceIndex === -1) {
            return res.status(404).json({ error: "Device not found." });
        }

        room.devices.splice(deviceIndex, 1);

        await user.save();

        res.status(200).json({ success: "Device deleted successfully." });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};
exports.getRoomDevices = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user._id });

        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        const room = user.Rooms.find(room => room._id.toString() === req.params.roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found." });
        }

        res.status(200).json({ success: room.devices });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};




exports.addPersonelDevice=async (req,res)=> {
    try{
        const modelId = req.params.modelid;
        const prod  = await productmodel.aggregate([
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
                    "subDevice.settings": 1,
                    "subDevice.models.modelName": 1,
                    "subDevice.models.modelDetails": 1,
                    "subDevice.models.picture": 1,

                }
            }
        ]);


        const user=await usermodel.findOne({_id:req.user._id})

        const transformed = transformSettings(prod[0].subDevice.settings);

        const device={
            deviceType: prod[0].category,
            deviceName: prod[0].subDevice.name,
            modelName: prod[0].subDevice.models.modelName,
            Settings: transformed,
            picture: prod[0].subDevice.picture

        }

        user.PersonalDevices.push(device);


        await user.save();

        res.status(200).json({ success: "Device added successfully." });

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err });
    }
}
exports.getPersonelDevices=async (req,res)=> {
    try{


        const user=await usermodel.findOne({_id:req.user._id})

        res.status(200).json({ success: "Device added successfully.",devices:user.PersonalDevices });

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err });
    }
}





exports.toggleDeviceStatus = async (req, res) => {
    try {
        const { roomId, deviceId } = req.params;
        const userId = req.user._id;

        // Find the user, room, and device
        const user = await usermodel.findOne(
            {
                _id: userId,
                "Rooms._id": roomId,
                "Rooms.devices._id": deviceId
            },
            { "Rooms.$": 1 }
        );

        if (!user || user.Rooms.length === 0) {
            return res.status(404).json({ message: "Room or device not found." });
        }

        // Locate the device in the room
        const room = user.Rooms[0];
        const device = room.devices.find(dev => dev._id.toString() === deviceId);

        if (!device) {
            return res.status(404).json({ message: "Device not found." });
        }

        // Toggle the device status
        const newStatus = device.status === "on" ? "off" : "on";

        // Update the specific device in the database
        await usermodel.updateOne(
            {
                _id: userId,
                "Rooms._id": roomId,
                "Rooms.devices._id": deviceId
            },
            { $set: { "Rooms.$[room].devices.$[device].status": newStatus } },
            { arrayFilters: [{ "room._id": roomId }, { "device._id": deviceId }] }
        );

        res.status(200).json({
            message: `Device status toggled to ${newStatus}`,
            device: { ...device.toObject(), status: newStatus }
        });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};








