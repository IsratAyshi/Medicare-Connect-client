import { AnalyticsChartsGrid } from '@/components/dashboard/AnalyticsChartsGrid';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { SpecialtyChart } from '@/components/dashboard/SpecialtyChart';
import { getAdminDashboardMetrics, getAppointmentTimeline, getClinicianPerformance, getSpecialtyBreakdown } from '@/lib/api/admin';
import { getUserSession } from '@/lib/core/session';
import { Calendar, DollarSign, UsersRound, UserStar } from 'lucide-react';
import React from 'react';

const AdminDashboardHomepage = async () => {
    // const { data: session, isPending } = useSession();
    const user = await getUserSession();

    const [statsResponse, breakdownResponse, performanceRes, timelineRes] = await Promise.all([
        getAdminDashboardMetrics(),
        getSpecialtyBreakdown(),
        getClinicianPerformance(),
        getAppointmentTimeline()
    ]);

    const metrics = statsResponse?.data || {
        totalPatients: 0,
        verifiedDoctors: 0,
        totalAppointments: 0,
        grossRevenue: 0
    };

    const AdminStats = [
        {
            title: "Total Patients",
            value: metrics.totalPatients.toLocaleString(),
            icon: UsersRound
        },
        {
            title: "Verified Medical Specialists",
            value: metrics.verifiedDoctors.toLocaleString(),
            icon: UserStar
        },
        {
            title: "All Appointments",
            value: metrics.totalAppointments.toLocaleString(),
            icon: Calendar
        },
        {
            title: "Gross Revenue",
            value: `$${metrics.grossRevenue.toLocaleString()}`,
            icon: DollarSign
        },
    ];

    const chartData = breakdownResponse?.data || [];

    return (
        <div className='min-h-screen bg-[#f8f9ff] dark:bg-[#233143]'>
            <div className='max-w-[1200px] mx-auto pb-5'>
                <h2 className='ml-4 pt-4 mb-2 font-semibold text-3xl text-[#00234a] dark:text-white'>Welcome back, {user?.name} !</h2>

                <DashboardStats statsData={AdminStats} />

                <AnalyticsChartsGrid
                    performanceData={performanceRes?.data || []}
                    timelineData={timelineRes?.data || []}
                />

                <SpecialtyChart chartData={chartData} />


            </div>
        </div>
    );
};

export default AdminDashboardHomepage;