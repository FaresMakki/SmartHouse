"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { HomeIcon, Lightbulb, Thermometer, Tv, Fan, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbarHome'
import Sidebar from '@/components/sidebarHome'
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"

const energyData = [
    { name: 'Week 1', thisMonth: 400, lastMonth: 340 },
    { name: 'Week 2', thisMonth: 300, lastMonth: 320 },
    { name: 'Week 3', thisMonth: 350, lastMonth: 380 },
    { name: 'Week 4', thisMonth: 280, lastMonth: 300 },
]

const rooms = [
    { name: 'Living Room', devices: 5, active: 2 },
    { name: 'Bedroom', devices: 3, active: 1 },
    { name: 'Kitchen', devices: 4, active: 3 },
    { name: 'Bathroom', devices: 2, active: 0 },
]

const devices = [
    { name: 'Living Room Light', icon: Lightbulb, status: true },
    { name: 'TV', icon: Tv, status: false },
    { name: 'Thermostat', icon: Thermometer, status: true },
    { name: 'Bedroom Fan', icon: Fan, status: false },
]

export default function sidebarHome() {
    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="flex">
                    <Sidebar />
                    <SidebarInset>
                        <main className="flex-1 p-4 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-black">Smart Home Dashboard</h1>
                                <SidebarTrigger asChild>
                                    <Button variant="ghost" className="md:hidden rounded-full">
                                        <span className="sr-only">Toggle sidebar</span>
                                        <ChevronRight className="h-6 w-6" />
                                    </Button>
                                </SidebarTrigger>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Energy Dashboard */}
                                <Card className="bg-white shadow-md rounded-3xl overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Energy Consumption</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="h-[200px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={energyData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                                    <XAxis dataKey="name" stroke="#333" />
                                                    <YAxis stroke="#333" />
                                                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
                                                    <Line type="monotone" dataKey="thisMonth" stroke="#000" strokeWidth={2} dot={{ fill: '#000', strokeWidth: 2, r: 4 }} />
                                                    <Line type="monotone" dataKey="lastMonth" stroke="#888" strokeWidth={2} dot={{ fill: '#888', strokeWidth: 2, r: 4 }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-600">
                                            Your energy consumption this month is slightly lower than last month. Keep up the good work!
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Room Overview */}
                                <Card className="bg-white shadow-md rounded-3xl overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Rooms</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {rooms.map((room, index) => (
                                                <Button key={index} variant="outline" className="h-auto flex items-center justify-between p-4 bg-white border-gray-200 hover:bg-gray-50 transition-colors duration-200 rounded-full">
                                                    <div className="flex items-center">
                                                        <HomeIcon className="mr-2 h-4 w-4 text-black" />
                                                        <div className="text-left">
                                                            <div className="font-semibold text-black">{room.name}</div>
                                                            <div className="text-sm text-gray-500">{room.active} of {room.devices} devices active</div>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Device Overview */}
                                <Card className="lg:col-span-2 bg-white shadow-md rounded-3xl overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Devices</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {devices.map((device, index) => (
                                                <div key={index} className="flex items-center justify-between bg-white p-4 rounded-full border border-gray-200 transition-all duration-200 hover:shadow-md">
                                                    <div className="flex items-center space-x-4">
                                                        <device.icon className="h-6 w-6 text-black" />
                                                        <span className="text-black font-medium">{device.name}</span>
                                                    </div>
                                                    <Switch checked={device.status} className="data-[state=checked]:bg-black" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </main>
                    </SidebarInset>
                </div>
            </div>
        </div>
    )
}