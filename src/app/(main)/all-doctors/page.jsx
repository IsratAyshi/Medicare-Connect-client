import React from "react";
import DoctorCatalogContainer from "@/components/doctors/DoctorCatalogContainer";
import { getDoctors } from "@/lib/api/doctors";

export default async function AllDoctorsPage({ searchParams }) {
    const filters = await searchParams;

    // Normalize filter formats received from the URL
    const filterObj = {
        ...filters,
        page: filters.page ? parseInt(filters.page, 10) : 1,
    };

    // Convert keys to string for server passing
    const querySearch = new URLSearchParams(filters);
    const queryString = querySearch.toString();

    // Fetched server-side on initial request or filter change
    const { doctors, total } = await getDoctors(queryString);

    return (
        <div className="w-full min-h-screen mt-20 bg-slate-50 dark:bg-[#121C2A] p-6 md:p-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Our Medical Specialists
                </h1>
                <p className="text-slate-500 dark:text-zinc-400 mt-2">
                    Find professional guidance from our curated verified medical team.
                </p>
            </div>

            {/* Interactive Client Wrapper */}
            <DoctorCatalogContainer
                filters={filterObj}
                doctors={doctors || []}
                total={total || 0}
            />
        </div>
    );
}