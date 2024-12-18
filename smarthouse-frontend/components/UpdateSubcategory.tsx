"use client";
import React, { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import UpdateSubCatForm from "@/components/UpdateSubCatForm";

interface UpdateSubcategoryProps {
    setspinner:any;
    list:any;
    setlist:any;
    UpdateModel: boolean;
    setUpdateModel: any;
    idcat:any
    productid:any
}
const UpdateSubcategory = ({setlist,setspinner,list,UpdateModel,setUpdateModel,idcat,productid}:UpdateSubcategoryProps) => {




    useEffect(() => {
        if (UpdateModel) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [UpdateModel]);

    if (!UpdateModel) return null;



    return (
        // <div>

        <dialog
            open={UpdateModel}
            className="fixed z-50    inset-0 flex justify-center items-center"
        >

            <div
                className="fixed inset-0 bg-gray-500 opacity-75 z-40"
                aria-hidden="true"
            ></div>

            <div className="w-full z-50 rounded-2xl max-w-lg bg-white r  shadow-xl">
                <div className="px-16 py-14">
                    <div className="absolute top-4 left-4 flex gap-6 justify-center items-center  ">
                        <button
                            className=" flex items-center justify-center h-8 w-8 rounded-full bg-red-100 hover:bg-red-200"
                            onClick={() => setUpdateModel(false)}
                        >
                            <svg
                                className="h-6 w-6 text-red-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                        </button>
                        <h2 className="text-xl font-semibold text-gray-800 text-center ">Update Device</h2>

                    </div>


                    <UpdateSubCatForm productid={productid} idcat={idcat}  setspinner={setspinner} list={list} setlist={setlist} setUpdateModel={setUpdateModel}/>
                </div>
            </div>
        </dialog>
        // </div>
    );}
export default UpdateSubcategory


