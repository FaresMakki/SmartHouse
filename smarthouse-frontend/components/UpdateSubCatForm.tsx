import React, {useState} from 'react';
import DevicesAttribute from "@/utils-front/DevicesAttributes";
import {ADDProduct, UpdateProduct} from "@/utils-front/ProductsCalls";
import {
    Activity, Battery,
    Camera, Car, Cpu, Fan, Gamepad2, HardDrive, Headphones,
    Home, Keyboard, Lamp,
    Laptop,
    Lightbulb, Lock,
    Monitor, Mouse, Plug,
    Printer, Refrigerator,
    Router, Shield,
    Smartphone,
    Tablet, Thermometer,
    Tv, WashingMachine, Watch,
    Wifi, Wind
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
        console.log(deviceAttributesByCategory);
    }

    function isAttributeChecked(attr) {
        const currentCategory = DevicesAttribute[currentcategory].category;
        return deviceAttributesByCategory[currentCategory]?.includes(attr) || false;
    }





    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [showIconDropdown, setShowIconDropdown] = useState(false);



    const deviceIconList = [
        { id: "Smartphone", icon: Smartphone },
        { id: "Tablet", icon: Tablet },
        { id: "Laptop", icon: Laptop },
        { id: "Monitor", icon: Monitor },
        { id: "Tv", icon: Tv },
        { id: "Router", icon: Router },
        { id: "Wifi", icon: Wifi },
        { id: "Camera", icon: Camera },
        { id: "Printer", icon: Printer },
        { id: "Keyboard", icon: Keyboard },
        { id: "Mouse", icon: Mouse },
        { id: "Gamepad", icon: Gamepad2 },
        { id: "Headphones", icon: Headphones },
        { id: "SmartWatch", icon: Watch },
        { id: "Refrigerator", icon: Refrigerator },
        { id: "WashingMachine", icon: WashingMachine },
        { id: "Fan", icon: Fan },
        { id: "Lamp", icon: Lamp },
        { id: "Thermometer", icon: Thermometer },
        { id: "Plug", icon: Plug },
        { id: "Battery", icon: Battery },
        { id: "Activity", icon: Activity },
        { id: "Car", icon: Car },
        { id: "Shield", icon: Shield },
        { id: "Lock", icon: Lock },
        { id: "Wind", icon: Wind },
        { id: "Cpu", icon: Cpu },
        { id: "HardDrive", icon: HardDrive },
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

        let Device = {
            ...(deviceName && { name: deviceName }),
            ...(selectedIcon && { picture: selectedIcon }),
            ...(Object.keys(settings).length > 0 && { settings: settings })
        };
        setUpdateModel(false)
        setspinner(true)
        // setlen(list.length + 1)
        const previousProducts = [...list]


        try {
            console.log(1)
            const Dev=await UpdateProduct(idcat,productid,Device)
            console.log(2)

            //@ts-ignore
            setlist(list.map(item => item._id === Dev._id ? Dev : item));
            console.log(3)

            console.log("Product added successfully");

        }catch (err){
            console.error("Error adding product:", err);
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
                            className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg p-3 grid grid-cols-4 gap-2 z-10">
                            {deviceIconList.map((device) => (
                                <button
                                    key={device.id}
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