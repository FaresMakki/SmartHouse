'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeIcon, Bed, Tv, CookingPot, Bath, ChevronRight, PlusCircle, Power, Wifi } from 'lucide-react';

export default function RoomList() {
    const rooms = [
        { name: 'Living Room', devices: 5, active: 2, icon: Tv },
        { name: 'Bedroom', devices: 3, active: 1, icon: Bed },
        { name: 'Kitchen', devices: 4, active: 3, icon: CookingPot },
        { name: 'Bathroom', devices: 2, active: 0, icon: Bath },
    ];

    return (
        <Card className="w-full bg-white rounded-2xl shadow-md overflow-hidden border-0 bg-opacity-80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Rooms</CardTitle>
                <Button variant="outline" size="icon" className="rounded-full">
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Add Room</span>
                </Button>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {rooms.map((room, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between space-x-4 rounded-xl bg-gray-50 p-4"
                        >
                            {/* Room Details */}
                            <div className="flex items-center space-x-4">
                                {/* Dynamically render the icon */}
                                <room.icon className="h-6 w-6" />
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{room.name}</h3>
                                    <div className="flex space-x-2 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <Power className="mr-1 h-3 w-3" />
                                            {room.active} Active
                                        </div>
                                        <div className="flex items-center">
                                            <Wifi className="mr-1 h-3 w-3" />
                                            {room.devices} Devices
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chevron */}
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
