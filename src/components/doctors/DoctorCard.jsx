import Image from "next/image";
import React from "react";

export default function DoctorCard({ doctor, layout }) {
    const isList = layout === "list";

    return (
        <div className={`bg-[#ECF0FF] dark:bg-[#001B3F]/50 border border-slate-150 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 w-full max-w-sm flex flex-col justify-between ${isList ? "max-w-none md:flex-row items-center" : "h-full"
            }`}>

            {/* Header Image Frame & Specialty Overlay Tag */}
            <div className={`relative bg-slate-100 dark:bg-zinc-800 shrink-0 ${isList ? "w-full md:w-52 h-48 md:h-full" : "w-full h-56"}`}>
                {doctor.profileImage ? (
                    <Image
                        src={doctor?.profileImage}
                        alt={doctor.doctorName}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-zinc-600">
                        No Profile Photo
                    </div>
                )}

                <span className="absolute bottom-3 left-3 bg-slate-900/80 dark:bg-zinc-950/85 text-white font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-lg uppercase">
                    {doctor?.specialization || "General Medicine"}
                </span>
            </div>

            {/* Profile Content Body */}
            <div className="p-5 flex flex-col justify-between grow w-full h-full">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
                        {doctor?.doctorName}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 dark:text-zinc-400 mt-1 line-clamp-1">
                        {doctor?.qualifications || "No Qualifications Mentioned"}
                    </p>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {doctor?.hospitalName || "No Hospital Attached"}
                    </p>
                </div>

                {/* Bottom Stats Row */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80">
                    <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                        {doctor?.experience || "0"} Years Experience
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">
                        ${doctor?.consultationFee || "0"} <span className="text-xs font-medium text-slate-400">Fee</span>
                    </span>
                </div>
            </div>
        </div>
    );
}