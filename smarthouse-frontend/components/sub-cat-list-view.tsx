import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Edit, Trash} from "lucide-react";
import RoomSkeleton from "@/components/room-skeleton";
interface SubCatListViewProps {
    product: any;
    key:any
    prodid:any;
    deletemodel:any
    updateModel:any
}
const SubCatListView = ({product,prodid,deletemodel,updateModel}:SubCatListViewProps) => {
    const [loading, setLoading] = useState(true)

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
            {loading ? (

                <div
                    className="flex items-center md:block border border-gray-200 shadow-md rounded-lg overflow-hidden"
                >

                    {/* Product Image */}
                    <div className="p-4 w-1/4 md:w-full bg-gray-50 flex justify-center">
                        <Image
                            src={product?.picture || '/default_image_url.jpg'}
                            alt={product?.name || 'Default Image'}
                            width={120}
                            height={100}
                            className="rounded-md object-contain"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="p-4 flex flex-col justify-between w-3/4 md:w-full">
                        <div>
                            <h1 className="text-lg font-semibold text-gray-800">
                                {product.name || 'Unnamed Product'}
                            </h1>
                        </div>
                        <div className="flex items-center justify-between mt-2">
              <span className="text-gray-500 text-sm">
                Created: {product.createdAt?.slice(0, 10) || 'Unknown'}
              </span>
                            <div className="flex gap-2">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handelUpdate();
                                }}
                                    className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition">
                                    <Edit className="w-5 h-5" style={{color: '#FF8343'}}/>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handelDelete();
                                    }}
                                    className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition">
                                    <Trash
                                        className="w-5 h-5" style={{color: 'red'}}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <RoomSkeleton/>

            )
            }
        </div>

    );
};

export default SubCatListView;