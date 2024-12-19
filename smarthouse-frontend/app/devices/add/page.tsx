'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from "@/components/navbarBack";
import { Footer } from "@/components/general-footer";
import * as LucideIcons from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export default function AddPersonalDevicePage() {
    const [personnelDevices, setPersonnelDevices] = useState<SubDevice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // Fetch categories and filter for 'Personnel devices'
    useEffect(() => {
        const fetchPersonnelDevices = async () => {
            try {
                const response = await fetch('http://localhost:3001/product/getalldata', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                const personnelCategory = data.products.find((category: Category) => category.category === 'Personnel devices');

                if (personnelCategory) {
                    setPersonnelDevices(personnelCategory.subDevices);
                } else {
                    setError("No 'Personnel devices' category found.");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPersonnelDevices();
    }, []);

    const handleDeviceSelect = async (deviceId: string) => {
        try {
            const response = await fetch(`http://localhost:3001/user/addPersonelDevice/${deviceId}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log(`Device ${deviceId} successfully added to personal devices.`);
            router.push(`/devices`);
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar href="/devices" />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Select a Personal Device</h1>

                {loading ? (
                    <p className="text-center text-gray-500">Loading devices...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : personnelDevices.length === 0 ? (
                    <p className="text-center text-gray-500">No personal devices available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {personnelDevices.map((device) => {
                            const Icon = (LucideIcons as any)[device.picture] || LucideIcons.Box;

                            return (
                                <Card key={device._id} className="hover:border-1 hover:border-orange-600 transition-all duration-300 rounded-lg overflow-hidden">
                                    <CardContent className="p-6 flex flex-col items-center text-center">
                                        <Icon className="w-16 h-16 mb-4" />
                                        <h2 className="text-xl font-semibold mb-2 text-gray-700">{device.name}</h2>
                                        <Button
                                            onClick={() => handleDeviceSelect(device._id)}
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
