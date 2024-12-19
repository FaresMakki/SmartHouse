"use client";

import React, { useEffect, useState, useTransition, Suspense } from "react";
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
import RoomOverlay from "@/components/room-overlay";
import DeviceGrid from "@/components/device-grid";
import Link from "next/link";
import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import NotAvailable from "@/components/NotAvailable";
import RoomSkeleton from "@/components/room-skeleton";
import DeleteConfirmationOverlay from "@/components/delete-confirmation-overlay";
import {useRouter} from "next/navigation";

interface Device {
    deviceType: string;
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
    _id: string;
}

interface Room {
    id: string;
    name: string;
    icon: React.ElementType;
    devices: Device[];
}

export default function RoomsManagement() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isPending, startTransition] = useTransition();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; roomId: string | null; roomName: string }>({
        isOpen: false,
        roomId: null,
        roomName: '',
    });

    const getRoomIcon = (iconName: string): React.ElementType => {
        const normalizedIconName =
            iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase();

        // @ts-ignore
        if (Icons[normalizedIconName]) {
            // @ts-ignore
            return Icons[normalizedIconName];
        }

        console.warn(`Icon "${normalizedIconName}" not found. Falling back to "Home".`);
        return Icons.Home;
    };

    useEffect(() => {
        setIsLoading(true);
        startTransition(() => {
            fetch("http://localhost:3001/user/getallroom", {
                method: "GET",
                credentials: "include",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch rooms.");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        setRooms(
                            data.success.map((room: any) => ({
                                id: room._id,
                                name: room.name,
                                icon: getRoomIcon(room.icon),
                                devices: room.devices.map((device: any) => ({
                                    deviceType: device.deviceType,
                                    deviceName: device.deviceName,
                                    modelName: device.modelName,
                                    picture: device.picture,
                                    status: device.status,
                                    createdAt: device.createdAt,
                                    updatedAt: device.updatedAt,
                                    consumption: device.consumption,
                                    Settings: device.Settings,
                                    _id: device._id,
                                })),
                            }))
                        );
                    } else {
                        setFetchError("No rooms found.");
                    }
                })
                .catch((error) => {
                    setFetchError("Error fetching rooms from the server. Please try again later.");
                    console.error("Error Fetching Rooms:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    }, []);

    const toggleDeviceStatus = (roomIndex: number, deviceIndex: number) => {
        setRooms((prevRooms) =>
            prevRooms.map((room, rIndex) => {
                if (rIndex === roomIndex) {
                    return {
                        ...room,
                        devices: room.devices.map((device, dIndex) => {
                            if (dIndex === deviceIndex) {
                                return {
                                    ...device,
                                    status: device.status === "on" ? "off" : "on",
                                };
                            }
                            return device;
                        }),
                    };
                }
                return room;
            })
        );
    };

    const toggleDeviceStatusInOverlay = (deviceIndex: number) => {
        if (selectedRoom) {
            setRooms((prevRooms) =>
                prevRooms.map((room) => {
                    if (room.name === selectedRoom.name) {
                        const updatedDevices = room.devices.map((device, dIndex) =>
                            dIndex === deviceIndex
                                ? {
                                    ...device,
                                    status: device.status === "on" ? "off" : "on",
                                }
                                : device
                        );
                        return { ...room, devices: updatedDevices };
                    }
                    return room;
                })
            );

            setSelectedRoom((prevSelectedRoom) =>
                prevSelectedRoom
                    ? {
                        ...prevSelectedRoom,
                        devices: prevSelectedRoom.devices.map((device, dIndex) =>
                            dIndex === deviceIndex
                                ? {
                                    ...device,
                                    status: device.status === "on" ? "off" : "on",
                                }
                                : device
                        ),
                    }
                    : null
            );
        }
    };

    const distributeRooms = (rooms: Room[], columnsCount: number) => {
        const columns = Array.from({ length: columnsCount }, () => [] as Room[]);
        rooms.forEach((room, index) => {
            columns[index % columnsCount].push(room);
        });
        return columns;
    };

    const router = useRouter();

    const columns = distributeRooms(rooms, 3);

    const openRoomOverlay = (room: Room) => {
        setSelectedRoom(room);
        setIsOverlayOpen(true);
    };

    const openDeleteConfirmation = (roomId: string, roomName: string) => {
        setDeleteConfirmation({ isOpen: true, roomId, roomName });
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ isOpen: false, roomId: null, roomName: '' });
    };

    const handleDeleteRoom = async () => {
        if (deleteConfirmation.roomId) {
            try {
                const response = await fetch(`http://localhost:3001/user/delroom/${deleteConfirmation.roomId}`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (response.ok) {
                    setRooms(prevRooms => prevRooms.filter(room => room.id !== deleteConfirmation.roomId));
                    closeDeleteConfirmation();
                } else {
                    console.error('Failed to delete room');
                    // Optionally, show an error message to the user
                }
            } catch (error) {
                console.error('Error deleting room:', error);
                // Optionally, show an error message to the user
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
                        Your Rooms
                    </h1>
                    <Link
                        className="flex flex-row px-3 py-1.5 group border-2 rounded-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 ease-in-out"
                        href={"/rooms/addRoom"}
                    >
                        <PlusCircle className="h-5 w-5 mr-2 mt-0.5 group-hover:animate-spin-slow" />
                        <span className="font-semibold">Add New Room</span>
                    </Link>
                </motion.div>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <RoomSkeleton key={index} />
                        ))}
                    </div>
                ) : fetchError ? (
                    <NotAvailable message="Error Loading Rooms" subMessage={fetchError} />
                ) : rooms.length === 0 ? (
                    <NotAvailable />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room, roomIndex) => {
                            const RoomIcon = room.icon;
                            return (
                                <motion.div
                                    key={roomIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: roomIndex * 0.1,
                                    }}
                                >
                                    <Card className="h-full">
                                        <CardContent className="p-6 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-4">
                                                <div
                                                    className="flex items-center cursor-pointer"
                                                    onClick={() => openRoomOverlay(room)}
                                                >
                                                    <RoomIcon className="h-6 w-6 mr-2" />
                                                    <h3 className="font-semibold text-lg">
                                                        {room.name}
                                                    </h3>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onSelect={() => router.push(`/rooms/${room.id}/addDevice`)}>
                                                            <PlusCircle className="mr-2 h-4 w-4" />
                                                            <span>Add Device</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => router.push(`/rooms/${room.id}/editRoom`)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            <span>Edit</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onSelect={() => openDeleteConfirmation(room.id, room.name)}>
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>Delete</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                            </div>
                                            <DeviceGrid
                                                roomId={room.id}
                                                devices={room.devices}
                                                toggleDeviceStatus={(deviceIndex) =>
                                                    toggleDeviceStatus(
                                                        rooms.indexOf(room),
                                                        deviceIndex
                                                    )
                                                }
                                                openRoomOverlay={() => openRoomOverlay(room)}
                                            />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
            <Footer />
            {selectedRoom && (
                <RoomOverlay
                    room={selectedRoom}
                    isOpen={isOverlayOpen}
                    onClose={() => setIsOverlayOpen(false)}
                    toggleDeviceStatus={toggleDeviceStatusInOverlay}
                />
            )}
            <DeleteConfirmationOverlay
                isOpen={deleteConfirmation.isOpen}
                onClose={closeDeleteConfirmation}
                onConfirm={handleDeleteRoom}
                object={deleteConfirmation.roomName}
            />
        </div>
    );
}