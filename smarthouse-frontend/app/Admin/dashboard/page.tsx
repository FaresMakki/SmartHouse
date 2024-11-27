"use client"
import React, { useState } from "react";
import AdminSideBar from "@/components/adminsideBar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Adminglobaltrend from "@/components/admin-global-trend";
import {Home, Power, Wifi, Smartphone, Grid, Globe, UserPlus, Users} from "lucide-react";
import SectionList from "@/components/section-list";

const Page = () => {
    const [data, setData] = useState([{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },{ name: 'Page B', uv: 320, pv: 2400, amt: 2400 },{ name: 'Page C', uv: 240, pv: 2400, amt: 2400 },{ name: 'Page D', uv: 340, pv: 2400, amt: 2400 }]);
    const section1=[
        {
            title: 'Total Devices Number',
            value: 1000000,
            perc: '10.00%',
            icon: <Smartphone className="w-6 h-6 text-blue-500"/>,
        },
        {
            title: 'Active Devices',
            value: 80000,
            perc: '0.00%',
            icon: <Power className="w-6 h-6 text-green-500"/>,
        },
        {
            title: 'Most Used Devices',
            value: 'Router',
            perc: '0.00%',
            icon: <Wifi className="w-6 h-6 text-orange-500"/>,
        },
        {
            title: 'Most Used Category',
            value: 5000,
            perc: '0.00%',
            icon: <Grid className="w-6 h-6 text-purple-500"/>,
        },
    ]
    const section2=[
        {
            title: 'Total User Number',
            value: 800000,
            perc: '10.00%',
            icon: <Users className="w-6 h-6 text-blue-500"/>,
        },
        {
            title: 'New Account This Month',
            value: 700,
            perc: '0.00%',
            icon: <UserPlus className="w-6 h-6 text-green-500"/>,
        },
        {
            title: 'Most Active Region',
            value: 'Europe',
            perc: '0.00%',
            icon: <Globe className="w-6 h-6 text-orange-500"/>,
        },
        {
            title: 'Configured Rooms Number',
            value: 5000,
            perc: '0.00%',
            icon: <Home className="w-6 h-6 text-purple-500"/>,
        },
    ]


    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">

            <AdminSideBar  />


            <div className="flex flex-col md:ml-64 transition-all duration-300">
                <div className="mt-14 p-4">



                    <SectionList sections={section1}/>
                    <Adminglobaltrend/>
                    <div className={"mt-8"}>
                        <SectionList sections={section2}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;
