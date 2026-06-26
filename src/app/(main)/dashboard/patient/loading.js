import React from 'react';
import { Loader2 } from 'lucide-react';

export default function PDashboardLoading() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[rgb(35,49,67)] transition-colors duration-200">
            <div className="flex flex-col items-center space-y-4">
                {/* Modern Lucide Animated Spinner */}
                <Loader2 className="w-10 h-10 text-slate-800 dark:text-blue-500 animate-spin" />
                
                {/* Subtle Progress Typography */}
                <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 tracking-wide">
                    Loading dashboard records...
                </p>
            </div>
        </div>
    );
}