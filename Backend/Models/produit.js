const mongoose=require("mongoose")

const modelsSchema = new mongoose.Schema({
    modelName: { type: String, required: true },
    modelDetails: { type: String, required: true },
    picture: { type: String },
},{timestamps: true});

const subDeviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    models: [modelsSchema],
    description: { type: String },
    picture:{ type: String },
    settings: { type: {} },

},{timestamps: true});



const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    description: { type: String },
    subDevices: [subDeviceSchema],
},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);
