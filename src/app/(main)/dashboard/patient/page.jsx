import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { getLoggedInPatientProfile } from '@/lib/api/patients';

import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
// import { useSession } from '@/lib/auth-client';
import { Calendar, DollarSign, FileCheck, Star } from 'lucide-react';
import React from 'react';

const PatienntDashboardHomepage = async () => {

    // const { data: session, isPending } = useSession();
    const user = await getUserSession();
    const patientProfile = await getLoggedInPatientProfile();



    const patientStats = [
        { title: "Upcomming Appointments", value: "4", icon: Calendar },
        { title: "Completed Checkups", value: "12", icon: FileCheck },
        { title: "Tolal Transaction", value: "100", icon: DollarSign },
        { title: "Total Reviews", value: "2", icon: Star },
    ];


    return (
        <div className='min-h-screen bg-white dark:bg-[rgb(35,49,67)] py-8 transition-colors duration-200'>
            <div className='max-w-5xl mx-auto px-2'>
                <div className='p-4 max-w-5xl mx-auto'>
                    <Card
                        className="bg-[#D7E2FF] dark:bg-[#00234a] border border-[#ABC7FF] dark:border-[#0D1C2D] rounded-2xl p-2 "
                    >
                        <Card.Content className="flex flex-col gap-6 justify-between p-4">
                            {/* Icon Wrapper
                    {Icon && (
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#ABC7FF] dark:bg-[#0D1C2D] text-blue-800 dark:text-blue-300">
                            <Icon width={20} height={20} />
                        </div>
                    )} */}

                            {/* Content */}
                            <div className="flex flex-col gap-2">
                                <span className="text-3xl font-bold text-[#00234a] dark:text-blue-400">
                                    Welcome back, {user?.name} !
                                </span>

                                <span className={`badge w-fit
            px-2.5 py-0.5 rounded-xl text-xs font-bold uppercase tracking-wider border select-none
            ${patientProfile.status?.toLowerCase() === 'active'
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40'
                                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/40'
                                    }`}>
                                    {patientProfile.status} Patient Account
                                </span>

                                <span className="max-w-sm font-medium text-zinc-600 dark:text-[#D7E2FF]">
                                    Access real-time schedules, view medical records, coordinate with top clinicians, and manage payments securely.
                                </span>
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                <DashboardStats statsData={patientStats} />
            </div>

        </div>
    );
};

export default PatienntDashboardHomepage;