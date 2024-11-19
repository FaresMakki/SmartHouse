"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Tv, Thermometer, PlusCircle, Power, Wifi } from 'lucide-react'

const devices = [
    { name: 'Living Room Light', icon: Lightbulb, status: 'On', consumption: '15W' },
    { name: 'Smart TV', icon: Tv, status: 'Off', consumption: '0W' },
    { name: 'Thermostat', icon: Thermometer, status: 'Active', consumption: '5W' },
]

export default function DeviceList() {
    return (
        <div className="flex-1">
            <Card className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl sm:text-2xl font-bold">Connected Devices</CardTitle>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <PlusCircle className="h-4 w-4" />
                        <span className="sr-only">Add device</span>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {devices.map((device, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 rounded-xl bg-gray-50 p-4"
                            >
                                <div className="flex-shrink-0">
                                    <device.icon className="h-6 w-6 text-orange-500" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{device.name}</h3>
                                    <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Power className="mr-1 h-4 w-4" />
                                            {device.status}
                                        </div>
                                        <div className="flex items-center">
                                            <Wifi className="mr-1 h-4 w-4" />
                                            Connected
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-left sm:text-right">
                                    <div className="text-base sm:text-lg font-semibold text-gray-900">{device.consumption}</div>
                                    <div className="text-sm text-gray-500">Consumption</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}