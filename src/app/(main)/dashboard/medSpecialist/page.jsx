"use client";
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { useSession } from '@/lib/auth-client';
import { Calendar, Star, UsersRound } from 'lucide-react';
import React from 'react';

const MedSpecialistDashboardHomepage = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return <h2>Loading...</h2>;
    }

    const medSpecialistStats = [
        { title: "Total Patients", value: "48", icon: UsersRound },
        { title: "Today's Appointments", value: "1,284", icon: Calendar },
        { title: "Reviews Received", value: "18", icon: Star },
    ];

    const user = session?.user;


    return (
        <div className='min-h-screen bg-white dark:bg-[#233143]'>
            <h2 className='ml-4 pt-4 font-semibold text-3xl text-[#00234a] dark:text-white'>Welcome back, {user?.name} !</h2>

            <DashboardStats statsData={medSpecialistStats} />
        </div>
    );
};

export default MedSpecialistDashboardHomepage;