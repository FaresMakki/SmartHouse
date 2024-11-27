"use client";
import React, { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";

interface AddNewDeviceDialogueProps {
    SetTest: any;
    test: boolean;
    AddModel: boolean;
    setAddModel: any;
}
const AddNewDeviceDialogue = ({setAddModel,AddModel,test,SetTest}:AddNewDeviceDialogueProps) => {

    console.log("AddModel",AddModel)



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
                className="fixed z-50    inset-0 flex justify-center items-center"
            >

                <div
                    className="fixed inset-0 bg-gray-500 opacity-75 z-40"
                    aria-hidden="true"
                ></div>

                <div className="w-full z-50 rounded-2xl max-w-lg bg-white r  shadow-xl">
                    <div className="px-16 py-12 py-4">
                        <div className="absolute top-4 left-4 flex gap-6 justify-center items-center  ">
                            <button
                                className=" flex items-center justify-center h-8 w-8 rounded-full bg-red-100 hover:bg-red-200"
                                onClick={() => setAddModel(false)}
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
                            <h2 className="text-xl font-semibold text-gray-800 text-center ">Add New Device</h2>

                        </div>


                        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4"></h2>
                        <AddProductForm setTest={SetTest} test={test} />
                    </div>
                </div>
            </dialog>
        // </div>
    );}
    export default AddNewDeviceDialogue

