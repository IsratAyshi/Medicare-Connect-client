import React from "react";

export default function ClinicalRegisterTable({ records }) {
    if (!records || records.length === 0) {
        return (
            <div className="bg-white dark:bg-[#001e3d] border border-slate-100 dark:border-zinc-800 p-12 text-center rounded-3xl">
                <p className="text-sm text-slate-400 dark:text-zinc-500 italic">No historical clinical registrations tracked yet.</p>
            </div>
        );
    }

    return (
        <>
            {/* MOBILE: Card List (visible below md) */}
            <div className="flex flex-col gap-3 md:hidden bg-white dark:bg-[#001e3d]">
                {records.map((item) => {
                    const isPaid = item.paymentStatus?.toLowerCase() === "paid";
                    const isCompleted = item.appointmentStatus?.toLowerCase() === "completed";
                    const isPending = item.appointmentStatus?.toLowerCase() === "pending";

                    return (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm space-y-4"
                        >
                            {/* Patient + status row */}
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">Patient</p>
                                    <p className="font-bold text-slate-800 dark:text-zinc-100 text-sm">{item.patientName}</p>
                                </div>
                                <span className={`shrink-0 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isCompleted
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                                    : isPending
                                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                                        : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                                    }`}>
                                    {item.appointmentStatus || "pending"}
                                </span>
                            </div>

                            {/* Doctor info */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">Doctor</p>
                                <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm">{item.doctorName}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-zinc-500 mt-0.5">{item.doctorSpecialization}</p>
                            </div>

                            {/* Schedule + billing row */}
                            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-zinc-800">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">Schedule</p>
                                    <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                                        {item.appointmentDate} <span className="text-slate-300 dark:text-zinc-600 mx-1">·</span> {item.appointmentTime}
                                    </p>
                                </div>
                                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase ${isPaid
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
                                    : "bg-rose-50 text-rose-600 border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30"
                                    }`}>
                                    {item.paymentStatus || "unpaid"}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* DESKTOP: Table (visible at md and above) */}
            <div className="hidden md:block bg-white dark:bg-[#001e3d] max-w-[1400px] mx-auto border border-slate-200/60 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 dark:bg-zinc-800/40 border-b border-slate-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                                <th className="py-4 px-6">Patient</th>
                                <th className="py-4 px-6">Doctor</th>
                                <th className="py-4 px-6">Schedule</th>
                                <th className="py-4 px-6">Billing</th>
                                <th className="py-4 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                            {records.map((item) => {
                                const isPaid = item.paymentStatus?.toLowerCase() === "paid";
                                const isCompleted = item.appointmentStatus?.toLowerCase() === "completed";
                                const isPending = item.appointmentStatus?.toLowerCase() === "pending";

                                return (
                                    <tr key={item._id} className="hover:bg-slate-50/40 dark:hover:bg-zinc-800/10 transition-colors">

                                        {/* Patient */}
                                        <td className="py-5 px-6">
                                            <p className="font-bold text-sm text-slate-800 dark:text-zinc-100">{item.patientName}</p>
                                        </td>

                                        {/* Doctor */}
                                        <td className="py-5 px-6">
                                            <p className="font-semibold text-sm text-blue-600 dark:text-blue-400">{item.doctorName}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mt-0.5">
                                                {item.doctorSpecialization}
                                            </p>
                                        </td>

                                        {/* Schedule */}
                                        <td className="py-5 px-6">
                                            <p className="text-xs font-semibold text-slate-600 dark:text-zinc-300">{item.appointmentDate}</p>
                                            <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5">{item.appointmentTime}</p>
                                        </td>

                                        {/* Billing */}
                                        <td className="py-5 px-6">
                                            <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wide ${isPaid
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30"
                                                : "bg-rose-50 text-rose-600 border border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30"
                                                }`}>
                                                {item.paymentStatus || "unpaid"}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="py-5 px-6">
                                            <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${isCompleted
                                                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                                                : isPending
                                                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                                                    : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                                                }`}>
                                                {item.appointmentStatus || "pending"}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}