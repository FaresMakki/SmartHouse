

import React, {useState} from 'react';
import DevicesAttribute from "@/utils-front/DevicesAttributes";
import {AddModel, ADDProduct} from "@/utils-front/ProductsCalls";
import {
    AlertCircle, Antenna,
    BatteryCharging, Bell, Bone, BookOpen,
    CloudLightning, Coffee,
    CornerUpRight,
    Droplet,
    Eye, Filter, Flame, Flashlight, Glasses, Heart,
    Home,
    Key,
    Lightbulb, Music, Radio, ShieldAlert, Signal, Snowflake,
    Sun,
    Target, UtensilsCrossed, Volume2, VolumeX
} from "lucide-react";
import {FormError} from "@/components/form-error";
import { motion, AnimatePresence } from "framer-motion";

import SubCategory from "@/utils-front/Lists";
import { toast } from "sonner";
import {
    Smartphone,
    Tablet,
    Laptop,
    Monitor,
    Tv,
    Router,
    Wifi,
    Camera,
    Printer,
    Keyboard,
    Mouse,
    Gamepad2,
    Headphones,
    Watch,
    Refrigerator,
    WashingMachine,
    Fan,
    Lamp,
    Thermometer,
    Plug,
    Battery,
    Activity,
    Car,
    Shield,
    Lock,
    Wind,
    Cpu,
    HardDrive,
    Link
} from "lucide-react";

const categoryIcons = {
    "Home Appliances": <Home className="text-blue-500 w-6 h-6" />,
    Lighting: <Lightbulb className="text-yellow-500 w-6 h-6" />,
    Connectivity: <Wifi className="text-green-500 w-6 h-6" />,
    Sensors: <Activity className="text-red-500 w-6 h-6" />,
    "Smart Devices": <Smartphone className="text-purple-500 w-6 h-6" />,
};

interface AddProductFormProps {
    setlen:any;
    setspinner:any;
    list:any;
    setlist:any;
    setaddModel:any
    idcat:any;
    subprodid:any;
}
const AddModelForm = ({subprodid,idcat,setaddModel,setlist,setspinner,setlen,list}:AddProductFormProps) => {
    const [Modelname, setModelname] = useState("")
    const [Modeldetail, setModeldetail] = useState("")

    const [deviceAttributesByCategory, setDeviceAttributesByCategory] = useState({});





    const deviceIconList = [
        // **Smart Devices**
        { id: "Smartphone", icon: Smartphone },
        { id: "Tablet", icon: Tablet },
        { id: "Laptop", icon: Laptop },
        { id: "Monitor", icon: Monitor },
        { id: "SmartWatch", icon: Watch },
        { id: "Gamepad", icon: Gamepad2 },
        { id: "Headphones", icon: Headphones },
        { id: "Keyboard", icon: Keyboard },
        { id: "Mouse", icon: Mouse },
        { id: "VR Headset", icon: Activity }, // Approximation for VR gear.
        { id: "E-Reader", icon: BookOpen },

        // **Entertainment**
        { id: "Tv", icon: Tv },
        { id: "Projector", icon: Camera }, // Approximation for now.
        { id: "Speaker", icon: Volume2 },
        { id: "Soundbar", icon: VolumeX },
        { id: "Home Theater", icon: Music },
        { id: "Radio", icon: Radio },

        // **Home Appliances - Kitchen**
        { id: "Refrigerator", icon: Refrigerator },
        { id: "WashingMachine", icon: WashingMachine },
        { id: "Microwave", icon: Thermometer },
        { id: "Oven", icon: Flame },
        { id: "Juicer", icon: Droplet },
        { id: "Blender", icon: Filter },
        { id: "Toaster", icon: Flame },
        { id: "Coffee Maker", icon: Coffee },
        { id: "Dishwasher", icon: Droplet },
        { id: "Pressure Cooker", icon: Thermometer },
        { id: "Rice Cooker", icon: UtensilsCrossed },

        // **Home Appliances - General**
        { id: "Vacuum Cleaner", icon: Wind },
        { id: "Water Heater", icon: Droplet },
        { id: "Fan", icon: Fan },
        { id: "Air Conditioner", icon: Snowflake },
        { id: "Air Purifier", icon: Wind },
        { id: "Heater", icon: Flame },
        { id: "Dehumidifier", icon: Droplet },
        //88888888888888888888888888888888888
        { id: "Humidifier", icon: Droplet },
        { id: "Iron", icon: Shield },
        { id: "Hair Dryer", icon: Wind },
        { id: "Electric Shaver", icon: Shield },
        { id: "Electric Toothbrush", icon: Shield },
        { id: "Scale", icon: Target },
        // **Lighting**
        { id: "Lightbulb", icon: Lightbulb },
        { id: "Ceiling Light", icon: Lightbulb },
        { id: "Desk Lamp", icon: Lamp },
        { id: "Spotlight", icon: Flashlight },
        { id: "LED Strip", icon: Lightbulb },
        { id: "Outdoor Light", icon: Sun },

        // **Network and Connectivity**
        { id: "Router", icon: Router },
        { id: "Switch", icon: HardDrive },
        { id: "Wifi", icon: Wifi },
        { id: "Signal Booster", icon: Signal },
        { id: "Network Amplifier", icon: Antenna },
        { id: "Ethernet Hub", icon: Link },

        // **Security and Monitoring**
        { id: "Camera", icon: Camera },
        { id: "Doorbell Camera", icon: Bell },
        { id: "Motion Sensor", icon: Activity },
        { id: "Smoke Detector", icon: AlertCircle },
        { id: "Glass Break Sensor", icon: ShieldAlert },
        { id: "Door Lock", icon: Lock },
        { id: "Garage Door Opener", icon: Key },

        // **Wearable Devices**
        { id: "Fitness Band", icon: Activity },
        { id: "Medical Monitor", icon: Heart },
        { id: "Smart Glasses", icon: Glasses },

        // **Pet and Feeder Devices**
        { id: "Pet Feeder", icon: Bone },
        { id: "Pet Camera", icon: Camera },
        { id: "Smart Collar", icon: Activity },

        // **Sensors**
        { id: "Temperature Sensor", icon: Thermometer },
        { id: "Humidity Sensor", icon: Droplet },
        { id: "Air Quality Sensor", icon: Wind },
        { id: "Light Sensor", icon: Eye },
        { id: "Proximity Sensor", icon: Target },
        { id: "Tilt Sensor", icon: CornerUpRight },

        // **Energy Management**
        { id: "Smart Plug", icon: Plug },
        { id: "Power Strip", icon: Plug },
        { id: "Solar Panel", icon: Sun },
        { id: "Battery Backup", icon: Battery },
        { id: "Smart Meter", icon: Activity },

        // **Transportation**
        { id: "Car Charger", icon: BatteryCharging },
        { id: "EV Charger", icon: BatteryCharging },
        { id: "Garage Door Opener", icon: Key },

        // **Other Accessories**
        { id: "3D Printer", icon: Printer },
        { id: "Printer", icon: Printer },
        { id: "Scanner", icon: Printer },
        { id: "Drone", icon: Wind },
        { id: "Thermostat", icon: Thermometer },
        { id: "Weather Station", icon: CloudLightning },
    ];




    const handleSubmit = async (e) => {
        e.preventDefault();
        let settings = {}
        for (const category in deviceAttributesByCategory) {
            for (const attribute of deviceAttributesByCategory[category]) {
                if (category === "Sensors") {
                    settings[attribute] = "readOnly"

                } else {
                    settings[attribute] = "readWrite"
                }
            }

        }
        if (!Modelname || Modelname.trim() === "") {
            toast.error("model name is required.");
            return
        }

        if (!Modeldetail || Modeldetail.trim() === "" ) {
            toast.error("model icone is required.");
            return

        }



        //@ts-ignore
        let model = {
            modelName: Modelname ,
            modelDetails: Modeldetail ,
        };
        setaddModel(false)
        setspinner(true)
        setlen(list.length + 1)
        const previousProducts = [...list]

        try {
            const Dev=await AddModel(idcat,subprodid,model)
            setlist([...list, Dev]);

        }catch (err){
            console.error("Error adding product:", err);
            setlist(previousProducts);
        }finally {
            setspinner(false);
        }


    };



    return (
        <form onSubmit={handleSubmit} className="space-y-7">


            <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                    type="text"
                    placeholder="Device Name"
                    value={Modelname}
                    onChange={(e) => setModelname(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg "
                />
                <input
                    type="text"
                    placeholder="Device Name"
                    value={Modeldetail}
                    onChange={(e) => setModeldetail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg "
                />


            </div>


            <div className="flex justify-end gap-4 mt-6">

                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Submit
                </button>
            </div>
        </form>

    );
};

export default AddModelForm;

