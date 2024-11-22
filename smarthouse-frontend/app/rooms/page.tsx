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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Device {
    id: string;
    name: string;
    icon: React.ElementType;
    status: boolean;
    size?: string;
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
            { id: "tv-LR", name: "TV", icon: Tv, status: true, consumption: 15 },
            { id: "main-light-LR", name: "Main Light", icon: Lightbulb, status: true, consumption: 10 },
            { id: "fan-LR", name: "Fan", icon: Fan, status: false, consumption: 5 },
            { id: "smart-speaker-LR", name: "Smart Speaker", icon: Tv, status: true, consumption: 7 },
        ],
    },
    {
        name: "Bedroom",
        icon: Bed,
        devices: [
            { id: "lamp-BR", name: "Bedside Lamp", icon: Lightbulb, status: true, model: "LIFX Color", dateAdded: "2023-01-20", lastTurnedOn: "2023-05-30 22:00", consumption: 8 },
            { id: "ceiling-fan-BR", name: "Ceiling Fan", icon: Fan, status: true, model: "Honeywell QuietSet", dateAdded: "2023-02-15", lastTurnedOn: "2023-05-30 21:30", consumption: 25 },
            { id: "tv-BR", name: "Smart TV", icon: Tv, status: false, model: "LG OLED", dateAdded: "2023-03-05", lastTurnedOn: "2023-05-29 23:00", consumption: 35 },
        ],
    },
    {
        name: "Kitchen",
        icon: CookingPot,
        devices: [
            { id: "refrigerator-KT", name: "Refrigerator", icon: Thermometer, status: true, model: "Samsung Smart Fridge", dateAdded: "2023-01-10", lastTurnedOn: "2023-05-30 00:00", consumption: 40 },
            { id: "microwave-KT", name: "Microwave", icon: CookingPot, status: false, model: "Panasonic Inverter", dateAdded: "2023-02-20", lastTurnedOn: "2023-05-30 12:30", consumption: 15 },
            { id: "coffee-maker-KT", name: "Coffee Maker", icon: CookingPot, status: true, model: "Breville Precision", dateAdded: "2023-03-15", lastTurnedOn: "2023-05-30 07:00", consumption: 10 },
        ],
    },
    {
        name: "Bathroom",
        icon: Bath,
        devices: [
            { id: "smart-mirror-BT", name: "Smart Mirror", icon: Lightbulb, status: true, model: "Simplehuman Sensor Mirror", dateAdded: "2023-01-25", lastTurnedOn: "2023-05-30 07:30", consumption: 5 },
            { id: "exhaust-fan-BT", name: "Exhaust Fan", icon: Fan, status: false, model: "Panasonic WhisperCeiling", dateAdded: "2023-02-28", lastTurnedOn: "2023-05-30 07:35", consumption: 12 },
        ],
    },
];

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices, toggleDeviceStatus }) => (
    <div className="grid grid-cols-3 gap-2 mt-4">
        {devices.map((device, deviceIndex) => {
            const IconComponent = device.icon;
            return (
                <div
                    key={deviceIndex}
                    className={`p-2 rounded-md flex flex-col items-center justify-center cursor-pointer ${
                        device.size === "large" ? "col-span-2" : ""
                    } ${device.status ? "bg-green-200" : "bg-red-200"}`}
                    onClick={() => toggleDeviceStatus(deviceIndex)}
                >
                    <IconComponent
                        className={`h-6 w-6 mb-1 ${
                            device.status ? "text-green-900" : "text-red-900"
                        }`}
                    />
                    <p
                        className={`text-xs font-medium text-center ${
                            device.status ? "text-green-900" : "text-red-900"
                        }`}
                    >
                        {device.name}
                    </p>
                </div>
            );
        })}
    </div>
);

const consumptionData = [
    { date: '2023-05-01', consumption: 150 },
    { date: '2023-05-08', consumption: 180 },
    { date: '2023-05-15', consumption: 160 },
    { date: '2023-05-22', consumption: 200 },
    { date: '2023-05-29', consumption: 190 },
];

interface RoomOverlayProps {
    room: Room;
    isOpen: boolean;
    onClose: () => void;
    toggleDeviceStatus: (deviceIndex: number) => void;
}

const RoomOverlay: React.FC<RoomOverlayProps> = ({ room, isOpen, onClose, toggleDeviceStatus }) => {
    const totalConsumption = room.devices.reduce((sum, device) => sum + (device.consumption || 0), 0);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{room.name} Overview</DialogTitle>
                </DialogHeader>
                <div className="flex-grow flex flex-col md:flex-row gap-4 mt-4 overflow-hidden">
                    <div className="w-full md:w-1/2 overflow-hidden">
                        <ScrollArea className="h-[400px] pr-4">
                            <h3 className="text-lg font-semibold mb-2">Devices</h3>
                            {room.devices.map((device, index) => {
                                const IconComponent = device.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between space-x-4 rounded-xl p-4 mb-2 cursor-pointer transition-colors duration-200 ${device.status ? "bg-green-100" : "bg-red-100"}`}
                                        onClick={() => toggleDeviceStatus(index)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <IconComponent className="h-6 w-6" />
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900">{device.name}</h3>
                                                <div className="flex space-x-2 text-xs text-gray-500">
                                                    <div className="flex items-center">
                                                        <Power className="mr-1 h-3 w-3" />
                                                        {device.status ? 'On' : 'Off'}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Wifi className="mr-1 h-3 w-3" />
                                                        Connected
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-gray-900">{device.consumption} kWh</div>
                                            <div className="text-xs text-gray-500">Consumption</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ScrollArea>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-lg font-semibold mb-2">Monthly Consumption</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={consumptionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value} kWh`}
                                    />
                                    <Tooltip
                                        contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                                        labelStyle={{ color: '#1a202c', fontWeight: 'bold' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="consumption"
                                        stroke="#F97316"
                                        strokeWidth={2}
                                        dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, fill: '#F97316', stroke: 'white', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-lg font-semibold">Total Consumption <span className={"font-black"}>Today</span></p>
                            <p className="text-2xl font-bold text-orange-500">{totalConsumption} kWh</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

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
            const roomIndex = rooms.findIndex(room => room.name === selectedRoom.name);
            toggleDeviceStatus(roomIndex, deviceIndex);
            setSelectedRoom(rooms[roomIndex]);
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
        // @ts-ignore
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
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Your Rooms
                    </h1>
                    <Button className="rounded-full bg-orange-600 hover:bg-orange-600/80" onClick={addRoom}>
                        <PlusCircle className="h-5 w-5 mr-2" />
                        Add Room
                    </Button>
                </div>
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