'use client';

import React, { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlusCircle, Wifi, Sofa } from 'lucide-react';

// Helper function to get the appropriate icon
const getRoomIcon = (iconName: string) => {
    return (LucideIcons as any)[iconName] || Sofa;
};

export default function RoomList() {
    const [rooms, setRooms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const router = useRouter();

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

    return (
        <Card className="w-full bg-white rounded-2xl shadow-md overflow-hidden border-0 bg-opacity-80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Rooms</CardTitle>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => router.push('/rooms/addRoom')}
                >
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Add Room</span>
                </Button>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className="text-center text-gray-500">Loading rooms...</div>
                ) : fetchError ? (
                    <div className="text-center text-black">{fetchError}</div>
                ) : (
                    <div className="space-y-4">
                        {rooms.map((room) => {
                            const Icon = room.icon;

                            return (
                                <div
                                    key={room.id}
                                    className="flex items-center justify-between space-x-4 rounded-xl bg-gray-50 p-4 cursor-pointer hover:bg-gray-100"
                                    onClick={() => router.push('/rooms')}
                                >
                                    {/* Room Details */}
                                    <div className="flex items-center space-x-4">
                                        <Icon className="h-6 w-6" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">{room.name}</h3>
                                            <div className="flex space-x-2 text-xs text-gray-500">
                                                <div className="flex items-center">
                                                    <Wifi className="mr-1 h-3 w-3" />
                                                    {room.totalDevices} Device(s)
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chevron */}
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
