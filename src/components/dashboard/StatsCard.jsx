import React from 'react';
import { Card } from '@heroui/react';

export const StatsCard = ({ title, value, icon: Icon, className = "" }) => {
    return (
        <Card
            className={`bg-[#D7E2FF] dark:bg-[#00234a] border border-[#ABC7FF] dark:border-[#0D1C2D] rounded-2xl p-2 ${className}`}
        >
            <Card.Content className="flex flex-col gap-6 justify-between p-4">
                {/* Icon Wrapper */}
                {Icon && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#ABC7FF] dark:bg-[#0D1C2D] text-blue-800 dark:text-blue-300">
                        <Icon width={20} height={20} />
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {title}
                    </span>
                    <span className="text-3xl font-semibold text-blue-900 dark:text-white tracking-tight">
                        {value}
                    </span>
                </div>
            </Card.Content>
        </Card>
    );
};