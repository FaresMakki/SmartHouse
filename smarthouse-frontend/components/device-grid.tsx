"use client";

import React from "react";
import { motion } from "framer-motion";
import { Power, Zap, ChevronDown, Plus, Router, Network } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import * as Icons from 'lucide-react';

interface Device {
    deviceType: string;
    deviceName: string;
    modelName: string;
    picture: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    consumption: number;
    Settings: {
        temperature?: { value: number; unit: string };
        powerState?: { value: string };
        brightness?: { value: number };
        color?: { value: string };
        time?: { value: string };
    };
    _id: string;
}

interface DeviceGridProps {
    roomId: string;
    devices: Device[];
    toggleDeviceStatus: (deviceIndex: number) => void;
    openRoomOverlay: () => void;
}

const iconMap: { [key: string]: React.ElementType } = {
    "EthernetPort": Network,
    "Router": Router,
};

const DeviceGrid: React.FC<DeviceGridProps> = ({ roomId, devices, toggleDeviceStatus, openRoomOverlay }) => {
    const router = useRouter();

    if (devices.length === 0) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer transition-colors duration-300 hover:border-gray-500 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/rooms/${roomId}/addDevice`)}
            >
                <Plus className="h-8 w-8 text-gray-400 mb-2 group-hover:text-gray-600 transition-colors" />
                <p className="text-gray-500 group-hover:text-gray-600 transition-colors text-sm">Add a device</p>
            </motion.div>
        );
    }

    const visibleDevices = devices.slice(0, 6);
    const hasMoreDevices = devices.length > 6;

    return (
        <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {visibleDevices.map((device, deviceIndex) => {
                    const IconComponent = Icons[device.picture as keyof typeof Icons] || Icons.Laptop;
                    const isOn = device.status === "on";

                    return (
                        <TooltipProvider key={device._id}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        className={`p-4 rounded-xl shadow-none flex flex-col items-center justify-between cursor-pointer transition-all duration-300 ease-in-out ${
                                            isOn
                                                ? "bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200"
                                                : "bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200"
                                        }`}
                                        onClick={(e: { stopPropagation: () => void; }) => {
                                            e.stopPropagation();
                                            toggleDeviceStatus(deviceIndex);
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className={`p-2 rounded-full ${isOn ? "bg-emerald-200" : "bg-slate-200"}`}>
                                            <IconComponent className={`h-8 w-8 ${isOn ? "text-emerald-700" : "text-slate-700"}`} />
                                        </div>
                                        <div className="w-full text-center mt-2">
                                            <p className={`text-sm font-medium truncate ${isOn ? "text-emerald-800" : "text-slate-800"}`}>
                                                {device.deviceName}
                                            </p>
                                            <div className="flex items-center justify-center mt-1 space-x-1">
                                                <Power className={`h-3 w-3 ${isOn ? "text-emerald-500" : "text-slate-500"}`} />
                                                <p className={`text-xs ${isOn ? "text-emerald-600" : "text-slate-600"}`}>
                                                    {isOn ? "On" : "Off"}
                                                </p>
                                            </div>
                                            {device.Settings.powerState && (
                                                <div className="flex items-center justify-center mt-1 space-x-1">
                                                    <Zap className="h-3 w-3 text-amber-500" />
                                                    <p className="text-xs text-amber-600">{device.Settings.powerState.value}</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <div className="text-xs">
                                        <p><strong>Model:</strong> {device.modelName || "N/A"}</p>
                                        <p><strong>Added:</strong> {new Date(device.createdAt).toLocaleString() || "N/A"}</p>
                                        <p><strong>Updated:</strong> {new Date(device.updatedAt).toLocaleString() || "N/A"}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
            </div>
            {hasMoreDevices && (
                <div
                    className="absolute bg-gradient-to-b h-1/4 from-transparent via-white to-white -inset-x-0.5 -bottom-0.5 rounded-b-xl flex items-end justify-center pb-4 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        openRoomOverlay();
                    }}
                >
                    <motion.div whileHover={{ y: 5 }} whileTap={{ scale: 0.95 }} className="text-gray-600 flex flex-col items-center">
                        <ChevronDown className="h-6 w-6" />
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default DeviceGrid;
