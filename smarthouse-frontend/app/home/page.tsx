"use client"

import React from 'react'
import Navbar from '@/components/navbarHome'
import ConsumptionHint from "@/components/consumption-hint";
import {Footer} from "@/components/generalFooter";
import RoomList from "@/components/rooms-summary";
import DeviceList from "@/components/devices-summary-homepage";


export default function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="p-4 md:p-8">
                <div className="max-w-5xl mx-auto">
                    <ConsumptionHint />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <DeviceList />
                        <RoomList />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}