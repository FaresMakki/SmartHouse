import React, {useState} from 'react';
import DevicesAttribute from "@/utils-front/DevicesAttributes";
import {ADDProduct, UpdateProduct} from "@/utils-front/ProductsCalls";
import {
    Activity,
    AlertCircle,
    Antenna,
    Battery, BatteryCharging,
    Bell,
    Bone,
    Camera,
    Car, CloudLightning,
    Coffee, CornerUpRight,
    Cpu,
    Droplet,
    Eye,
    Fan,
    Filter,
    Flame,
    Flashlight,
    Gamepad2,
    Glasses,
    HardDrive,
    Headphones,
    Heart,
    Home,
    Key,
    Keyboard,
    Lamp,
    Laptop,
    Lightbulb,
    Link,
    Lock,
    Monitor,
    Mouse,
    Music,
    Plug,
    Printer,
    Radio,
    Refrigerator,
    Router,
    Shield,
    ShieldAlert,
    Signal,
    Smartphone,
    Snowflake,
    Sun,
    Tablet,
    Target,
    Thermometer,
    Tv,
    UtensilsCrossed,
    Volume2,
    VolumeX,
    WashingMachine,
    Watch,
    Wifi,
    Wind
} from "lucide-react";
import {FormError} from "@/components/form-error";
import SubCategory from "@/utils-front/Lists";
import {AnimatePresence, motion} from "framer-motion";

const categoryIcons = {
    "Home Appliances": <Home className="text-blue-500 w-6 h-6" />,
    Lighting: <Lightbulb className="text-yellow-500 w-6 h-6" />,
    Connectivity: <Wifi className="text-green-500 w-6 h-6" />,
    Sensors: <Activity className="text-red-500 w-6 h-6" />,
    "Smart Devices": <Smartphone className="text-purple-500 w-6 h-6" />,
};

interface UpdateSubCatFormProps {
    setspinner:any;
    list:any;
    setlist:any;
    setUpdateModel:any
    idcat:any
    productid:any
}
const UpdateSubCatForm = ({setUpdateModel,setlist,setspinner,list,idcat,productid}:UpdateSubCatFormProps) => {
    const [deviceName, setDeviceName] = useState("");
    // const [categoryDescription, setCategoryDescription] = useState("");
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
        const iconName = deviceIconList.find((device) => device.id === selectedIcon)?.icon?.render.name;


        let Device = {
            ...(deviceName && { name: deviceName }),
            ...(iconName && { picture: iconName }),
            ...(Object.keys(settings).length > 0 && { settings: settings })
        };
        setUpdateModel(false)
        setspinner(true)
        // setlen(list.length + 1)
        const previousProducts = [...list]


        try {
            const Dev=await UpdateProduct(idcat,productid,Device)

            //@ts-ignore
            setlist(list.map(item => item._id === Dev._id ? Dev : item));


        }catch (err){
            setlist(previousProducts);
        }finally {
            setspinner(false);
            // setUpdateModel(false)
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
            {/*        {showIconDropdown && (*/}
            {/*            <motion.div*/}
            {/*                initial={{opacity: 0, y: -20}}*/}
            {/*                animate={{opacity: 1, y: 0}}*/}
            {/*                exit={{opacity: 0, y: -20}}*/}
            {/*                transition={{duration: 0.3, ease: "easeInOut"}}*/}
            {/*                className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-10">*/}
            {/*                {deviceIconList.map((device) => (*/}
            {/*                    <button*/}
            {/*                        key={device.id}*/}
            {/*                        type="button"*/}
            {/*                        onClick={() => {*/}
            {/*                            setSelectedIcon(device.id);*/}
            {/*                            setShowIconDropdown(false);*/}
            {/*                        }}*/}
            {/*                        className={`flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 ${*/}
            {/*                            selectedIcon === device.id ? "bg-green-200" : ""*/}
            {/*                        }`}*/}
            {/*                    >*/}
            {/*                        <device.icon className="w-6 h-6 text-gray-700"/>*/}
            {/*                        <span className="text-xs">{device.id}</span>*/}
            {/*                    </button>*/}
            {/*                ))}*/}
            {/*            </motion.div>*/}
            {/*        )}*/}
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
                                {deviceIconList.map((device, index) => (
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

export default UpdateSubCatForm;