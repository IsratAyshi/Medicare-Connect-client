import React from "react";
import {
    DollarSign,
    TrendingUp,
    User,
    Calendar,
    Activity,
    CreditCard
} from "lucide-react";
import { getCashFlowLedger } from "@/lib/api/admin";


export default async function AdminCashFlowPage() {

    let payments = [];
    let metrics = { totalVolume: 0, totalCount: 0, averageTicket: 0 };

    try {
        payments = await getCashFlowLedger();

        if (payments && payments.length > 0) {
            const total = payments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
            metrics = {
                totalVolume: total,
                totalCount: payments.length,
                averageTicket: Math.round(total / payments.length)
            };
        }
    } catch (error) {
        console.error("Server-side ledger context load error:", error);
    }

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950/40 py-6 px-3 sm:py-10 sm:px-6 transition-colors duration-200">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

                {/* Header Section */}
                <div className="flex flex-col gap-1 border-b border-slate-200 dark:border-zinc-800/80 pb-5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Stripe Pay Transactions
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                        All transactions across the medical network.
                    </p>
                </div>

                {/* Analytical Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Gross Revenue</span>
                            <h2 className="text-3xl font-black text-slate-800 dark:text-zinc-100">${metrics.totalVolume}</h2>
                        </div>
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-600">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Processed Payments</span>
                            <h2 className="text-3xl font-black text-slate-800 dark:text-zinc-100">{metrics.totalCount} Tx</h2>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl text-blue-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-6 rounded-3xl shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Average Charge</span>
                            <h2 className="text-3xl font-black text-slate-800 dark:text-zinc-100">${metrics.averageTicket}</h2>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl text-purple-600">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Ledger Section Header */}
                <div className="flex items-center gap-2 pb-1">
                    <CreditCard className="w-5 h-5 text-slate-400 shrink-0" />
                    <h3 className="font-bold text-slate-800 dark:text-zinc-200 text-sm sm:text-base">System Transactions Settlement Manifest</h3>
                </div>

                {(!payments || payments.length === 0) ? (
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-16 text-center">
                        <p className="text-sm text-slate-400 dark:text-zinc-500 italic">No incoming settlements captured inside database records stream.</p>
                    </div>
                ) : (
                    <>
                        {/* MOBILE: Card List (visible below md) */}
                        <div className="flex flex-col gap-3 md:hidden">
                            {payments.map((pay) => {
                                const rawDate = pay.paymentDate?.$date || pay.paymentDate;
                                const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('en-US', {
                                    year: 'numeric', month: '2-digit', day: '2-digit'
                                }) : 'Recent';

                                return (
                                    <div
                                        key={pay._id?.$oid || pay._id}
                                        className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm space-y-4"
                                    >
                                        {/* Patient */}
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">Payer Patient</p>
                                                <p className="font-bold text-slate-800 dark:text-zinc-100 text-sm flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                                    {pay.patientName}
                                                </p>
                                            </div>
                                            <span className="shrink-0 text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                                                ${pay.amount}
                                            </span>
                                        </div>

                                        {/* Doctor */}
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">Medical Specialist</p>
                                            <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm">{pay.doctorName}</p>
                                        </div>

                                        {/* Transaction ID + Date */}
                                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-zinc-800">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">Stripe Charge ID</p>
                                                <p className="font-mono text-xs text-slate-400 dark:text-zinc-500 truncate max-w-[160px]">
                                                    {pay.transactionId || "tx_mock_signature"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">Date</p>
                                                <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 shrink-0" />
                                                    {formattedDate}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* DESKTOP: Table (visible at md and above) */}
                        <div className="hidden md:block bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50/30 dark:bg-transparent">
                                            <th className="py-4 px-6">Payer Patient</th>
                                            <th className="py-4 px-6">Medical Specialist</th>
                                            <th className="py-4 px-6">Stripe Charge ID</th>
                                            <th className="py-4 px-6">Co-Pay Value</th>
                                            <th className="py-4 px-6">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-sm text-slate-700 dark:text-zinc-300">
                                        {payments.map((pay) => {
                                            const rawDate = pay.paymentDate?.$date || pay.paymentDate;
                                            const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('en-US', {
                                                year: 'numeric', month: '2-digit', day: '2-digit'
                                            }) : 'Recent';

                                            return (
                                                <tr key={pay._id?.$oid || pay._id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                                                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-zinc-100">
                                                        <span className="flex items-center gap-2">
                                                            <User className="w-4 h-4 text-slate-300 shrink-0" />
                                                            {pay.patientName}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 font-medium text-slate-500 dark:text-zinc-400">
                                                        {pay.doctorName}
                                                    </td>
                                                    <td className="py-4 px-6 font-mono text-xs text-slate-400 dark:text-zinc-500">
                                                        {pay.transactionId || "tx_mock_signature"}
                                                    </td>
                                                    <td className="py-4 px-6 font-black text-emerald-600 dark:text-emerald-400">
                                                        ${pay.amount}
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-500 dark:text-zinc-400 font-medium">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                                                            {formattedDate}
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
                )}

            </div>
        </div>
    );
}