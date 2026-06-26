import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { getLoggedInPatientProfile, getPatientDashboardStats } from '@/lib/api/patients';
import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
import { Calendar, DollarSign, FileCheck, Star } from 'lucide-react';
import React from 'react';

const PatientDashboardHomepage = async () => {
    const user = await getUserSession();
    const patientId = user?.id || user?._id;

    // Fetch live profile status details and calculated summary metrics in parallel
    const [patientProfile, liveStats] = await Promise.all([
        getLoggedInPatientProfile(),
        getPatientDashboardStats(patientId)
    ]);

    // Map your custom icons and text definitions dynamically using the backend state payload fallbacks
    const patientStats = [
        {
            title: "Upcoming Appointments",
            value: liveStats?.upcomingAppointments || "0",
            icon: Calendar
        },
        {
            title: "Completed Checkups",
            value: liveStats?.completedCheckups || "0",
            icon: FileCheck
        },
        {
            title: "Total Transactions",
            value: liveStats?.totalTransactions || "$0",
            icon: DollarSign
        },
        {
            title: "Total Reviews",
            value: liveStats?.totalReviews || "0",
            icon: Star
        },
    ];

    return (
        <div className='min-h-screen bg-white dark:bg-[rgb(35,49,67)] py-8 transition-colors duration-200'>
            <div className='max-w-5xl mx-auto px-2'>
                <div className='p-4 max-w-5xl mx-auto'>
                    <Card className="bg-[#D7E2FF] dark:bg-[#00234a] border border-[#ABC7FF] dark:border-[#0D1C2D] rounded-2xl p-2">
                        <Card.Content className="flex flex-col gap-6 justify-between p-4">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-bold text-[#00234a] dark:text-blue-400">
                                    Welcome back, {user?.name || "Patient"}!
                                </h1>

                                {patientProfile?.status && (
                                    <span className={`badge w-fit px-2.5 py-0.5 rounded-xl text-xs font-bold uppercase tracking-wider border select-none
                                        ${patientProfile.status.toLowerCase() === 'active'
                                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40'
                                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/40'
                                        }`}
                                    >
                                        {patientProfile.status} Patient Account
                                    </span>
                                )}

                                <p className="max-w-sm font-medium text-zinc-600 dark:text-[#D7E2FF]">
                                    Access real-time schedules, view medical records, coordinate with top clinicians, and manage payments securely.
                                </p>
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                {/* Render the clean statistics cards populated with real runtime totals */}
                <DashboardStats statsData={patientStats} />
            </div>
        </div>
    );
};

export default PatientDashboardHomepage;