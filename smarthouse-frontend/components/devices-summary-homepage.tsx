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
        <Card className="w-full bg-white rounded-2xl shadow-md overflow-hidden border-0 bg-opacity-80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Connected Devices</CardTitle>
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
                            className="flex items-center justify-between space-x-4 rounded-xl bg-gray-50 p-4"
                        >
                            <div className="flex items-center space-x-4">
                                <device.icon className="h-6 w-6" />
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{device.name}</h3>
                                    <div className="flex space-x-2 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <Power className="mr-1 h-3 w-3" />
                                            {device.status}
                                        </div>
                                        <div className="flex items-center">
                                            <Wifi className="mr-1 h-3 w-3" />
                                            Connected
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-semibold text-gray-900">{device.consumption}</div>
                                <div className="text-xs text-gray-500">Consumption</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}