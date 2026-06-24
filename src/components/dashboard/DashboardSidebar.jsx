import React from 'react';
import { Avatar } from "@heroui/react";
import { getUserSession } from '@/lib/core/session';
import SidebarLinks from './SidebarLinks';

const DashboardSidebar = async () => {
    const user = await getUserSession();

    // Pass icons as plain strings to make them serializable
    const patientSidebarLinks = [
        { name: 'Overview', href: '/dashboard/patient', icon: 'LayoutDashboard' },
        { name: 'My Appointments', href: '/dashboard/patient/appointments', icon: 'CalendarDays', badge: 3 },
        { name: 'Payments History', href: '/dashboard/patient/payments', icon: 'CircleDollarSign' },
        { name: 'My Reviews', href: '/dashboard/patient/reviews', icon: 'Star' },
        { name: 'My Profile', href: '/dashboard/patient/profile', icon: 'UserRound' },
    ];

    const medSpecialistSidebarLinks = [
        { name: 'Overview', href: '/dashboard/medSpecialist', icon: 'LayoutDashboard' },
        { name: 'Manage Schedule', href: '/dashboard/medSpecialist/manageSchedule', icon: 'SquareChartGantt' },
        { name: 'Appointments Inbox', href: '/dashboard/medSpecialist/appointments', icon: 'CalendarDays', badge: 3 },
        { name: 'Prescriptions Cabin', href: '/dashboard/medSpecialist/prescriptions', icon: 'Syringe' },
        { name: 'My Profile', href: '/dashboard/medSpecialist/profile', icon: 'UserRound' },
    ];

    const adminSidebarLinks = [
        { name: 'Analytics', href: '/dashboard/admin', icon: 'ChartColumn' },
        { name: 'Manage Users', href: '/dashboard/admin/manageUsers', icon: 'UsersRound' },
        { name: 'Verify Doctors', href: '/dashboard/admin/doctorsList', icon: 'CircleCheck' },
        { name: 'Appointments Registry', href: '/dashboard/admin/appointmentsReg', icon: 'CalendarDays' },
        { name: 'Stripe Cash Flow', href: '/dashboard/admin/allPayments', icon: 'CiBadgeDollar' },
    ];

    const sidebarLinksMap = {
        patient_family: patientSidebarLinks,
        medical_specialist: medSpecialistSidebarLinks,
        admin: adminSidebarLinks
    };

    const baseRolePathMap = {
        patient_family: '/dashboard/patient',
        medical_specialist: '/dashboard/medSpecialist',
        admin: '/dashboard/admin'
    };

    const currentRole = user?.accountRole || 'patient_family';
    const sidebarLinks = sidebarLinksMap[currentRole];
    const baseRolePath = baseRolePathMap[currentRole];

    const displayName = user?.name || "User";

    const displayRole = user?.accountRole === 'admin'
        ? 'ADMIN'
        : user?.accountRole === 'medical_specialist'
            ? 'SPECIALIST'
            : 'PATIENT';

    const displayImage = user?.image || "";

    return (
        <aside className="w-[80px] lg:w-[280px] min-h-screen bg-white dark:bg-[#001B3F] border-r border-slate-100 dark:border-slate-800 flex flex-col py-6 px-4 font-hanken">

            {/* 1. User Profile Box */}
            <div className="flex items-center gap-3 px-2 pb-6 mb-4 border-b border-slate-100 dark:border-slate-800">
                <Avatar className="w-12 h-12 ring-2 ring-emerald-100 dark:ring-emerald-950">
                    <Avatar.Image
                        referrerPolicy='no-referrer'
                        alt={displayName}
                        src={displayImage}
                        className="w-full h-full object-cover"
                    />
                    <Avatar.Fallback>{displayName.charAt(0).toUpperCase()}</Avatar.Fallback>
                </Avatar>

                <div className="hidden lg:flex flex-col text-left">
                    <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
                        {displayName}
                    </h3>
                    <div className="mt-1">
                        <span className="bg-[#e2f3ec] text-[#107c41] dark:bg-emerald-950/50 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider">
                            {displayRole}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Navigation Wrapper */}
            <SidebarLinks links={sidebarLinks} baseRolePath={baseRolePath} />

        </aside>
    );
};

export default DashboardSidebar;