"use client";
import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
// imoport the router image under the public directory
// import Image from "next/image"
import AdminSideBar from "@/components/adminsideBar";
import {Button} from "@/components/ui/button";
import {Edit, Plus,Trash} from "lucide-react";
import AddNewDeviceDialogue from "@/components/AddNewDeviceDialogue";
import {GetAlldevices, GetCategorys} from "@/utils-front/ProductsCalls";
import Spinnerbutton from "@/components/Spinner";
import {TableCell, TableRow} from "@/components/ui/table";
import {log} from "node:util";
import NotAvailable from "@/components/NotAvailable";
//any syntaxe error

const Page = () => {
    const [ProductList, setProductList] = useState([])

    const [AddModel, setAddModel] = useState(false)
    const [spinner, setspinner] = useState(true)

    const [test, setTest] = useState(false)

    const fetchDevices = async () => {
        try {
            const categories = await GetAlldevices(); // Fetch categories
            setProductList(categories); // Update state
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setspinner(false); // Stop loading
        }
    };
    useEffect(() => {

        fetchDevices()
    }, []);
    useEffect(() => {

        fetchDevices()
    }, [test]);

        return (
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">


                <AdminSideBar/>
                <div className="flex flex-col md:ml-64 transition-all duration-300 gap-y-7 mt-14 p-4 ">
                <div>
                    <Button onClick={() => {
                        setAddModel(true)
                    }}
                            className=" border bg-white border-accentOrange text-accentOrange rounded-full flex  justify-center items-center hover:bg-orange-100  "><Plus/> Add
                        New Category</Button>
                </div>

                {spinner ? (
                    <Spinnerbutton/>
                ) : (

                    <div className="flex flex-col   mt-6 p-4 ">

                        {/*<div>*/}
                        {/*    <Button onClick={() => setAddModel(true)}*/}
                        {/*            className=" border bg-white border-accentOrange text-accentOrange rounded-full flex  hover:bg-orange-100 justify-center items-center   "><Plus/> Add*/}
                        {/*        New Device</Button>*/}
                        {/*</div>*/}

                        <div className={"flex flex-wrap  gap-7"}>
                            {ProductList.length > 0 ? (
                                    ProductList.map((product, index) => (
                                        // i want to console log the product

                                        <Card
                                            key={index}
                                            className="flex flex-col justify-between  md:h-72 md:w-56 border border-gray-200 shadow-md rounded-lg overflow-hidden"
                                        >
                                            {/* Card Content */}
                                            <CardContent className="flex justify-center items-center flex-grow p-4">
                                                <Image
                                                    src={product && product.picture ? product.picture : '/default_image_url.jpg'}
                                                    alt={product?.name || 'Default Image'}
                                                    width={150}
                                                    height={120}
                                                    className="rounded-md"
                                                />
                                            </CardContent>

                                            {/* Card Footer */}
                                            <CardFooter className="bg-gray-50 p-4">
                                                <div className="flex items-center justify-between w-full gap-4">
                                                    {/* Product Name and Info */}
                                                    <div>
                                                        <h1 className="text-lg font-semibold text-gray-800">{product.name || 'Unnamed Product'}</h1>
                                                        <span className="text-sm text-gray-500">
          Created At: {product.createdAt ? product.createdAt.slice(0, 10) : 'Unknown'}
        </span>
                                                    </div>

                                                    {/* Action Icons */}
                                                    <div className="flex gap-2">
                                                        <button className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition">
                                                            <Edit className="w-5 h-5" style={{ color: '#FF8343' }} />
                                                        </button>
                                                        <button className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition">
                                                            <Trash className="w-5 h-5" style={{ color: 'red' }} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </CardFooter>
                                        </Card>

                                    ))
                            ) : (


                                <NotAvailable/>
                            )}


                        </div>


                    </div>
                )
                }
                <AddNewDeviceDialogue setAddModel={setAddModel} AddModel={AddModel} test={test} SetTest={setTest}/>
                </div>
            </div>
        );
};


export default Page;


//               <Card className="flex flex-col border border-gray-200 shadow-md rounded-lg overflow-hidden">
//                             <CardContent className="p-4 flex justify-center items-center">
//                                 {/* Product Image */}
//                                 <Image
//                                     src="/router.jpg"
//                                     alt="Router"
//                                     width={180}
//                                     height={115}
//                                     className="rounded-md"
//                                 />
//                             </CardContent>
//                             <CardFooter className="bg-gray-50 p-4">
//                                 <div className="flex items-center justify-between w-full gap-6">
//                                     {/* Product Name and Info (Left) */}
//                                     <div>
//                                         <h1 className="text-lg font-semibold text-gray-800">Router</h1>
//                                         <span className="text-gray-500 text-sm">Created At: 9/10/2024</span>
//                                     </div>
//
//                                     {/* Icons (Right) */}
//                                     <div className="flex gap-3">
//                                         <button className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition-all">
//                                             <Edit className="w-5 h-5 " style={{ color: "#FF8343" }} />
//                                         </button>
//                                         <button className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all">
//                                             <Trash className="w-5 h-5" style={{ color: "red" }} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                         <Card className="flex flex-col border border-gray-200 shadow-md rounded-lg overflow-hidden">
//                             <CardContent className="p-4 flex justify-center items-center">
//                                 {/* Product Image */}
//                                 <Image
//                                     src="/router.jpg"
//                                     alt="Router"
//                                     width={180}
//                                     height={115}
//                                     className="rounded-md"
//                                 />
//                             </CardContent>
//                             <CardFooter className="bg-gray-50 p-4">
//                                 <div className="flex items-center justify-between w-full gap-6">
//                                     {/* Product Name and Info (Left) */}
//                                     <div>
//                                         <h1 className="text-lg font-semibold text-gray-800">Router</h1>
//                                         <span className="text-gray-500 text-sm">Created At: 9/10/2024</span>
//                                     </div>
//
//                                     {/* Icons (Right) */}
//                                     <div className="flex gap-3">
//                                         <button className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition-all">
//                                             <Edit className="w-5 h-5 " style={{ color: "#FF8343" }} />
//                                         </button>
//                                         <button className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all">
//                                             <Trash className="w-5 h-5" style={{ color: "red" }} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </CardFooter>
//                         </Card>
//                         <Card className="flex flex-col border border-gray-200 shadow-md rounded-lg overflow-hidden">
//                             <CardContent className="p-4 flex justify-center items-center">
//                                 {/* Product Image */}
//                                 <Image
//                                     src="/router.jpg"
//                                     alt="Router"
//                                     width={180}
//                                     height={115}
//                                     className="rounded-md"
//                                 />
//                             </CardContent>
//                             <CardFooter className="bg-gray-50 p-4">
//                                 <div className="flex items-center justify-between w-full gap-6">
//                                     {/* Product Name and Info (Left) */}
//                                     <div>
//                                         <h1 className="text-lg font-semibold text-gray-800">Router</h1>
//                                         <span className="text-gray-500 text-sm">Created At: 9/10/2024</span>
//                                     </div>
//
//                                     {/* Icons (Right) */}
//                                     <div className="flex gap-3">
//                                         <button className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition-all">
//                                             <Edit className="w-5 h-5 " style={{ color: "#FF8343" }} />
//                                         </button>
//                                         <button className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-all">
//                                             <Trash className="w-5 h-5" style={{ color: "red" }} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </CardFooter>
//                         </Card>