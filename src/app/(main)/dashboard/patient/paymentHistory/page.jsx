import React from 'react';
import { getPatientPaymentHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';

export default async function PatientPaymentHistoryPage() {
    const user = await getUserSession();
    const payments = await getPatientPaymentHistory(user?.id);

    return (
        <div className="min-h-screen bg-white dark:bg-[rgb(35,49,67)] py-12 px-4 transition-colors duration-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Title Header */}
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                        Stripe Payment Transactions
                    </h1>
                    <span className="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 px-3 py-1 rounded-full text-xs font-bold shrink-0">
                        Total: {payments.length}
                    </span>
                </div>

                {/* Empty State */}
                {payments.length === 0 ? (
                    <div className="text-center p-12 bg-slate-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800">
                        <p className="text-sm text-slate-400 dark:text-zinc-500 italic">
                            No verified payment transactions logged for this account profile.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* MOBILE: Card List (visible below md) */}
                        <div className="flex flex-col gap-4 md:hidden">
                            {payments.map((pay) => {
                                const doctorName = pay.doctorDetails?.doctorName || "Specified Clinician";
                                const rawDate = pay.paymentDate?.$date || pay.paymentDate;
                                const formattedDate = rawDate
                                    ? new Date(rawDate).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'numeric', day: 'numeric'
                                    })
                                    : 'N/A';

                                return (
                                    <div
                                        key={pay._id?.$oid || pay._id}
                                        className="bg-[#ECF0FF] dark:bg-zinc-900/90 border border-slate-200/70 dark:border-zinc-800/80 rounded-2xl p-5 space-y-3 shadow-sm"
                                    >
                                        <div className="flex justify-between items-start">
                                            <p className="font-bold text-slate-800 dark:text-zinc-100 text-base">
                                                {doctorName}
                                            </p>
                                            <span className="font-extrabold text-teal-600 dark:text-emerald-400 text-base">
                                                ${pay.amount}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-zinc-400">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold uppercase tracking-wider text-[10px]">Transaction ID</span>
                                                <span className="font-mono truncate max-w-[180px]">
                                                    {pay.transactionId || "N/A"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold uppercase tracking-wider text-[10px]">Date</span>
                                                <span className="font-medium">{formattedDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* DESKTOP: Table (visible at md and above) */}
                        <div className="hidden md:block bg-[#ECF0FF] dark:bg-zinc-900/90 border border-slate-200/70 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-950/20 text-[11px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 uppercase">
                                            <th className="py-4 px-6">Paid Specialists</th>
                                            <th className="py-4 px-6">Stripe Txid</th>
                                            <th className="py-4 px-6">Amount</th>
                                            <th className="py-4 px-6">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-sm">
                                        {payments.map((pay) => {
                                            const doctorName = pay.doctorDetails?.doctorName || "Specified Clinician";
                                            const rawDate = pay.paymentDate?.$date || pay.paymentDate;
                                            const formattedDate = rawDate
                                                ? new Date(rawDate).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'numeric', day: 'numeric'
                                                })
                                                : 'N/A';

                                            return (
                                                <tr
                                                    key={pay._id?.$oid || pay._id}
                                                    className="hover:bg-slate-50/40 dark:hover:bg-zinc-800/20 transition-colors"
                                                >
                                                    <td className="py-4 px-6 font-semibold text-slate-800 dark:text-zinc-100">
                                                        {doctorName}
                                                    </td>
                                                    <td className="py-4 px-6 font-mono text-xs text-slate-500 dark:text-zinc-400 max-w-[220px] truncate">
                                                        {pay.transactionId || "N/A"}
                                                    </td>
                                                    <td className="py-4 px-6 font-extrabold text-teal-600 dark:text-emerald-400">
                                                        ${pay.amount}
                                                    </td>
                                                    <td className="py-4 px-6 font-medium text-slate-500 dark:text-zinc-400">
                                                        {formattedDate}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}