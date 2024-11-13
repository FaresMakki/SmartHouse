const mongoose=require("mongoose")
require("dotenv").config()
const connectionsParams={
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true
}
const uri=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cezmx.mongodb.net/SmartHouse`
const connexion=mongoose.connect(uri,connectionsParams).then(()=>console.log("connected successfully to cloud atlas")).catch((err)=>console.log(err))


module.exports=connexion