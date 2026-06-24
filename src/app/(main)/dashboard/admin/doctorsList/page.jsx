import React from 'react';

import { getAllSpecialists } from '@/lib/api/admin';
import AdminDoctorsCards from '@/components/dashboard/AdminDoctorsCards';


export default async function VerifyLicensesPage() {
    const doctors = await getAllSpecialists() || [];

    return (
        <div className="w-full bg-[#f8f9ff] dark:bg-[#0D1C2D] min-h-screen p-6 sm:p-10 font-manrope">
            <div className="max-w-[1200px] mx-auto space-y-8">

                {/* Header Context Bar */}
                <div>
                    <h1 className="text-3xl font-[800] text-slate-800 dark:text-white tracking-tight">
                        Verify Practitioner Licenses
                    </h1>
                    <p className="text-sm font-medium text-slate-400 dark:text-zinc-400 mt-1">
                        Review uploaded credentials, manage license validations, and regulate specialized clinical memberships.
                    </p>
                </div>

                {/* Grid Deck Containing Interactive Client Components */}
                <AdminDoctorsCards initialDoctors={doctors} />

            </div>
        </div>
    );
}