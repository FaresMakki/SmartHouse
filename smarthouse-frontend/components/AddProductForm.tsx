import React, {useState} from 'react';
import DevicesAttribute from "@/utils-front/DevicesAttributes";
import {ADDProduct} from "@/utils-front/ProductsCalls";
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
}
const AddProductForm = ({setaddModel,setlist,setspinner,setlen,list}:AddProductFormProps) => {
    const [deviceName, setDeviceName] = useState("");
    const [currentcategory, setCurrentcategory] = useState(0);

    const [deviceAttributesByCategory, setDeviceAttributesByCategory] = useState({});

    function AddToAttributeList(attr) {
        const currentCategory = DevicesAttribute[currentcategory].category;

        setDeviceAttributesByCategory((prev) => {
            const updatedCategoryAttributes = prev[currentCategory] || [];
            const isAlreadyChecked = updatedCategoryAttributes.includes(attr);

            // Toggle the attribute
            const newAttributes = isAlreadyChecked
                ? updatedCategoryAttributes.filter((item) => item !== attr) // Remove if already checked
                : [...updatedCategoryAttributes, attr]; // Add if not checked

            return {
                ...prev,
                [currentCategory]: newAttributes,
            };
        });
        console.log(deviceAttributesByCategory);
    }

    function isAttributeChecked(attr) {
        const currentCategory = DevicesAttribute[currentcategory].category;
        return deviceAttributesByCategory[currentCategory]?.includes(attr) || false;
    }



    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [showIconDropdown, setShowIconDropdown] = useState(false);



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
        if (!deviceName || deviceName.trim() === "") {
            toast.error("Device name is required.");
            return
        }

        if (!selectedIcon ) {
            toast.error("Device icone is required.");
            return

        }

        if (!settings || Object.keys(settings).length === 0) {
            toast.error("Settings are required.");
            return
        }





            let Device = {
            name: deviceName ,
            picture: selectedIcon ,
            settings: settings
        };
        setaddModel(false)
        setspinner(true)
        setlen(list.length + 1)
        const previousProducts = [...list]

        try {
            const Dev=await ADDProduct(Device)
            setlist([...list, Dev]);
            console.log("Product added successfully");

        }catch (err){
            console.error("Error adding product:", err);
            setlist(previousProducts);
        }finally {
            setspinner(false);
        }


    };




    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <input
                type="text"
                placeholder="Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg "
            />


            {/*<div className="relative">*/}
            {/*    <button*/}
            {/*        type="button"*/}
            {/*        onClick={() => setShowIconDropdown(!showIconDropdown)}*/}
            {/*        className="w-full p-2 bg-gray-100 border rounded-lg"*/}
            {/*    >*/}
            {/*        {selectedIcon ? `Selected: ${selectedIcon}` : "Choose Icon"}*/}
            {/*    </button>*/}
            {/*    <AnimatePresence>*/}
            {/*    {showIconDropdown && (*/}
            {/*        <motion.div*/}
            {/*            initial={{ opacity: 0, y: -20 }}*/}
            {/*            animate={{ opacity: 1, y: 0 }}*/}
            {/*            exit={{ opacity: 0, y: -20 }}*/}
            {/*            transition={{ duration: 0.3, ease: "easeInOut" }}*/}
            {/*            className="absolute top-full mt-2  w-full bg-white border rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-10">*/}
            {/*            {deviceIconList.map((device) => (*/}
            {/*                <button*/}
            {/*                    key={device.id}*/}
            {/*                    type="button"*/}
            {/*                    onClick={() => {*/}
            {/*                        setSelectedIcon(device.id);*/}
            {/*                        setShowIconDropdown(false);*/}
            {/*                    }}*/}
            {/*                    className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 ${*/}
            {/*                        selectedIcon === device.id ? "bg-green-200" : ""*/}
            {/*                    }`}*/}
            {/*                >*/}
            {/*                    <device.icon className="w-6 h-6 text-gray-700"/>*/}
            {/*                    <span className="text-xs">{device.id}</span>*/}
            {/*                </button>*/}
            {/*            ))}*/}
            {/*        </motion.div>*/}
            {/*    )}*/}
            {/*    </AnimatePresence>*/}

            {/*</div>*/}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setShowIconDropdown(!showIconDropdown)}
                    className="w-full p-2 bg-gray-100 border rounded-lg"
                >
                    {selectedIcon ? `Selected: ${selectedIcon}` : "Choose Icon"}
                </button>
                <AnimatePresence>
                    {showIconDropdown && (
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg p-3 z-10"
                            style={{
                                maxHeight: "300px", // Hauteur maximale visible
                                overflowY: "auto", // Activer le scroll vertical
                            }}
                        >
                            <div className="grid grid-cols-4 gap-2">
                                {deviceIconList.map((device,index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => {
                                            setSelectedIcon(device.id);
                                            setShowIconDropdown(false);
                                        }}
                                        className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 ${
                                            selectedIcon === device.id ? "bg-green-200" : ""
                                        }`}
                                    >
                                        <device.icon className="w-6 h-6 text-gray-700"/>
                                        <span className="text-xs">{device.id}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <nav className="flex justify-center gap-6">
                {DevicesAttribute.map((category, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setCurrentcategory(index)}
                        className={`flex flex-col items-center p-2 ${
                            currentcategory === index ? "bg-orange-100" : "hover:bg-gray-200"
                        } rounded-lg`}
                    >
                        <span>{categoryIcons[category.category]}</span>
                        <span className="text-xs text-gray-700">{category.category}</span>
                    </button>
                ))}
            </nav>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {DevicesAttribute[currentcategory]?.commonAttributes.map((attr, idx) => (
                    <div
                        key={`${DevicesAttribute[currentcategory].category}-${attr}`}

                        className="flex items-center p-2 border border-gray-300 rounded-lg"
                    >
                        <input
                            id={`${DevicesAttribute[currentcategory].category}-${attr}`}
                            name={`${DevicesAttribute[currentcategory].category}-${attr}`}
                            type="checkbox"
                            checked={isAttributeChecked(attr)}
                            onChange={() => AddToAttributeList(attr)}
                            className="w-4 h-4 text-blue-500"
                        />
                        <label
                            htmlFor={`${DevicesAttribute[currentcategory].category}-${attr}`}
                            className="ml-2 text-sm text-gray-700"
                        >
                            {attr}
                        </label>
                    </div>
                ))}
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

export default AddProductForm;


// import React, {useState} from 'react';
// import DevicesAttribute from "@/utils-front/DevicesAttributes";
// import {ADDProduct} from "@/utils-front/ProductsCalls";
// import { Home, Lightbulb} from "lucide-react";
// import {FormError} from "@/components/form-error";
// import { motion, AnimatePresence } from "framer-motion";
//
// import SubCategory from "@/utils-front/Lists";
// import { toast } from "sonner";
// import {
//     Smartphone,
//     Tablet,
//     Laptop,
//     Monitor,
//     Tv,
//     Router,
//     Wifi,
//     Camera,
//     Printer,
//     Keyboard,
//     Mouse,
//     Gamepad2,
//     Headphones,
//     Watch,
//     Refrigerator,
//     WashingMachine,
//     Fan,
//     Lamp,
//     Thermometer,
//     Plug,
//     Battery,
//     Activity,
//     Car,
//     Shield,
//     Lock,
//     Wind,
//     Cpu,
//     HardDrive,
// } from "lucide-react";
//
// const categoryIcons = {
//     "Home Appliances": <Home className="text-blue-500 w-6 h-6" />,
//     Lighting: <Lightbulb className="text-yellow-500 w-6 h-6" />,
//     Connectivity: <Wifi className="text-green-500 w-6 h-6" />,
//     Sensors: <Activity className="text-red-500 w-6 h-6" />,
//     "Smart Devices": <Smartphone className="text-purple-500 w-6 h-6" />,
// };
//
// interface AddProductFormProps {
//     setlen:any;
//     setspinner:any;
//     list:any;
//     setlist:any;
//     setaddModel:any
// }
// const AddProductForm = ({setaddModel,setlist,setspinner,setlen,list}:AddProductFormProps) => {
//     const [deviceName, setDeviceName] = useState("");
//     const [currentcategory, setCurrentcategory] = useState(0);
//
//     const [deviceAttributesByCategory, setDeviceAttributesByCategory] = useState({});
//
//     function AddToAttributeList(attr) {
//         const currentCategory = DevicesAttribute[currentcategory].category;
//
//         setDeviceAttributesByCategory((prev) => {
//             const updatedCategoryAttributes = prev[currentCategory] || [];
//             const isAlreadyChecked = updatedCategoryAttributes.includes(attr);
//
//             // Toggle the attribute
//             const newAttributes = isAlreadyChecked
//                 ? updatedCategoryAttributes.filter((item) => item !== attr) // Remove if already checked
//                 : [...updatedCategoryAttributes, attr]; // Add if not checked
//
//             return {
//                 ...prev,
//                 [currentCategory]: newAttributes,
//             };
//         });
//         console.log(deviceAttributesByCategory);
//     }
//
//     function isAttributeChecked(attr) {
//         const currentCategory = DevicesAttribute[currentcategory].category;
//         return deviceAttributesByCategory[currentCategory]?.includes(attr) || false;
//     }
//
//
//
//     const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
//     const [showIconDropdown, setShowIconDropdown] = useState(false);
//
//
//
//     const deviceIconList = [
//         { id: "Smartphone", icon: Smartphone },
//         { id: "Tablet", icon: Tablet },
//         { id: "Laptop", icon: Laptop },
//         { id: "Monitor", icon: Monitor },
//         { id: "Tv", icon: Tv },
//         { id: "Router", icon: Router },
//         { id: "Wifi", icon: Wifi },
//         { id: "Camera", icon: Camera },
//         { id: "Printer", icon: Printer },
//         { id: "Keyboard", icon: Keyboard },
//         { id: "Mouse", icon: Mouse },
//         { id: "Gamepad", icon: Gamepad2 },
//         { id: "Headphones", icon: Headphones },
//         { id: "SmartWatch", icon: Watch },
//         { id: "Refrigerator", icon: Refrigerator },
//         { id: "WashingMachine", icon: WashingMachine },
//         { id: "Fan", icon: Fan },
//         { id: "Lamp", icon: Lamp },
//         { id: "Thermometer", icon: Thermometer },
//         { id: "Plug", icon: Plug },
//         { id: "Battery", icon: Battery },
//         { id: "Activity", icon: Activity },
//         { id: "Car", icon: Car },
//         { id: "Shield", icon: Shield },
//         { id: "Lock", icon: Lock },
//         { id: "Wind", icon: Wind },
//         { id: "Cpu", icon: Cpu },
//         { id: "HardDrive", icon: HardDrive },
//     ];
//
//
//
//
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let settings = {}
//         for (const category in deviceAttributesByCategory) {
//             for (const attribute of deviceAttributesByCategory[category]) {
//                 if (category === "Sensors") {
//                     settings[attribute] = "readOnly"
//
//                 } else {
//                     settings[attribute] = "readWrite"
//                 }
//             }
//
//         }
//         if (!deviceName || deviceName.trim() === "") {
//             toast.error("Device name is required.");
//             return
//         }
//
//         if (!selectedIcon ) {
//             toast.error("Device icone is required.");
//             return
//
//         }
//
//         if (!settings || Object.keys(settings).length === 0) {
//             toast.error("Settings are required.");
//             return
//         }
//
//
//
//
//
//             let Device = {
//             name: deviceName ,
//             picture: selectedIcon ,
//             settings: settings
//         };
//         setaddModel(false)
//         setspinner(true)
//         setlen(list.length + 1)
//         const previousProducts = [...list]
//
//         try {
//             const Dev=await ADDProduct(Device)
//             setlist([...list, Dev]);
//             console.log("Product added successfully");
//
//         }catch (err){
//             console.error("Error adding product:", err);
//             setlist(previousProducts);
//         }finally {
//             setspinner(false);
//         }
//
//
//     };
//
//
//
//
//     return (
//         <form onSubmit={handleSubmit} className="space-y-7">
//             <input
//                 type="text"
//                 placeholder="Device Name"
//                 value={deviceName}
//                 onChange={(e) => setDeviceName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg "
//             />
//
//
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setShowIconDropdown(!showIconDropdown)}
//                     className="w-full p-2 bg-gray-100 border rounded-lg"
//                 >
//                     {selectedIcon ? `Selected: ${selectedIcon}` : "Choose Icon"}
//                 </button>
//                 <AnimatePresence>
//                 {showIconDropdown && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-10">
//                         {deviceIconList.map((device) => (
//                             <button
//                                 key={device.id}
//                                 type="button"
//                                 onClick={() => {
//                                     setSelectedIcon(device.id);
//                                     setShowIconDropdown(false);
//                                 }}
//                                 className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 ${
//                                     selectedIcon === device.id ? "bg-green-200" : ""
//                                 }`}
//                             >
//                                 <device.icon className="w-6 h-6 text-gray-700"/>
//                                 <span className="text-xs">{device.id}</span>
//                             </button>
//                         ))}
//                     </motion.div>
//                 )}
//                 </AnimatePresence>
//
//             </div>
//
//
//             <nav className="flex justify-center gap-6">
//                 {DevicesAttribute.map((category, index) => (
//                     <button
//                         type="button"
//                         key={index}
//                         onClick={() => setCurrentcategory(index)}
//                         className={`flex flex-col items-center p-2 ${
//                             currentcategory === index ? "bg-orange-100" : "hover:bg-gray-200"
//                         } rounded-lg`}
//                     >
//                         <span>{categoryIcons[category.category]}</span>
//                         <span className="text-xs text-gray-700">{category.category}</span>
//                     </button>
//                 ))}
//             </nav>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//                 {DevicesAttribute[currentcategory]?.commonAttributes.map((attr, idx) => (
//                     <div
//                         key={`${DevicesAttribute[currentcategory].category}-${attr}`}
//
//                         className="flex items-center p-2 border border-gray-300 rounded-lg"
//                     >
//                         <input
//                             id={`${DevicesAttribute[currentcategory].category}-${attr}`}
//                             name={`${DevicesAttribute[currentcategory].category}-${attr}`}
//                             type="checkbox"
//                             checked={isAttributeChecked(attr)}
//                             onChange={() => AddToAttributeList(attr)}
//                             className="w-4 h-4 text-blue-500"
//                         />
//                         <label
//                             htmlFor={`${DevicesAttribute[currentcategory].category}-${attr}`}
//                             className="ml-2 text-sm text-gray-700"
//                         >
//                             {attr}
//                         </label>
//                     </div>
//                 ))}
//             </div>
//
//
//             <div className="flex justify-end gap-4 mt-6">
//
//                 <button
//                     type="submit"
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                 >
//                     Submit
//                 </button>
//             </div>
//         </form>
//
//     );
// };
//
// export default AddProductForm;
































































































// import React, {useState} from 'react';
// import DevicesAttribute from "@/utils-front/DevicesAttributes";
// import {ADDProduct} from "@/utils-front/ProductsCalls";
// import {Activity, Home, Lightbulb, Smartphone, Wifi} from "lucide-react";
// import {FormError} from "@/components/form-error";
// import SubCategory from "@/utils-front/Lists";
// import { toast } from "sonner";
// import {
//     Smartphone,
//     Tablet,
//     Laptop,
//     Monitor,
//     Tv,
//     Router,
//     Wifi,
//     Camera,
//     Printer,
//     Keyboard,
//     Mouse,
//     Gamepad2,
//     Headphones,
//     Watch,
//     Refrigerator,
//     WashingMachine,
//     Fan,
//     Lamp,
//     Thermometer,
//     Plug,
//     Battery,
//     Activity,
//     Car,
//     Shield,
//     Lock,
//     Wind,
//     Cpu,
//     HardDrive,
// } from "lucide-react";
//
// const categoryIcons = {
//     "Home Appliances": <Home className="text-blue-500 w-6 h-6" />,
//     Lighting: <Lightbulb className="text-yellow-500 w-6 h-6" />,
//     Connectivity: <Wifi className="text-green-500 w-6 h-6" />,
//     Sensors: <Activity className="text-red-500 w-6 h-6" />,
//     "Smart Devices": <Smartphone className="text-purple-500 w-6 h-6" />,
// };
//
// interface AddProductFormProps {
//     setlen:any;
//     setspinner:any;
//     list:any;
//     setlist:any;
//     setaddModel:any
// }
// const AddProductForm = ({setaddModel,setlist,setspinner,setlen,list}:AddProductFormProps) => {
//     const [deviceName, setDeviceName] = useState("");
//     const [deviceImage, setDeviceImage] = useState("");
//     const [currentcategory, setCurrentcategory] = useState(0);
//
//     const [deviceAttributesByCategory, setDeviceAttributesByCategory] = useState({});
//
//     function AddToAttributeList(attr) {
//         const currentCategory = DevicesAttribute[currentcategory].category;
//
//         setDeviceAttributesByCategory((prev) => {
//             const updatedCategoryAttributes = prev[currentCategory] || [];
//             const isAlreadyChecked = updatedCategoryAttributes.includes(attr);
//
//             // Toggle the attribute
//             const newAttributes = isAlreadyChecked
//                 ? updatedCategoryAttributes.filter((item) => item !== attr) // Remove if already checked
//                 : [...updatedCategoryAttributes, attr]; // Add if not checked
//
//             return {
//                 ...prev,
//                 [currentCategory]: newAttributes,
//             };
//         });
//         console.log(deviceAttributesByCategory);
//     }
//
//     function isAttributeChecked(attr) {
//         const currentCategory = DevicesAttribute[currentcategory].category;
//         return deviceAttributesByCategory[currentCategory]?.includes(attr) || false;
//     }
//
//
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let settings = {}
//         for (const category in deviceAttributesByCategory) {
//             for (const attribute of deviceAttributesByCategory[category]) {
//                 if (category === "Sensors") {
//                     settings[attribute] = "readOnly"
//
//                 } else {
//                     settings[attribute] = "readWrite"
//                 }
//             }
//
//         }
//         if (!deviceName || deviceName.trim() === "") {
//              toast.error("Device name is required.");
//             return
//         }
//
//          if (!deviceImage || deviceImage.trim() === "") {
//              toast.error("Device image is required.");
//             return
//
//         }
//
//         if (!settings || Object.keys(settings).length === 0) {
//              toast.error("Settings are required.");
//             return
//         }
//
//
//
//
//
//
//         let Device = {
//              name: deviceName ,
//              picture: deviceImage ,
//             settings: settings
//         };
//         setaddModel(false)
//         setspinner(true)
//         setlen(list.length + 1)
//         const previousProducts = [...list]
//
//         try {
//             const Dev=await ADDProduct(Device)
//             setlist([...list, Dev]);
//             console.log("Product added successfully");
//
//         }catch (err){
//             console.error("Error adding product:", err);
//             setlist(previousProducts);
//         }finally {
//             setspinner(false);
//         }
//
//
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className="space-y-7">
//             <input
//                 type="text"
//                 placeholder="Device Name"
//                 value={deviceName}
//                 onChange={(e) => setDeviceName(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-lg "
//             />
//
//
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setShowIconDropdown(!showIconDropdown)}
//                     className="w-full p-2 bg-gray-100 border rounded-lg"
//                 >
//                     {selectedIcon ? `Selected: ${selectedIcon}` : "Choose Icon"}
//                 </button>
//
//                 {showIconDropdown && (
//                     <div
//                         className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-10">
//                         {deviceIconList.map((device) => (
//                             <button
//                                 key={device.id}
//                                 type="button"
//                                 onClick={() => {
//                                     setSelectedIcon(device.id);
//                                     setShowIconDropdown(false);
//                                 }}
//                                 className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 ${
//                                     selectedIcon === device.id ? "bg-green-200" : ""
//                                 }`}
//                             >
//                                 <device.icon className="w-6 h-6 text-gray-700"/>
//                                 <span className="text-xs">{device.id}</span>
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>
//
//
//             <nav className="flex justify-center gap-6">
//                 {DevicesAttribute.map((category, index) => (
//                     <button
//                         type="button"
//                         key={index}
//                         onClick={() => setCurrentcategory(index)}
//                         className={`flex flex-col items-center p-2 ${
//                             currentcategory === index ? "bg-orange-100" : "hover:bg-gray-200"
//                         } rounded-lg`}
//                     >
//                         <span>{categoryIcons[category.category]}</span>
//                         <span className="text-xs text-gray-700">{category.category}</span>
//                     </button>
//                 ))}
//             </nav>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//                 {DevicesAttribute[currentcategory]?.commonAttributes.map((attr, idx) => (
//                     <div
//                         key={`${DevicesAttribute[currentcategory].category}-${attr}`}
//
//                         className="flex items-center p-2 border border-gray-300 rounded-lg"
//                     >
//                         <input
//                             id={`${DevicesAttribute[currentcategory].category}-${attr}`}
//                             name={`${DevicesAttribute[currentcategory].category}-${attr}`}
//                             type="checkbox"
//                             checked={isAttributeChecked(attr)}
//                             onChange={() => AddToAttributeList(attr)}
//                             className="w-4 h-4 text-blue-500"
//                         />
//                         <label
//                             htmlFor={`${DevicesAttribute[currentcategory].category}-${attr}`}
//                             className="ml-2 text-sm text-gray-700"
//                         >
//                             {attr}
//                         </label>
//                     </div>
//                 ))}
//             </div>
//
//
//             <div className="flex justify-end gap-4 mt-6">
//
//                 <button
//                     type="submit"
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                 >
//                     Submit
//                 </button>
//             </div>
//         </form>
//
//     );
// };
//
// export default AddProductForm;













//
// import React, { useState } from "react";
// import DevicesAttribute from "@/utils-front/DevicesAttributes";
// import { ADDProduct } from "@/utils-front/ProductsCalls";

// const categoryIcons = {
//     "Home Appliances": <Refrigerator className="text-blue-500 w-6 h-6" />,
//     Lighting: <Lamp className="text-yellow-500 w-6 h-6" />,
//     Connectivity: <Wifi className="text-green-500 w-6 h-6" />,
//     Sensors: <Activity className="text-red-500 w-6 h-6" />,
//     "Smart Devices": <Smartphone className="text-purple-500 w-6 h-6" />,
// };
//
// const deviceIconList = [
//     { id: "Smartphone", icon: Smartphone },
//     { id: "Tablet", icon: Tablet },
//     { id: "Laptop", icon: Laptop },
//     { id: "Monitor", icon: Monitor },
//     { id: "Tv", icon: Tv },
//     { id: "Router", icon: Router },
//     { id: "Wifi", icon: Wifi },
//     { id: "Camera", icon: Camera },
//     { id: "Printer", icon: Printer },
//     { id: "Keyboard", icon: Keyboard },
//     { id: "Mouse", icon: Mouse },
//     { id: "Gamepad", icon: Gamepad2 },
//     { id: "Headphones", icon: Headphones },
//     { id: "SmartWatch", icon: Watch },
//     { id: "Refrigerator", icon: Refrigerator },
//     { id: "WashingMachine", icon: WashingMachine },
//     { id: "Fan", icon: Fan },
//     { id: "Lamp", icon: Lamp },
//     { id: "Thermometer", icon: Thermometer },
//     { id: "Plug", icon: Plug },
//     { id: "Battery", icon: Battery },
//     { id: "Activity", icon: Activity },
//     { id: "Car", icon: Car },
//     { id: "Shield", icon: Shield },
//     { id: "Lock", icon: Lock },
//     { id: "Wind", icon: Wind },
//     { id: "Cpu", icon: Cpu },
//     { id: "HardDrive", icon: HardDrive },
// ];
//
// interface AddProductFormProps {
//     setlen: any;
//     setspinner: any;
//     list: any;
//     setlist: any;
//     setaddModel: any;
// }
//
// const AddProductForm = ({
//                             setaddModel,
//                             setlist,
//                             setspinner,
//                             setlen,
//                             list,
//                         }: AddProductFormProps) => {
//     const [deviceName, setDeviceName] = useState("");
//     const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
//     const [showIconDropdown, setShowIconDropdown] = useState(false);
//     const [currentCategory, setCurrentCategory] = useState(0);
//     const [deviceAttributesByCategory, setDeviceAttributesByCategory] = useState(
//         {}
//     );
//
//     function AddToAttributeList(attr) {
//         const category = DevicesAttribute[currentCategory].category;
//         setDeviceAttributesByCategory((prev) => {
//             const updatedCategory = prev[category] || [];
//             const newAttributes = updatedCategory.includes(attr)
//                 ? updatedCategory.filter((item) => item !== attr)
//                 : [...updatedCategory, attr];
//             return { ...prev, [category]: newAttributes };
//         });
//     }
//
//     function isAttributeChecked(attr) {
//         const category = DevicesAttribute[currentCategory].category;
//         return deviceAttributesByCategory[category]?.includes(attr) || false;
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!deviceName) return toast.error("Device name is required.");
//         if (!selectedIcon) return toast.error("Please choose an icon.");
//
//         let settings = {};
//         for (const category in deviceAttributesByCategory) {
//             for (const attr of deviceAttributesByCategory[category]) {
//                 settings[attr] = category === "Sensors" ? "readOnly" : "readWrite";
//             }
//         }
//
//         let device = { name: deviceName, icon: selectedIcon, settings };
//         setspinner(true);
//         setlen(list.length + 1);
//         const previousList = [...list];
//         try {
//             const newDevice = await ADDProduct(device);
//             setlist([...list, newDevice]);
//         } catch (error) {
//             setlist(previousList);
//         } finally {
//             setspinner(false);
//             setaddModel(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-5 relative">
//             <input
//                 type="text"
//                 placeholder="Device Name"
//                 value={deviceName}
//                 onChange={(e) => setDeviceName(e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//             />
//
//
//
//             <div className="relative">
//                 <button
//                     type="button"
//                     onClick={() => setShowIconDropdown(!showIconDropdown)}
//                     className="w-full p-2 bg-gray-100 border rounded-lg"
//                 >
//                     {selectedIcon ? `Selected: ${selectedIcon}` : "Choose Icon"}
//                 </button>
//
//                 {showIconDropdown && (
//                     <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-10">
//                         {deviceIconList.map((device) => (
//                             <button
//                                 key={device.id}
//                                 type="button"
//                                 onClick={() => {
//                                     setSelectedIcon(device.id);
//                                     setShowIconDropdown(false);
//                                 }}
//                                 className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 ${
//                                     selectedIcon === device.id ? "bg-green-200" : ""
//                                 }`}
//                             >
//                                 <device.icon className="w-6 h-6 text-gray-700" />
//                                 <span className="text-xs">{device.id}</span>
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//             <nav className="flex justify-center gap-4">
//                 {DevicesAttribute.map((category, index) => (
//                     <button
//                         type="button"
//                         key={index}
//                         onClick={() => setCurrentCategory(index)}
//                         className={`p-2 rounded-lg ${
//                             currentCategory === index
//                                 ? "bg-orange-100"
//                                 : "hover:bg-gray-200"
//                         }`}
//                     >
//                         <span>{categoryIcons[category.category]}</span>
//                         <span className="text-xs">{category.category}</span>
//                     </button>
//                 ))}
//             </nav>
//
//             <div className="grid grid-cols-2 gap-3">
//                 {DevicesAttribute[currentCategory]?.commonAttributes.map((attr) => (
//                     <label key={attr} className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             checked={isAttributeChecked(attr)}
//                             onChange={() => AddToAttributeList(attr)}
//                         />
//                         {attr}
//                     </label>
//                 ))}
//             </div>
//
//             <button
//                 type="submit"
//                 className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//             >
//                 Submit
//             </button>
//         </form>
//     );
// };
//
// export default AddProductForm;


