import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import {Edit, Trash} from "lucide-react";
import {deleteProduct} from "@/utils-front/ProductsCalls";
import RoomSkeleton from "@/components/room-skeleton";
import Link from "next/link";

interface SubCategoryCardProps {
    key: any;
    product:any;
    prodid:any;
    deletemodel:any
    updateModel:any
    idcat:any
}
const SubCategoryCard = ({product,prodid,deletemodel,updateModel,idcat}:SubCategoryCardProps) => {
    const [loading, setLoading] = useState(true)

    // console.log(`le prod id ${product._id}`)
    async function handelDelete() {
        deletemodel(true)
        prodid(product._id)

    }
    async function handelUpdate() {
        updateModel(true)
        prodid(product._id)

    }
    useEffect(() => {
        setLoading(true);
    }, []);

    return (
        <div>
        {loading ?  (
                // <Card
                //
                //     className="flex flex-col justify-between h-[330px] w-50 border border-gray-200 shadow-md rounded-lg overflow-hidden"
                // >
                //     <CardContent className="flex justify-center items-center flex-grow">
                //         <Image
                //             src={product?.picture || '/default_image_url.jpg'}
                //             alt={product?.name || 'Default Image'}
                //             width={150}
                //             height={120}
                //             className="rounded-md object-contain"
                //         />
                //     </CardContent>
                //     <CardFooter className="bg-gray-50 p-4">
                //         <div className="flex items-center justify-between w-full gap-4">
                //             <div className="w-2/3">
                //                 {/*<h1 className="text-lg font-semibold text-gray-800">*/}
                //                 {/*    {product.name || 'Unnamed Product'}*/}
                //                 {/*</h1>*/}
                //                 <h1 className="text-lg font-semibold text-gray-800 truncate"
                //                     style={{whiteSpace: 'nowrap', width: "80px"}}>
                //                     {product.name || 'Unnamed Product'}
                //                 </h1>
                //                 <span
                //                     className="text-gray-500"
                //                     style={{fontSize: `14px`, lineHeight: '3'}}
                //                 >
                //   {product.createdAt?.slice(0, 10)}
                // </span>
                //             </div>
                //             <div className="flex gap-2">
                //                 <button onClick={handelUpdate}
                //                     className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition">
                //                     <Edit
                //                         className="w-5 h-5" style={{color: '#FF8343'}}/>
                //                 </button>
                //                 <button onClick={handelDelete}
                //                     className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition">
                //                     <Trash
                //                            className="w-5 h-5" style={{color: 'red'}}/>
                //                 </button>
                //             </div>
                //         </div>
                //     </CardFooter>
                // </Card>
                <Link href={`${idcat}/${product._id}`}>
                    <div
                        className="group hover:shadow-2xl hover:scale-[1.02] transition-all  shadow-md hover:border hover:border-gray-200 duration-300 ease-in-out bg-white rounded-3xl p-4 relative overflow-hidden cursor-pointer">
                        {/* Card Content */}
                        <div className="flex flex-col items-center gap-4">
                            <img
                                src={product?.picture || "/default_image_url.jpg"}
                                alt={product?.name || "Default"}
                                className="w-36 h-36 object-contain rounded-md transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="text-center w-full truncate">
                                <h1 className="text-lg font-semibold text-gray-800 truncate">{product.name || "Unnamed Product"}</h1>
                                <span className="text-gray-500 text-sm">{product.createdAt?.slice(0, 10)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div
                            className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handelUpdate();
                                }}
                                className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition"
                            >
                                <Edit className="w-5 h-5" style={{color: "#FF8343"}}/>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handelDelete();
                                }}
                                className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition"
                            >
                                <Trash className="w-5 h-5" style={{color: "red"}}/>
                            </button>
                        </div>
                    </div>
                </Link>

            ) :
            <RoomSkeleton/>


        }</div>

    );
};

export default SubCategoryCard;