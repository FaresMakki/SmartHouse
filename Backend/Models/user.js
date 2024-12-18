const mongoose = require("mongoose")
const {boolean} = require("zod");


const deviceSchema = new mongoose.Schema({
    deviceType: {
        type: String,
        required: true
    },
    deviceName: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    Settings: {
        type: {},
        required: true
    },
    picture: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Rooms = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    nature: {
        type: String,
        enum: ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Balcony", "Garage", "Garden", "Office", "Basement", "Attic", "Dining Room", "Hallway", "Laundry Room", "Library", "Lobby", "Pantry", "Playroom", "Studio", "Terrace", "Veranda", "Walk-in Closet", "Workshop"],
        default: "Living Room"
    },
    devices: {
        type: [deviceSchema],
        required: true
    },

}, {timestamps: true})

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Region: {
        type: String,
        required: false
    },
    PhoneNum: {
        type: String,
        required: false
    },
    e_mail: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: false
    },
    PreferredSettings: {
        type: [],
        required: true
    },
    Rooms: {
        type: [Rooms],
        required: true
    },
    PersonalDevices: {
        type: [],
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    oauth: {
        type: Boolean,
        required: true
    }


}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)