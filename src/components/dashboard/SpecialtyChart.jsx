"use client";

import React from "react";
import { Card } from "@heroui/react";
import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";


const COLORS = {
    "Cardiology": "#ef4444",
    "Dermatology": "#a855f7",
    "General Medicine": "#10b981",
    "Neurology": "#3b82f6",
    "Orthopedics": "#ef4444",
    "Pediatrics": "#f59e0b",
    "Gynecology": "#10b981",
    "Unspecified": "#64748b"
};

const DEFAULT_COLORS = ["#10b981", "#a855f7", "#3b82f6", "#ef4444", "#f59e0b", "#64748b"];

export function SpecialtyChart({ chartData = [] }) {

    // The modern, future-proof replacement for <Cell />
    const renderCustomSector = (props) => {
        const { name, index } = props;
        // Dynamically find the matching slice fill color
        const fill = COLORS[name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length];

        // Render a clean SVG Sector directly with the dynamic fill properties
        return <Sector {...props} fill={fill} />;
    };

    return (
        <Card className="w-full max-w-2xl p-6 sm:p-8 rounded-[1.5rem] bg-white dark:bg-[#00234a] shadow-[0_15px_40px_rgba(0,63,131,0.03)] border border-[#c2c6d3]/20 dark:border-white/5 mt-6 mx-4">

            <h3 className="text-lg font-bold text-[#00234a] dark:text-white mb-6">
                Ecosystem Specialty Distribution
            </h3>

            <div className="flex flex-col items-center justify-center gap-6">

                <div className="w-full h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                // Pass the render function here to clean up deprecation warnings!
                                shape={renderCustomSector}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 w-full justify-center pt-2">
                    {chartData.map((entry, index) => {
                        const markerColor = COLORS[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
                        return (
                            <div key={entry.name} className="flex items-center gap-2 justify-center sm:justify-start">
                                <span
                                    className="w-3 h-3 rounded-sm shrink-0 block"
                                    style={{ backgroundColor: markerColor }}
                                />
                                <span className="text-sm font-semibold text-slate-600 dark:text-zinc-300 whitespace-nowrap">
                                    {entry.name} ({entry.value})
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </Card>
    );
}