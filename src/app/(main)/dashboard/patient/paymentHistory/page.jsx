import React from 'react';
import { getPatientPaymentHistory } from '@/lib/api/payments';
import { CreditCard, ArrowLeftRight } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';

export default async function PatientPaymentHistoryPage() {
    const user = await getUserSession();
    const payments = await getPatientPaymentHistory(user?.id);

    return (
        <div className="min-h-screen bg-white dark:bg-[rgb(35,49,67)] py-12 px-4 transition-colors duration-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Title Header Section */}
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-4">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
                        Stripe Payment Transactions
                    </h1>
                    <span className="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 px-3 py-1 rounded-full text-xs font-bold">
                        Total History: {payments.length}
                    </span>
                </div>

                {/* Empty State Exception handling */}
                {payments.length === 0 ? (
                    <div className="text-center p-12 bg-slate-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800">
                        <p className="text-sm text-slate-400 dark:text-zinc-500 italic">No verified payment transactions logged for this account profile.</p>
                    </div>
                ) : (
                    /* Table Card Container matches uploaded design styling */
                    <div className="bg-white dark:bg-zinc-900/90 border border-slate-200/70 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
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

                                        // Handle standard date strings or MongoDB nested ISODate types
                                        const rawDate = pay.paymentDate?.$date || pay.paymentDate;
                                        const formattedDate = rawDate
                                            ? new Date(rawDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric'
                                            })
                                            : 'N/A';

                                        return (
                                            <tr
                                                key={pay._id?.$oid || pay._id}
                                                className="hover:bg-slate-50/40 dark:hover:bg-zinc-800/20 transition-colors"
                                            >
                                                {/* Practitioner Name */}
                                                <td className="py-4 px-6 font-semibold text-slate-800 dark:text-zinc-100">
                                                    {doctorName}
                                                </td>

                                                {/* Transaction Hash ID */}
                                                <td className="py-4 px-6 font-mono text-xs text-slate-500 dark:text-zinc-400 max-w-[220px] truncate">
                                                    {pay.transactionId || "N/A"}
                                                </td>

                                                {/* Financial Total Amount */}
                                                <td className="py-4 px-6 font-extrabold text-teal-600 dark:text-emerald-400">
                                                    ${pay.amount}
                                                </td>

                                                {/* Date Stamp */}
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
                )}
            </div>
        </div>
    );
}