"use client"

import React from "react";
import { motion } from "framer-motion";
import { Power, Zap, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Device {
    name: string;
    icon: React.ElementType;
    status: boolean;
    model?: string;
    dateAdded?: string;
    lastTurnedOn?: string;
    consumption?: number;
}

interface DeviceGridProps {
    devices: Device[];
    toggleDeviceStatus: (deviceIndex: number) => void;
    openRoomOverlay: () => void;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices, toggleDeviceStatus, openRoomOverlay }) => {
    const visibleDevices = devices.slice(0, 6);
    const hasMoreDevices = devices.length > 6;

    return (
        <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {visibleDevices.map((device, deviceIndex) => {
                    const IconComponent = device.icon;
                    return (
                        <TooltipProvider key={deviceIndex}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        className={`p-4 rounded-xl shadow-none flex flex-col items-center justify-between cursor-pointer transition-all duration-300 ease-in-out ${
                                            device.status
                                                ? "bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200"
                                                : "bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200"
                                        }`}
                                        onClick={(e: { stopPropagation: () => void; }) => {
                                            e.stopPropagation();
                                            toggleDeviceStatus(deviceIndex);
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className={`p-2 rounded-full ${
                                            device.status ? "bg-emerald-200" : "bg-slate-200"
                                        }`}>
                                            <IconComponent
                                                className={`h-8 w-8 ${
                                                    device.status ? "text-emerald-700" : "text-slate-700"
                                                }`}
                                            />
                                        </div>
                                        <div className="w-full text-center mt-2">
                                            <p className={`text-sm font-medium truncate ${
                                                device.status ? "text-emerald-800" : "text-slate-800"
                                            }`}>
                                                {device.name}
                                            </p>
                                            <div className="flex items-center justify-center mt-1 space-x-1">
                                                <Power className={`h-3 w-3 ${device.status ? "text-emerald-500" : "text-slate-500"}`} />
                                                <p className={`text-xs ${
                                                    device.status ? "text-emerald-600" : "text-slate-600"
                                                }`}>
                                                    {device.status ? "On" : "Off"}
                                                </p>
                                            </div>
                                            {device.consumption && (
                                                <div className="flex items-center justify-center mt-1 space-x-1">
                                                    <Zap className="h-3 w-3 text-amber-500" />
                                                    <p className="text-xs text-amber-600">{device.consumption} kWh</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <div className="text-xs">
                                        <p><strong>Model:</strong> {device.model || "N/A"}</p>
                                        <p><strong>Added:</strong> {device.dateAdded || "N/A"}</p>
                                        <p><strong>Last active:</strong> {device.lastTurnedOn || "N/A"}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
            </div>
            {hasMoreDevices && (
                <div
                    className="absolute -inset-x-0.5 -bottom-0.5 backdrop-blur-md opacity-80 bg-white/30 rounded-b-xl flex items-end justify-center pb-4 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        openRoomOverlay();
                    }}
                >
                    <motion.div
                        whileHover={{ y: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-600 flex flex-col items-center"
                    >
                        <ChevronDown className="h-6 w-6" />
                    </motion.div>
                </div>
            )}

        </div>
    );
};

export default DeviceGrid;