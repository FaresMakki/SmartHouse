'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tv, Cookie, Bed, Power } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function RoomList() {
    const rooms = [
        { name: 'Living Room', icon: Tv },
        { name: 'Bedroom', icon: Bed },
        { name: 'Kitchen', icon: Cookie },
    ];

    const [roomStates, setRoomStates] = useState(() =>
        rooms.reduce((acc, room) => {
            acc[room.name] = false; // All devices initially off
            return acc;
        }, {} as Record<string, boolean>)
    );

    const toggleRoomState = (roomName: string) => {
        setRoomStates((prevState) => ({
            ...prevState,
            [roomName]: !prevState[roomName],
        }));
    };

    const handleTurnOffAllDevices = () => {
        setRoomStates((prevState) =>
            Object.keys(prevState).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {} as Record<string, boolean>)
        );
        console.log("Turned off all devices in all rooms");
    };

    return (
        <div className="flex-1">
            <Card className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Rooms</CardTitle>
                    <TooltipProvider>
                        <UITooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleTurnOffAllDevices}
                                    className="flex items-center space-x-2"
                                >
                                    <Power className="h-4 w-4" />
                                    <span>Turn Off All</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Turn off all devices in all rooms.
                            </TooltipContent>
                        </UITooltip>
                    </TooltipProvider>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {rooms.map((room, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 rounded-xl bg-gray-50 p-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <room.icon className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{room.name}</h3>
                                </div>
                                <TooltipProvider>
                                    <UITooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={() => toggleRoomState(room.name)}
                                                className={`h-8 w-8 rounded-full border-2 ${
                                                    roomStates[room.name]
                                                        ? 'bg-green-600 border-green-700'
                                                        : 'bg-red-600 border-red-700'
                                                } transition-colors`}
                                                aria-label={`${
                                                    roomStates[room.name] ? 'Turn off' : 'Turn on'
                                                } devices in ${room.name}`}
                                            >
                                                <Power
                                                    className={`h-4 w-4 text-white mx-auto transition-transform ${
                                                        roomStates[room.name] ? 'rotate-0' : 'rotate-180'
                                                    }`}
                                                />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {roomStates[room.name]
                                                ? `Turn off devices in ${room.name}`
                                                : `Turn on devices in ${room.name}`}
                                        </TooltipContent>
                                    </UITooltip>
                                </TooltipProvider>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
