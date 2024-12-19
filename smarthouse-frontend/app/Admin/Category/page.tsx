"use client"
import React, {useEffect, useState} from 'react';
import AdminSideBar from "@/components/adminsideBar";
import SectionList from "@/components/section-list";
import Adminglobaltrend from "@/components/admin-global-trend";
import {Table,TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Edit, Trash } from "lucide-react";
import {GetCategorys} from "@/utils-front/ProductsCalls";
import DeleteModel from "@/components/DeleteModel";
import UpdateModels from "@/components/UpdateModels";
import {boolean} from "zod";
import CreatingModel from "@/components/CreatingModel";
import Spinnerbutton from "@/components/Spinner"; // Import Edit and Delete (Trash) icons
import Link from "next/link";

const Page = () => {
    const [CategoryList, setCategoryList] = useState([])
    const [test, setTest] = useState(false)
    const [UpdateModel, setUpdateModel] = useState(false)
    const [DeleteModels, setDeleteModels] = useState(false)
    const [CatID, setCatID] = useState(null)
    const [categorie, setCategorie] = useState(null)
    const [spinner, setspinner] = useState(true)


    const [CreatedCategory, setCreatedCategory] = useState(false)

    const fetchCategories = async () => {
        try {
            const categories = await GetCategorys(); // Fetch categories
            setCategoryList(categories); // Update state
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setspinner(false); // Stop loading
        }
    };
    useEffect(() => {

        fetchCategories()
    }, []);
    useEffect(() => {

        fetchCategories()
    }, [test]);

    // function navigate(_id: any) {
    //     const navigate = useNavigate();
    //     navigate('/products');
    // }

    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
            <AdminSideBar />

            <div className="flex flex-col md:ml-64 transition-all duration-300 gap-y-7 mt-14 p-4 ">

                <div>
                    <Button onClick={() => {setCreatedCategory(true)}}
                        className=" border bg-white border-accentOrange text-accentOrange rounded-full flex  justify-center items-center hover:bg-orange-100  "><Plus/> Add
                        New Category</Button>
                </div>
                {spinner ?(
                    <Spinnerbutton/>       ):(
                <Table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                    <TableCaption className="p-4 text-sm text-gray-500 bg-gray-100">
                        A list of your added category.
                    </TableCaption>
                    <TableHeader className="bg-gray-50 border-b border-gray-200">
                        <TableRow>
                            <TableHead
                                className="px-4 py-2 text-left  lg:font-medium text-gray-700">Category</TableHead>
                            <TableHead className="px-4 py-2 text-left font-medium text-gray-700">Creation
                                Dates</TableHead>
                            <TableHead className="px-4 py-2 text-left font-medium text-gray-700">Edit</TableHead>
                            <TableHead className="px-4 py-2 text-right font-medium text-gray-700">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {CategoryList.length > 0 ? (
                            CategoryList.map((category) => (
                                <TableRow key={category._id}  className="hover:bg-gray-100 transition duration-200">
                                    {/* Category Name */}
                                    <TableCell
                                        className="px-4 py-2 text-gray-900"
                                        style={{
                                            fontSize: '1.2rem',
                                            fontWeight: 500,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {/*{category.category}*/}
                                        <Link href={`Category/${category._id}`}>
                                            {category.category}
                                        </Link>

                                    </TableCell>

                                    {/* Created At */}
                                    <TableCell className="px-7 py-2 text-gray-700">
                                        {category.createdAt.slice(0, 10)}
                                    </TableCell>

                                    {/* Edit Button */}
                                    <TableCell className="px-4 py-2 text-gray-700">
                                        <button
                                            className="p-2 rounded-lg hover:bg-blue-100 transition duration-200"
                                            onClick={() => {
                                                setUpdateModel(true);
                                                setCategorie(category)
                                            }}
                                        >
                                            <Edit className="text-blue-600"/>
                                        </button>
                                    </TableCell>

                                    {/* Delete Button */}
                                    <TableCell className="px-4 py-2 text-right text-gray-700">
                                        <button
                                            className="p-2 rounded-lg hover:bg-red-100 transition duration-200"
                                            onClick={() => {
                                                setDeleteModels(true);
                                                setCategorie(category)

                                            }}
                                        >
                                            <Trash className="text-red-600"/>
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            // Beautiful alternative message for an empty list
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-12 h-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 17v-6a3 3 0 013-3h3m-3 0a3 3 0 00-3 3v6m-4 2h16m-8-8v2m0 4h.01"
                                            />
                                        </svg>
                                        <p className="text-gray-600 text-lg font-semibold">
                                            No categories available
                                        </p>
                                        <p className="text-gray-500">
                                            Add a new category to get started.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
                ) }
                <DeleteModel setDeleteModels={setDeleteModels} DeleteModels={DeleteModels} category={categorie}
                             test={test} SetTest={setTest}/>


                <UpdateModels setUpdateModel={setUpdateModel} UpdateModel={UpdateModel} category={categorie} test={test}
                              SetTest={setTest}/>

                <CreatingModel setCreatedModels={setCreatedCategory} CreatedModels={CreatedCategory} test={test}
                                    SetTest={setTest}/>


            </div>
            {/*</div>*/}
        </div>
    );
};

export default Page;