

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
    subprodid:any;
    idcat:any;
}
const AddModelForm = ({subprodid,idcat,setaddModel,setlist,setspinner,setlen,list}:AddProductFormProps) => {
    const [Modelname, setModelname] = useState("")
    const [Modeldetail, setModeldetail] = useState("")










    const handleSubmit = async (e) => {

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
                    placeholder="ModelName"
                    value={Modelname}
                    onChange={(e) => setModelname(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg "
                />
                <input
                    type="text"
                    placeholder="Model detail"
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

