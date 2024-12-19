"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import Navbar from "@/components/navbarHome";
import { Footer } from "@/components/general-footer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import Link from "next/link";
import { MoreHorizontal, Pencil, PlusCircle, Trash2, Power } from 'lucide-react';
import NotAvailable from "@/components/NotAvailable";
import DeleteConfirmationOverlay from "@/components/delete-confirmation-overlay";
import { useRouter } from "next/navigation";

interface Device {
    _id: string;
    deviceName: string;
    modelName: string;
    picture: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    consumption: number;
    Settings: {
        temperature?: { value: number; unit: string };
        powerState?: { value: string };
        brightness?: { value: number };
        color?: { value: string };
        time?: { value: string };
    };
}

export default function PersonalDevicesPage() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isPending, startTransition] = useTransition();
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; deviceId: string | null; deviceName: string }>({
        isOpen: false,
        deviceId: null,
        deviceName: '',
    });

    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        startTransition(() => {
            fetch("http://localhost:3001/user/getPersonelDevice", {
                method: "GET",
                credentials: "include",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch personal devices.");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        setDevices(data.devices);
                    } else {
                        setFetchError("No personal devices found.");
                    }
                })
                .catch((error) => {
                    setFetchError("Error fetching personal devices from the server. Please try again later.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    }, []);

    const toggleDeviceStatus = (deviceId: string) => {
        setDevices((prevDevices) =>
            prevDevices.map((device) => {
                if (device._id === deviceId) {
                    return { ...device, status: device.status === "on" ? "off" : "on" };
                }
                return device;
            })
        );
    };

    const openDeleteConfirmation = (deviceId: string, deviceName: string) => {
        setDeleteConfirmation({ isOpen: true, deviceId, deviceName });
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ isOpen: false, deviceId: null, deviceName: '' });
    };

    const handleDeleteDevice = async () => {
        if (deleteConfirmation.deviceId) {
            try {
                const response = await fetch(`http://localhost:3001/user/deletepersonaldevice/${deleteConfirmation.deviceId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                if (response.ok) {
                    setDevices(prevDevices => prevDevices.filter(device => device._id !== deleteConfirmation.deviceId));
                    closeDeleteConfirmation();
                } else {
                    console.error('Failed to delete device');
                }
            } catch (error) {
                console.error('Error deleting device:', error);
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 w-full max-w-[1200px] mx-auto">
                <motion.div
                    className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.1,
                    }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Your Personal Devices
                    </h1>
                    <Link
                        className="flex flex-row px-3 py-1.5 group border-2 rounded-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 ease-in-out"
                        href="/devices/add"
                    >
                        <PlusCircle className="h-5 w-5 mr-2 mt-0.5 group-hover:animate-spin-slow" />
                        <span className="font-semibold">Add New Device</span>
                    </Link>
                </motion.div>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                    </div>
                ) : fetchError ? (
                    <NotAvailable message="Error Loading Devices" subMessage={fetchError} />
                ) : devices.length === 0 ? (
                    <NotAvailable message="No Personal Devices" subMessage="Add your first personal device to get started!" />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {devices.map((device) => {
                            const DeviceIcon = (Icons as any)[device.picture] || Icons.Smartphone;
                            const isOn = device.status === "on";

                            return (
                                <motion.div
                                    key={device._id+device.deviceName}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.1,
                                    }}
                                >
                                    <Card className="h-full">
                                        <CardContent className="p-6 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <DeviceIcon className="h-6 w-6 mr-2" />
                                                    <h3 className="font-semibold text-lg">{device.deviceName}</h3>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onSelect={() => router.push(`/devices/${device._id}/edit`)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            <span>Edit</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => openDeleteConfirmation(device._id, device.deviceName)}>
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>Delete</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm text-gray-500 mb-2">Model: {device.modelName}</p>
                                                <p className="text-sm text-gray-500 mb-4">Created At: {new Date().toLocaleString()}</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <Button
                                                    variant={isOn ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => toggleDeviceStatus(device._id)}
                                                    className={`w-full rounded-full ${!isOn ? 'border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white' : ''}`}
                                                >
                                                    <Power className="mr-2 h-4 w-4" />
                                                    {isOn ? "Turn Off" : "Turn On"}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
            <Footer />
            <DeleteConfirmationOverlay
                isOpen={deleteConfirmation.isOpen}
                onClose={closeDeleteConfirmation}
                onConfirm={handleDeleteDevice}
                object={deleteConfirmation.deviceName}
            />
        </div>
    );
}