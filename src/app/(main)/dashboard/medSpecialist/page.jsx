import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { getLoggedInDoctorProfile } from '@/lib/api/doctors';
import { getUserSession } from '@/lib/core/session';
// import { useSession } from '@/lib/auth-client';
import { Calendar, Star, UsersRound } from 'lucide-react';
import React from 'react';

const MedSpecialistDashboardHomepage = async () => {

    // const { data: session, isPending } = useSession();
    const user = await getUserSession();
    const doctorProfile = await getLoggedInDoctorProfile();



    const medSpecialistStats = [
        { title: "Total Patients", value: "48", icon: UsersRound },
        { title: "Today's Appointments", value: "1,284", icon: Calendar },
        { title: "Reviews Received", value: "18", icon: Star },
    ];


    return (
        <div className='min-h-screen bg-white dark:bg-[#233143]'>
            <h2 className='ml-4 pt-4 font-semibold text-3xl text-[#00234a] dark:text-white'>Welcome back, {user?.name} !</h2>

            <p className='ml-4 mt-2 text-sm text-[#00234a] dark:text-white'>Your clinical license verification status is currently <span className={`
            px-2.5 py-0.5 rounded-xl text-xs font-bold uppercase tracking-wider border select-none
            ${doctorProfile?.verificationStatus?.toLowerCase() === 'approved'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40'
                    : doctorProfile?.verificationStatus?.toLowerCase() === 'rejected'
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/40'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40' // Fallback to Pending styles
                }
        `}>{doctorProfile?.verificationStatus}</span></p>

            <DashboardStats statsData={medSpecialistStats} />
        </div>
    );
};

export default MedSpecialistDashboardHomepage;