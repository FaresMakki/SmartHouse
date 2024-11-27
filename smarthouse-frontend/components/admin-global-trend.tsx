import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {AnimatePresence,motion} from "framer-motion";

// Mock data for different views
const data = {
    daily: [
        { name: "Monday", consumption: 15 },
        { name: "Tuesday", consumption: 20 },
        { name: "Wednesday", consumption: 18 },
        { name: "Thursday", consumption: 22 },
        { name: "Friday", consumption: 19 },
        { name: "Saturday", consumption: 25 },
        { name: "Sunday", consumption: 23 },
    ],
    weekly: [
        { name: "Week 1", consumption: 100 },
        { name: "Week 2", consumption: 120 },
        { name: "Week 3", consumption: 110 },
        { name: "Week 4", consumption: 120 },
    ],
    monthly: [
        { name: "January", consumption: 450 },
        { name: "February", consumption: 400 },
        { name: "March", consumption: 470 },
        { name: "April", consumption: 420 },
    ],
};

const Adminglobaltrend = () => {
    const [view, setView] = useState("monthly"); // State for current view

    const statics= {daily:{currentConsumption : 450,lastConsumption : 420},weekly:{currentConsumption : 30,lastConsumption : 10},monthly:{currentConsumption : 100,lastConsumption : 50}}
    const animationVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };
    return (
        <Card className="rounded-3xl bg-white bg-opacity-80 border-0 shadow-md" >
            <CardContent className="p-8">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center text-black">
                        {view === "daily"
                            ? "Today's Activity"
                            : view === "weekly"
                                ? "This Week's Activity"
                                : "This Month's Activity"}
                    </h2>

                    <TooltipProvider>
                        <UITooltip>
                            <TooltipTrigger asChild>
                                <div className="text-sm font-medium text-gray-600 flex items-center cursor-help">
                                    <Info className="w-4 h-4 mr-1" />
                                    Last updated: {new Date().toLocaleDateString()}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Data is updated daily at midnight</p>
                            </TooltipContent>
                        </UITooltip>
                    </TooltipProvider>
                </div>

                {/* View Toggle Buttons */}
                <div className="mb-6">
                    <button
                        onClick={() => setView("daily")}
                        className={`px-4 py-2 mr-2 rounded-lg ${
                            view === "daily" ? "bg-white border border-accentOrange text-accentOrange" : "bg-gray-100 border border-gray-300  text-gray-700"
                        }`}
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => setView("weekly")}
                        className={`px-4 py-2 mr-2 rounded-lg  ${
                            view === "weekly" ? "bg-white border border-accentOrange text-accentOrange " : "bg-gray-100 border border-gray-300  text-gray-700"
                        }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setView("monthly")}
                        className={`px-4 py-2 rounded-lg ${
                            view === "monthly" ? "bg-white border border-accentOrange text-accentOrange" : "bg-gray-100 border border-gray-300  text-gray-700"
                        }`}
                    >
                        Monthly
                    </button>
                </div>

                {/* Content Section */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Section */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={view} // Unique key for each view
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={animationVariants}
                            transition={{ duration: 0.3 }}

                        >
                    <div className="md:col-span-1 space-y-8">
                        {/* Current Usage Card */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-black">
                                    {view === "daily"
                                        ? "This daily Usage"
                                        : view === "weekly"
                                            ? "This weekly Usage"
                                            : "This Month Usage"}


                            </h3>
                            <div className="flex items-baseline justify-between">
                                <span className="text-5xl font-bold">

                                    {view === "daily"
                                        ? statics.daily.currentConsumption
                                        : view === "weekly"
                                            ? statics.weekly.currentConsumption
                                            : statics.monthly.currentConsumption}
                                </span>
                                <span className="text-2xl font-medium text-gray-600">kWh</span>
                            </div>
                            <div
                                className={`flex items-center mt-4 ${
                                view === "daily"
                                ? statics.daily.currentConsumption - statics.daily.lastConsumption > 0 ? "text-red-500" : "text-green-500"
                                : view === "weekly"
                                ? statics.weekly.currentConsumption - statics.weekly.lastConsumption > 0 ? "text-red-500" : "text-green-500"
                                : statics.monthly.currentConsumption - statics.monthly.lastConsumption > 0 ? "text-red-500" : "text-green-500"
                                    
                                }`}
                            >
                                {/*{isIncreased ? (*/}
                                {/*    <ArrowUp className="w-5 h-5 mr-1" />*/}
                                {/*) : (*/}
                                {/*    <ArrowDown className="w-5 h-5 mr-1" />*/}
                                {/*)}*/}
                                {view === "daily"
                                    ? statics.daily.currentConsumption - statics.daily.lastConsumption > 0 ? <ArrowUp className="w-5 h-5 mr-1" /> : <ArrowDown className="w-5 h-5 mr-1" />
                                    : view === "weekly"
                                        ? statics.weekly.currentConsumption - statics.weekly.lastConsumption > 0 ? <ArrowUp className="w-5 h-5 mr-1" /> : <ArrowDown className="w-5 h-5 mr-1" />
                                        : statics.monthly.currentConsumption - statics.monthly.lastConsumption > 0 ? <ArrowUp className="w-5 h-5 mr-1" /> : <ArrowDown className="w-5 h-5 mr-1" />}

                                <span className="text-sm font-medium">
                                    {view === "daily"
                                        ? `${Math.abs(statics.daily.currentConsumption - statics.daily.lastConsumption)} kWh ${statics.daily.currentConsumption - statics.daily.lastConsumption > 0  ? "increase" : "decrease"}`
                                        : view === "weekly"
                                            ? `${Math.abs(statics.weekly.currentConsumption - statics.weekly.lastConsumption)} kWh ${statics.weekly.currentConsumption - statics.weekly.lastConsumption > 0  ? "increase" : "decrease"}`
                                            : `${Math.abs(statics.monthly.currentConsumption - statics.monthly.lastConsumption)} kWh ${statics.monthly.currentConsumption - statics.monthly.lastConsumption > 0  ? "increase" : "decrease"}`}
                                </span>
                            </div>
                        </div>

                        {/* Monthly Comparison Card */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-black">
                                {view === "daily"
                                    ? "This daily comparison"
                                    : view === "weekly"
                                        ? "This weekly comparison"
                                        : "This Month comparison"}

                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                  {view === "daily"
                                    ? statics.daily.currentConsumption - statics.daily.lastConsumption > 0 ? "the Global energy usage has increased compared to last day." : "the Global energy usage has decreased compared to last day."
                                    : view === "weekly"
                                        ? statics.weekly.currentConsumption - statics.weekly.lastConsumption > 0 ? "the Global energy usage has increased compared to last week." : "the Global energy usage has decreased compared to last week."
                                        : statics.monthly.currentConsumption - statics.monthly.lastConsumption > 0 ? "the Global energy usage has increased compared to last month." : "the Global energy usage has decreased compared to last month."}
                            </p>
                        </div>
                    </div>
                        </motion.div>
                    </AnimatePresence>
                    {/* Right Section */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
                            <h3 className="text-xl font-semibold mb-6 text-black">{`${view.charAt(0).toUpperCase() + view.slice(1)} Consumption Trend`}</h3>
                            <div className="h-[300px] md:pt-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data[view]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="name"
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
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Adminglobaltrend;
