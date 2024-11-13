const mongoose=require("mongoose")

const modelsSchema = new mongoose.Schema({
    modelName: { type: String, required: true },
    modelDetails: { type: String, required: true },
    picture: { type: String },
});

const subDeviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    models: [modelsSchema],
    picture:{ type: String }
});



const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    description: { type: String },
    subDevices: [subDeviceSchema],
});

module.exports = mongoose.model('Product', productSchema);
