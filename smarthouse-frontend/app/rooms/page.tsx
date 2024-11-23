"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    PlusCircle,
    Pencil,
    Trash2,
    Tv,
    Bed,
    CookingPot,
    Bath,
    Lightbulb,
    Fan,
    Thermometer,
    Power,
    Wifi,
} from "lucide-react";
import Navbar from "@/components/navbarHome";
import { Footer } from "@/components/generalFooter";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import RoomOverlay from "@/components/room-overlay";
import DeviceGrid from "@/components/device-grid";

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

interface DeviceGridProps {
    devices: Device[];
    toggleDeviceStatus: (deviceIndex: number) => void;
}

const initialRooms: Room[] = [
    {
        name: "Living Room",
        icon: Tv,
        devices: [
            { name: "TV", icon: Tv, status: true, model: "Samsung QLED", dateAdded: "2023-01-15", lastTurnedOn: "2023-05-30 14:30", consumption: 45 },
            { name: "Main Light", icon: Lightbulb, status: true, model: "Philips Hue", dateAdded: "2023-02-01", lastTurnedOn: "2023-05-30 19:00", consumption: 10 },
            { name: "Secondary Light", icon: Lightbulb, status: true, model: "Philips Hue", dateAdded: "2023-02-01", lastTurnedOn: "2023-05-30 19:00", consumption: 10 },
            { name: "Small Light", icon: Lightbulb, status: true, model: "Philips Hue", dateAdded: "2023-02-01", lastTurnedOn: "2023-05-30 19:00", consumption: 10 },
            { name: "Small Light", icon: Lightbulb, status: true, model: "Philips Hue", dateAdded: "2023-02-01", lastTurnedOn: "2023-05-30 19:00", consumption: 10 },
            { name: "Small Light", icon: Lightbulb, status: true, model: "Philips Hue", dateAdded: "2023-02-01", lastTurnedOn: "2023-05-30 19:00", consumption: 10 },
            { name: "Fan", icon: Fan, status: false, model: "Dyson Cool", dateAdded: "2023-03-10", lastTurnedOn: "2023-05-29 12:00", consumption: 30 },
            { name: "Smart Speaker", icon: Tv, status: true, model: "Amazon Echo", dateAdded: "2023-04-05", lastTurnedOn: "2023-05-30 08:00", consumption: 5 },
        ],
    },
    {
        name: "Bedroom",
        icon: Bed,
        devices: [
            { name: "Bedside Lamp", icon: Lightbulb, status: true, model: "LIFX Color", dateAdded: "2023-01-20", lastTurnedOn: "2023-05-30 22:00", consumption: 8 },
            { name: "Ceiling Fan", icon: Fan, status: true, model: "Honeywell QuietSet", dateAdded: "2023-02-15", lastTurnedOn: "2023-05-30 21:30", consumption: 25 },
            { name: "Smart TV", icon: Tv, status: false, model: "LG OLED", dateAdded: "2023-03-05", lastTurnedOn: "2023-05-29 23:00", consumption: 35 },
        ],
    },
    {
        name: "Kitchen",
        icon: CookingPot,
        devices: [
            { name: "Refrigerator", icon: Thermometer, status: true, model: "Samsung Smart Fridge", dateAdded: "2023-01-10", lastTurnedOn: "2023-05-30 00:00", consumption: 40 },
            { name: "Microwave", icon: CookingPot, status: false, model: "Panasonic Inverter", dateAdded: "2023-02-20", lastTurnedOn: "2023-05-30 12:30", consumption: 15 },
            { name: "Coffee Maker", icon: CookingPot, status: true, model: "Breville Precision", dateAdded: "2023-03-15", lastTurnedOn: "2023-05-30 07:00", consumption: 10 },
        ],
    },
    {
        name: "Bathroom",
        icon: Bath,
        devices: [
            { name: "Smart Mirror", icon: Lightbulb, status: true, model: "Simplehuman Sensor Mirror", dateAdded: "2023-01-25", lastTurnedOn: "2023-05-30 07:30", consumption: 5 },
            { name: "Exhaust Fan", icon: Fan, status: false, model: "Panasonic WhisperCeiling", dateAdded: "2023-02-28", lastTurnedOn: "2023-05-30 07:35", consumption: 12 },
        ],
    },
];


export default function RoomsManagement() {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const toggleDeviceStatus = (roomIndex: number, deviceIndex: number) => {
        setRooms((prevRooms) =>
            prevRooms.map((room, rIndex) => {
                if (rIndex === roomIndex) {
                    return {
                        ...room,
                        devices: room.devices.map((device, dIndex) => {
                            if (dIndex === deviceIndex) {
                                return { ...device, status: !device.status };
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
                                ? { ...device, status: !device.status }
                                : device
                        );
                        return { ...room, devices: updatedDevices };
                    }
                    return room;
                })
            );

            // Update selectedRoom after updating the rooms
            setSelectedRoom((prevSelectedRoom) =>
                prevSelectedRoom
                    ? {
                        ...prevSelectedRoom,
                        devices: prevSelectedRoom.devices.map((device, dIndex) =>
                            dIndex === deviceIndex
                                ? { ...device, status: !device.status }
                                : device
                        ),
                    }
                    : null
            );
        }
    };

    const addRoom = () => {
        const newRoom = {
            name: `Room ${rooms.length + 1}`,
            icon: Tv,
            devices: [
                { name: "New Device 1", icon: Lightbulb, status: false },
                { name: "New Device 2", icon: Fan, status: true },
            ],
        };
        setRooms([...rooms, newRoom]);
    };

    const distributeRooms = (rooms: Room[], columnsCount: number) => {
        const columns = Array.from({ length: columnsCount }, () => [] as Room[]);
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
            <Navbar />
            <main className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div className="flex justify-between items-center mb-12"
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
                    <Button
                        variant="outline"
                        className="group border-2 rounded-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 ease-in-out"
                        onClick={addRoom}
                    >
                        <PlusCircle className="h-5 w-5 mr-2 group-hover:animate-spin-slow" />
                        <span className="font-semibold">Add New Room</span>
                    </Button>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col space-y-6">
                            {column.map((room, roomIndex) => {
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
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <span className="sr-only">
                                                                    Open menu
                                                                </span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                <span>Edit</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Trash2 className="mr-2 h-4 w-4" />
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
            <Footer />
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