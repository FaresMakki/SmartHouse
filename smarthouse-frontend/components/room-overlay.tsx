import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Tabs, TabsContent} from "@radix-ui/react-tabs";
import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Power, Wifi} from "lucide-react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

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


interface RoomOverlayProps {
    room: Room;
    isOpen: boolean;
    onClose: () => void;
    toggleDeviceStatus: (deviceIndex: number) => void;
}

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
            <DialogContent className="sm:max-w-[900px] w-full max-h-[90vh] min-h-[60vh] h-auto flex flex-col p-4 sm:p-6 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl">{room.name} Overview</DialogTitle>
                </DialogHeader>
                <div className="flex-grow mt-4">
                    {/* Tabs for md and below */}
                    <div className="block lg:hidden">
                        <Tabs defaultValue="devices" className="w-full h-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="devices">Devices</TabsTrigger>
                                <TabsTrigger value="consumption">Monthly Consumption</TabsTrigger>
                            </TabsList>
                            <TabsContent value="devices" className="h-full">
                                <h3 className="text-base sm:text-lg font-semibold mb-2">Devices</h3>
                                <ScrollArea className="h-[300px] sm:h-[400px] lg:h-[calc(100%-2rem)] pr-4">
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
                                                                {device.status ? "On" : "Off"}
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
                            </TabsContent>
                            <TabsContent value="consumption" className="h-full">
                                <h3 className="text-base sm:text-lg font-semibold mb-2">Monthly Consumption</h3>
                                <div className="h-[300px] sm:h-[400px] lg:h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={consumptionData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
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
                                                contentStyle={{
                                                    background: "white",
                                                    border: "1px solid #e2e8f0",
                                                    borderRadius: "4px",
                                                }}
                                                labelStyle={{ color: "#1a202c", fontWeight: "bold" }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="consumption"
                                                stroke="#F97316"
                                                strokeWidth={2}
                                                dot={{ fill: "#F97316", strokeWidth: 2, r: 4 }}
                                                activeDot={{
                                                    r: 6,
                                                    fill: "#F97316",
                                                    stroke: "white",
                                                    strokeWidth: 2,
                                                }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-lg font-semibold">Total Consumption</p>
                                    <p className="text-2xl font-bold text-orange-500">{totalConsumption} kWh</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Original Layout for lg and above */}
                    <div className="hidden lg:visible lg:flex-grow lg:flex flex-col md:flex-row gap-4 mt-4 overflow-hidden">
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
                                                <IconComponent className="h-6 w-6"/>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900">{device.name}</h3>
                                                    <div className="flex space-x-2 text-xs text-gray-500">
                                                        <div className="flex items-center">
                                                            <Power className="mr-1 h-3 w-3"/>
                                                            {device.status ? 'On' : 'Off'}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Wifi className="mr-1 h-3 w-3"/>
                                                            Connected
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div
                                                    className="text-sm font-semibold text-gray-900">{device.consumption} kWh
                                                </div>
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
                                    <LineChart data={consumptionData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
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
                                            contentStyle={{
                                                background: 'white',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '4px'
                                            }}
                                            labelStyle={{color: '#1a202c', fontWeight: 'bold'}}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="consumption"
                                            stroke="#F97316"
                                            strokeWidth={2}
                                            dot={{fill: '#F97316', strokeWidth: 2, r: 4}}
                                            activeDot={{r: 6, fill: '#F97316', stroke: 'white', strokeWidth: 2}}
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
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RoomOverlay;