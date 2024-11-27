import React, {useState} from 'react';
import {UpdateCategory} from "@/utils-front/ProductsCalls";
import {router} from "next/client";
import {useRouter} from "next/navigation";
interface UpdateModelProps {
    setUpdateModel: any;
    UpdateModel: boolean;
    category: any;
    test: any;
    SetTest: any;


}
const UpdateModels = ({UpdateModel,setUpdateModel,category,test,SetTest}:UpdateModelProps) => {
    const [discription, setDiscription] = useState("")
    const [name, setName] = useState("")

    function UpdateCat() {
        UpdateCategory(name, discription, category._id)
            .then(() => {
                setUpdateModel(false); // Close the dialog
                SetTest(!test); // Trigger re-fetch of categories
            })
            .catch((error) => {
                console.error("Error updating category:", error.message);
            });

    }

    return (

        <dialog open={UpdateModel} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <button onClick={() => {
                                setUpdateModel(false)
                            }}
                                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Update Category</h3>
                                <div className="mt-2">
                                    <form>
                                        <input type="text" placeholder={`${category?.category}`} value={name} onChange={(e) => {setName(e.target.value)}}
                                               className="mt-4 p-2 w-full border border-gray-300 rounded-md"/>

                                        <textarea type="text" placeholder={`${category?.description}`} value={discription} onChange={(e) => {setDiscription(e.target.value)}}
                                                  className="mt-4 p-2 w-full border border-gray-300 rounded-md"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" onClick={UpdateCat}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Update
                        </button>
                        <button type="button" onClick={() => {
                            setUpdateModel(false)
                        }}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </dialog>

    );
};

export default UpdateModels;