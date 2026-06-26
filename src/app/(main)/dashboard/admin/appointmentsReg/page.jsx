// app/(main)/dashboard/admin/appointmentsReg/page.jsx
import { getSystemClinicalRegister } from "@/lib/api/admin";
import React from "react";
import ClinicalRegisterTable from "./ClinicalRegisterTable";


export const metadata = {
    title: "Total System Clinical Register | Admin",
};

export default async function AdminAppointmentsRegistryPage() {
    // Directly trigger secure server load prior to hydration
    const registerRecords = await getSystemClinicalRegister();

    // console.log("ADMIN PAGE API RESPONSE:", registerRecords);

    return (
        <div className="p-6 space-y-6 bg-[#f8f9ff] dark:bg-[#0D1C2D]">
            <div className="max-w-[1400px] mx-auto">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
                        Total System Appointments Register
                    </h1>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                        Historical breakdown ledger tracking administrative ecosystem appointments, dynamic transaction fees, and clinical status parameters.
                    </p>
                </div>
            </div>

            {/* Embedded Presenter Grid */}
            <ClinicalRegisterTable records={registerRecords} />
        </div>
    );
}