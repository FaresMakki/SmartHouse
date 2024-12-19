"use client"

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbarHome";
import { Footer } from "@/components/general-footer";
import { PlusCircle } from 'lucide-react';
import Link from "next/link";

interface Room {
    id: string;
    name: string;
    icon: React.ElementType;
    totalDevices: number;
}

const getRoomIcon = (iconName: string): React.ElementType => {
    const normalizedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase();
    // @ts-ignore
    return Icons[normalizedIconName] || Icons.Home;
};

const generateRandomData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        value: Math.floor(Math.random() * 100),
    }));
};

function RoomOverview() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isPending, startTransition] = useTransition();
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        startTransition(() => {
            fetch("http://localhost:3001/user/getAllRoom", {
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
                            data.success.slice(0, 4).map((room: any) => ({
                                id: room._id,
                                name: room.name,
                                icon: getRoomIcon(room.icon),
                                totalDevices: room.devices.length,
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

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (fetchError) {
        return <div className="text-red-500">{fetchError}</div>;
    }

    if (rooms.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-500">
                <Icons.Sofa className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium">No rooms available. Try adding a new one!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rooms.map((room, index) => {
                const RoomIcon = room.icon;
                const data = generateRandomData();
                return (
                    <motion.div
                        key={room.id}
                        className="col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    <RoomIcon className="h-4 w-4 inline-block mr-2" />
                                    {room.name}
                                </CardTitle>
                                <div className="text-xs text-muted-foreground">{room.totalDevices} devices</div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{data[data.length - 1].value}kWh</div>
                                <p className="text-xs text-muted-foreground">+{data[1].value}% from last week</p>
                                <div className="h-[80px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <XAxis dataKey="day" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        return (
                                                            <div className="bg-background p-2 rounded-md shadow-md">
                                                                <p className="text-sm">Day {payload[0].payload.day}</p>
                                                                <p className="text-sm font-bold">{payload[0].value}kWh</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#FF8343"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default function DashboardPage() {
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
                        Dashboard
                    </h1>
                    <Link
                        className="flex flex-row px-3 py-1.5 group border-2 rounded-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 ease-in-out"
                        href="/rooms/addRoom"
                    >
                        <PlusCircle className="h-5 w-5 mr-2 mt-0.5 group-hover:animate-spin-slow" />
                        <span className="font-semibold">Add New Room</span>
                    </Link>
                </motion.div>
                <RoomOverview />
            </main>
            <Footer />
        </div>
    );
}