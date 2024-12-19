'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from "@/components/navbarBack";
import { Footer } from "@/components/general-footer";
import * as LucideIcons from 'lucide-react';

interface SubDevice {
    _id: string;
    name: string;
    picture: string; // The name of the Lucide icon
}

interface Category {
    _id: string;
    category: string;
    subDevices: SubDevice[];
}

export default function AddDevicePage({ params }: { params: { roomId: string } }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //@ts-ignore
    const {id} = use(params)

    const router = useRouter();

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3001/product/getalldata', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setCategories(data.products);
                console.log(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSubcategoryClick = (categoryId: string, subId: string) => {
        router.push(`/rooms/${id}/addDevice/selectDevice?categoryId=${encodeURIComponent(categoryId)}&type=${encodeURIComponent(subId)}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar href="/rooms" />
            <div className="flex-grow container mx-auto px-4 py-4">
                <h1 className="text-3xl font-bold mb-8 text-center mt-6">Select a category</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.category} className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold mb-3 text-gray-700">{category.category}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                                {category.subDevices.map((subDevice) => {
                                    const Icon = (LucideIcons as any)[subDevice.picture] || LucideIcons.Box;
                                    return (
                                        <button
                                            key={subDevice.name}
                                            className="flex items-center text-left bg-gray-100 hover:bg-gray-200 rounded-md py-2 px-3 text-sm transition-colors duration-200"
                                            onClick={() => handleSubcategoryClick(category._id, subDevice._id)}
                                        >
                                            <Icon className="w-6 h-6 mr-2" />
                                            {subDevice.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
