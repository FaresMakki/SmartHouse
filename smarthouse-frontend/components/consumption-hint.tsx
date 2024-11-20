"use client"

import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, ArrowDown, Zap, Info } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tooltip as UITooltip } from "@/components/ui/tooltip"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const currentMonthConsumption = 450; // kWh
const lastMonthConsumption = 420; // kWh
const monthlyData = [
    { name: 'Week 1', consumption: 100 },
    { name: 'Week 2', consumption: 120 },
    { name: 'Week 3', consumption: 110 },
    { name: 'Week 4', consumption: 120 },
];

export default function ConsumptionHint () {
    const consumptionDifference = currentMonthConsumption - lastMonthConsumption;
    const isIncreased = consumptionDifference > 0;

    return (
        <Card className="rounded-3xl bg-white bg-opacity-80 border-0  shadow-md">
            <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold flex items-center text-black">
                        {/*<Zap className="w-10 h-10 mr-3 text-accentOrange" />*/}
                        This Month's Activity
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-8">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-black">This Month's Usage</h3>
                            <div className="flex items-baseline justify-between">
                                <span className="text-5xl font-bold">{currentMonthConsumption}</span>
                                <span className="text-2xl font-medium text-gray-600">kWh</span>
                            </div>
                            <div className={`flex items-center mt-4 ${isIncreased ? 'text-red-500' : 'text-green-500'}`}>
                                {isIncreased ? (
                                    <ArrowUp className="w-5 h-5 mr-1" />
                                ) : (
                                    <ArrowDown className="w-5 h-5 mr-1" />
                                )}
                                <span className="text-sm font-medium">
                                    {Math.abs(consumptionDifference)} kWh {isIncreased ? 'increase' : 'decrease'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-black">Monthly Comparison</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {isIncreased
                                    ? 'Your energy usage has increased compared to last month. Consider implementing energy-saving measures to reduce consumption and costs.'
                                    : 'Great job! Your energy usage has decreased compared to last month. Keep up the good work in maintaining energy efficiency.'}
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
                            <h3 className="text-xl font-semibold mb-6 text-black">Consumption Trend</h3>
                            <div className="h-[300px] md:pt-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                                            contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                                            labelStyle={{ color: '#1a202c', fontWeight: 'bold' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="consumption"
                                            stroke="#F97316"
                                            strokeWidth={2}
                                            dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, fill: '#F97316', stroke: 'white', strokeWidth: 2 }}
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
}