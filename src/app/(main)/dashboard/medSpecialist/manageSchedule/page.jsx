import React from 'react';
import { getLoggedInDoctorProfile } from '@/lib/api/doctors';
import { getUserSession } from '@/lib/core/session';
import ScheduleManagerForm from './ScheduleManagerForm';


export default async function ManageSchedulePage() {
    const user = await getUserSession();
    const doctorProfile = await getLoggedInDoctorProfile();

    // Default configuration objects if profile record doesn't have slot settings yet
    const initialDays = doctorProfile?.availableDays || [];
    const initialSlots = doctorProfile?.availableSlots || [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#1a2635] p-6 sm:p-10 transition-colors duration-200">
            <div className="max-w-6xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight pl-2">
                    Manage Clinical Schedule Slots
                </h1>

                <ScheduleManagerForm
                    userId={user?.id}
                    initialDays={initialDays}
                    initialSlots={initialSlots}
                />
            </div>
        </div>
    );
}