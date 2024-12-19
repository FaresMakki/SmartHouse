
"use client";
import React, { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import AddModelForm from "@/components/AddModelForm";

interface AddNewDeviceDialogueProps {
    setlen:any;
    setspinner:any;
    list:any;
    setlist:any;
    AddModel: boolean;
    setAddModel: any;
    idcat:any;
    subprodid:any;
}
const AddNewModelDialogue = ({setAddModel,AddModel,setlist,setlen,setspinner,list,idcat,subprodid}:AddNewDeviceDialogueProps) => {



    useEffect(() => {
        if (AddModel) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [AddModel]);

    if (!AddModel) return null;


    return (
        // <div>

        <dialog
            open={AddModel}
            className="fixed z-50     inset-0 flex justify-center items-center"
        >

            <div
                className="fixed inset-0 bg-gray-500 opacity-75 z-40"
                aria-hidden="true"
            ></div>

            <div className="w-full z-50 rounded-2xl max-w-lg bg-white border border-green-800 border-5  shadow-2xl">
                <div className="px-16 py-14">
                    <div className="absolute top-4 left-4 flex gap-6 justify-center items-center  ">
                        <button
                            className=" flex items-center justify-center h-8 w-8 rounded-full bg-green-100 hover:bg-green-200"
                            onClick={() => setAddModel(false)}
                        >
                            <svg
                                className="h-6 w-6 text-green-600"
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
                        <h2 className="text-xl font-semibold text-gray-800 text-center ">Add New Device</h2>

                    </div>
                    <AddModelForm subprodid={subprodid} idcat={idcat} setlen={setlen} setspinner={setspinner} list={list} setlist={setlist} setaddModel={setAddModel}/>


                </div>

            </div>
        </dialog>
    );}
export default AddNewModelDialogue


