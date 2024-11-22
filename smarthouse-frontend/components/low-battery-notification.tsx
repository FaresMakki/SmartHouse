"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { BatteryLow } from 'lucide-react';

const devices = [
    { name: "Living Room Light", battery: 15 },
    { name: "Smart TV Remote", battery: 5 },
    { name: "Thermostat", battery: 20 },
    { name: "Kitchen Sensor", battery: 8 },
    { name: "Bedroom Lamp", battery: 18 },
];

export default function LowBatteryNotification() {
    useEffect(() => {
        const lowBatteryDevices = devices
            .filter((device) => device.battery <= 20)
            .slice(0, 3);

        lowBatteryDevices.forEach((device, index) => {
            const inVokeToast = setTimeout(() => {
                toast("Low Battery Alert", {
                    description: (
                        <div className="flex items-center space-x-3">
                            <BatteryLow className="h-6 w-6 text-red-500" />
                            <div>
                                <p className="font-semibold text-sm text-gray-900">{device.name}</p>
                                <p className="text-xs text-gray-500">Battery: {device.battery}%</p>
                            </div>
                        </div>
                    ),
                    duration: 30000,
                });
            });
            return () => clearTimeout(inVokeToast)
        });
    }, []);

    return null;
}