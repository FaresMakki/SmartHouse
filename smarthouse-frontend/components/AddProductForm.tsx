import React, {useState} from 'react';
import DevicesAttribute from "@/utils-front/DevicesAttributes";
import {ADDProduct} from "@/utils-front/ProductsCalls";
import {Activity, Home, Lightbulb, Smartphone, Wifi} from "lucide-react";

const categoryIcons = {
    "Home Appliances": <Home className="text-blue-500 w-6 h-6" />,
    Lighting: <Lightbulb className="text-yellow-500 w-6 h-6" />,
    Connectivity: <Wifi className="text-green-500 w-6 h-6" />,
    Sensors: <Activity className="text-red-500 w-6 h-6" />,
    "Smart Devices": <Smartphone className="text-purple-500 w-6 h-6" />,
};

interface AddProductFormProps {
    test: boolean;
    setTest:any
}
const AddProductForm = ({test,setTest}:AddProductFormProps) => {
    const [deviceName, setDeviceName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [deviceImage, setDeviceImage] = useState("");
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDeviceImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let settings={}
        for (const category in deviceAttributesByCategory) {
            for (const attribute of deviceAttributesByCategory[category]) {
                if(category==="Sensors"){
                    settings[attribute]="readOnly"

                }else{
                    settings[attribute]="readWrite"
                }
            }

        }

        let Device={
            name:deviceName,
            picture:deviceImage,
            settings:settings
        }
        ADDProduct(Device)
        setTest(!test)

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            <textarea
                placeholder="Category Description"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            <input
                placeholder={"Device Image"}
                type="file"
                // onChange={handleImageUpload}
                onChange={handleImageUpload}

                className="w-full p-2 border border-gray-300 text-gray-700 py-3 rounded-lg"
            />
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
                    className="px-4 py-2 bg-accentOrange text-white rounded-lg hover:bg-orange-600"
                >
                    Submit
                </button>
            </div>
        </form>

    );
};

export default AddProductForm;