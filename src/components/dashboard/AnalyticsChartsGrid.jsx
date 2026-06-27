"use client";

import React from 'react';
import { Card } from '@heroui/react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    AreaChart, Area
} from 'recharts';

export function AnalyticsChartsGrid({ performanceData = [], timelineData = [] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full px-4 mt-6">

            {/* Left Column: Bar Chart Card */}
            <Card className="p-6 rounded-[1.5rem] bg-white dark:bg-[#002b5c] shadow-[0_15px_40px_rgba(0,63,131,0.03)] border border-[#c2c6d3]/20 dark:border-white/5 w-full">
                <h3 className="text-lg font-bold text-[#00234a] dark:text-white mb-6">
                    Medical Performance Index (Ratings)
                </h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-zinc-800" />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" tickLine={false} />
                            <YAxis domain={[0, 5]} ticks={[0, 2, 4, 5]} tick={{ fontSize: 13 }} stroke="#94a3b8" tickLine={false} />
                            <Tooltip cursor={{ fill: 'rgba(16, 185, 129, 0.04)' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="square" />
                            <Bar dataKey="rating" name="Score Rating" fill="#2573E6" radius={[4, 4, 0, 0]} maxBarSize={45} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Right Column: Smoothed Area Curve Card */}
            <Card className="p-6 rounded-[1.5rem] bg-white dark:bg-[#002b5c] shadow-[0_15px_40px_rgba(0,63,131,0.03)] border border-[#c2c6d3]/20 dark:border-white/5 w-full">
                <h3 className="text-lg font-bold text-[#00234a] dark:text-white mb-6">
                    Appointment Timeline (Last 7 Days)
                </h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <defs>
                                <linearGradient id="timelineColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2573E6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#2573E6" stopOpacity={0.0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-zinc-800" />
                            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" tickLine={false} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 13 }} stroke="#94a3b8" tickLine={false} />
                            <Tooltip />
                            <Area
                                type="monotone" // Creates the smooth biological-looking curve shown in your design
                                dataKey="count"
                                name="Appointments"
                                stroke="#2573E6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#timelineColor)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

        </div>
    );
}