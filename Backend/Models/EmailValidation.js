const mongoose=require("mongoose")

const EmailValidation=new mongoose.Schema({
    ValidationCode:{
        type:String,
        required:true

    },
    Userid:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
    }


})
module.exports=mongoose.model('emailvalidation',EmailValidation)