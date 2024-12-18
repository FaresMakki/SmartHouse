"use client";
import React, {use, useEffect, useState} from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
// imoport the router image under the public directory
// import Image from "next/image"
import AdminSideBar from "@/components/adminsideBar";
import {Button} from "@/components/ui/button";
import {Edit, Plus,Trash} from "lucide-react";
import AddNewDeviceDialogue from "@/components/AddNewDeviceDialogue";
import {
    deleteProduct,
    GetAlldevices,
    GetAlldevicesModels,
    GetCategorys,
    handelasyncparams
} from "@/utils-front/ProductsCalls";
import NotAvailable from "@/components/NotAvailable";
import SubCategoryCard from "@/components/SubCategoryCard";
import SubCatListView from "@/components/sub-cat-list-view";
import RoomSkeleton from "@/components/room-skeleton";
import DeleteSubcat from "@/components/DeleteSubCat";
import UpdateSubcategory from "@/components/UpdateSubcategory";
// import DeleteSubcat from "@/components/DeleteSubcat";

interface producthandelprops{
    params:{id:string,idprod:string}
}
const Page =   ({params}: producthandelprops) => {

    const [ProductList, setProductList] = useState([])
    const [AddModel, setAddModel] = useState(false)
    const [DeleteModel, setDeleteModel] = useState(false)
    const [UpdateModel, setUpdateModel] = useState(false)
    const [spinner, setspinner] = useState(true)
    const [test, setTest] = useState(false)
    const [prodID, setProdID] = useState("")
    // @ts-ignore

    const { id,idprod } = use(params);
    console.log(id,idprod)

    const [len, setLen] = useState(8)
    const fetchModels = async () => {
        try {
            const categories = await GetAlldevicesModels(id,idprod);
            await setProductList(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setspinner(false);
        }
    };

    useEffect(() => {

        fetchModels()
    }, []);
    useEffect(() => {
        fetchModels()
    }, [test]);

    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-gray-800">


            <AdminSideBar/>

            <div className="flex flex-col md:ml-64 transition-all duration-300 gap-y-7 mt-14 p-4 pr-0 ">
                <div>

                    <Button onClick={() => {
                        setAddModel(true)
                    }}
                            className=" border bg-white border-accentOrange ml-6  text-accentOrange rounded-full flex  justify-center items-center hover:bg-orange-100  "><Plus/> Add
                        New Category</Button>
                </div>

                {spinner ? (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(len)].map((_, index) => (
                                <RoomSkeleton key={index}/>
                            ))}
                        </div>
                    </div>


                ) : (

                    <div className="flex flex-col   ml-6 p-2 pl-0   ">

                        {/*<v>*/}

                        <div>
                            {/* Cards Layout for Large Screens */}
                            {/*<div className="hidden md:flex flex-wrap  md:m-1  gap-10">*/}
                            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                                {
                                    ProductList.length > 0 ? (

                                        ProductList.map((product, index) => (


                                            <SubCategoryCard idcat={id} prodid={setProdID} updateModel={setUpdateModel} deletemodel={setDeleteModel}  key={index}  product={product}/>
                                        ))
                                    ) : (
                                        <NotAvailable/>
                                    )}
                            </div>

                            {/* List View for Small Screens */}
                            <div className="flex flex-col gap-4 md:hidden">
                                {ProductList.length > 0 ? (
                                    ProductList.map((product, index) => (

                                        <SubCatListView prodid={setProdID} updateModel={setUpdateModel} deletemodel={setDeleteModel} product={product} key={index}/>
                                    ))
                                ) : (
                                    <NotAvailable/>
                                )}
                            </div>
                        </div>


                    </div>
                )
                }
                <AddNewModelDialogue setlen={setLen} setspinner={setspinner} list={ProductList} setlist={setProductList}  setAddModel={setAddModel} AddModel={AddModel} />
                <DeleteModelDialogue DeleteModels={DeleteModel} setDeleteModels={setDeleteModel} idcat={id} productid={prodID} list={ProductList} setlist={setProductList} setspinner={setspinner} setlen={setLen} />
                <UpdateModelDialogue productid={prodID}  setspinner={setspinner} list={ProductList} idcat={id} setlist={setProductList} UpdateModel={UpdateModel} setUpdateModel={setUpdateModel}/>
            </div>
        </div>
    );
};


export default Page;


