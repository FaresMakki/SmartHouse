'use client';

import React, {use, useEffect, useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from "@/components/navbarBack";
import { Footer } from "@/components/general-footer";
import * as LucideIcons from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface DeviceModel {
    _id: string;
    modelName: string;
    modelDetails: string;
    picture: string;
}

export default function SelectDevicePage({ params }: { params: { roomId: string } }) {
    const [models, setModels] = useState<DeviceModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    // @ts-ignore
    const {id} = use(params)
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId');
    const type = searchParams.get('type');

    useEffect(() => {
        const fetchModels = async () => {
            if (!categoryId || !type) {
                setError('Missing category or type information');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/product/getProdModel/${categoryId}/${type}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setModels(data.models || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, [categoryId, type]);

    const handleModelSelect = async (modelId: string) => {
        try {
            const response = await fetch(`http://localhost:3001/user/adddevice/${modelId}/${id}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log(`Device model ${modelId} successfully added to room ${id}`);
            router.push(`/rooms`);
        } catch (err: any) {
            setError(err.message);
        }
    };



    return (
        <div className="flex flex-col min-h-screen">
            <Navbar href={`/rooms/${id}/addDevice`} />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Select a Device Model</h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading models...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : models.length === 0 ? (
                    <p className="text-center text-gray-500">No models available for this device type.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {models.map((model) => {
                            const Icon = (LucideIcons as any)[model.picture] || LucideIcons.Box;

                            return (
                                <Card key={model._id} className="hover:border-1 hover:border-orange-600 transition-all duration-300 rounded-lg overflow-hidden">
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <Icon className="w-16 h-16 mb-4" />
                                        <h2 className="text-xl font-semibold mb-2 text-gray-700">{model.modelName}</h2>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-3">{model.modelDetails}</p>
                                        <Button
                                            onClick={() => handleModelSelect(model._id)}
                                            className="w-full outline-orange-600 shadow-none bg-white text-orange-500 hover:bg-orange-400 hover:text-white font-semibold py-2 rounded-full transition-colors"
                                        >
                                            Select
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}