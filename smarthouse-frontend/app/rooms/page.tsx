"use client";

import React, {useEffect, useState, useTransition} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as Icons from "lucide-react";
import Navbar from "@/components/navbarHome";
import {Footer} from "@/components/general-footer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {motion} from "framer-motion";
import RoomOverlay from "@/components/room-overlay";
import DeviceGrid from "@/components/device-grid";
import Link from "next/link";
import {MoreHorizontal, Pencil, PlusCircle, Trash2} from "lucide-react";

interface Device {
    name: string;
    icon: React.ElementType;
    status: boolean;
    model?: string;
    dateAdded?: string;
    lastTurnedOn?: string;
    consumption?: number;
}

interface Room {
    name: string;
    icon: React.ElementType;
    devices: Device[];
}

export default function RoomsManagement() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isPending, startTransition] = useTransition();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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
                    console.log("Fetched data:", data.success);
                    if (data.success) {
                        console.log("Setting rooms:", data.success);
                        setRooms(
                            data.success.map((room: any) => ({
                                name: room.name,
                                icon: getRoomIcon(room.icon),
                                devices: room.devices || [],
                            }))
                        );
                    }
                })
                .catch((error) => {
                    console.error("Error Fetching Rooms:", error)
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
                                return {...device, status: !device.status};
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
                        // Update the specific room's devices
                        const updatedDevices = room.devices.map((device, dIndex) =>
                            dIndex === deviceIndex
                                ? {...device, status: !device.status}
                                : device
                        );
                        return {...room, devices: updatedDevices};
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
                                ? {...device, status: !device.status}
                                : device
                        ),
                    }
                    : null
            );
        }
    };

    const distributeRooms = (rooms: Room[], columnsCount: number) => {
        const columns = Array.from({length: columnsCount}, () => [] as Room[]);
        rooms.forEach((room, index) => {
            columns[index % columnsCount].push(room);
        });
        return columns;
    };

    const columns = distributeRooms(rooms, 3);

    const openRoomOverlay = (room: Room) => {
        setSelectedRoom(room);
        setIsOverlayOpen(true);
    };

    return (
        <div className="min-h-screen">
            <Navbar/>
            <main className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div className="flex justify-between items-center mb-12"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
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
                        <PlusCircle className="h-5 w-5 mr-2 mt-0.5 group-hover:animate-spin-slow"/>
                        <span className="font-semibold">Add New Room</span>
                    </Link>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col space-y-6">
                            {column.map((room, roomIndex) => {
                                const RoomIcon = room.icon;
                                return (
                                    <motion.div
                                        key={roomIndex}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
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
                                                        <RoomIcon className="h-6 w-6 mr-2"/>
                                                        <h3 className="font-semibold text-lg">
                                                            {room.name}
                                                        </h3>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <span className="sr-only">
                                                                    Open menu
                                                                </span>
                                                                <MoreHorizontal className="h-4 w-4"/>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Pencil className="mr-2 h-4 w-4"/>
                                                                <span>Edit</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Trash2 className="mr-2 h-4 w-4"/>
                                                                <span>Delete</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <DeviceGrid
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
                    ))}
                </div>
            </main>
            <Footer/>
            {selectedRoom && (
                <RoomOverlay
                    room={selectedRoom}
                    isOpen={isOverlayOpen}
                    onClose={() => setIsOverlayOpen(false)}
                    toggleDeviceStatus={toggleDeviceStatusInOverlay}
                />
            )}
        </div>
    );
}