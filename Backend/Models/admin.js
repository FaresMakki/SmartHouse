const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    e_mail:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:false
    },


},{timestamps:true})
module.exports=mongoose.model('admin',userSchema)