"use client";

import React from 'react';
import { Button } from '@heroui/react';
import { handlePayNow } from '@/lib/actions/appointments-client';

export default function ActionButtons({ appointment, isPaid }) {
    return (
        <div className="flex items-center gap-2 w-full justify-end">
            {!isPaid && (
                <button
                    onClick={() => handlePayNow(appointment)}
                    className="bg-[#1e533c] hover:bg-[#163e2c] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm"
                >
                    Pay now (Stripe)
                </button>
            )}
            <Button
                size="sm"
                variant="bordered"
                className="text-slate-600 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 font-semibold text-xs px-4 py-2.5 rounded-xl h-auto"
            >
                Reschedule
            </Button>
            <Button
                size="sm"
                variant="bordered"
                className="text-rose-500 border-rose-200 dark:border-rose-950/60 font-semibold text-xs px-4 py-2.5 rounded-xl h-auto hover:bg-rose-50/50 dark:hover:bg-rose-950/20"
            >
                Cancel
            </Button>
        </div>
    );
}