import React from 'react';

import { getPatientAppointments } from '@/lib/api/appointments';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { getUserSession } from '@/lib/core/session';
import ActionButtons from './ActionButtons';

export default async function PatientMyAppointmentPage() {
    const user = await getUserSession();
    const appointments = await getPatientAppointments(user?.id || user?._id);

    return (
        <div className='min-h-screen bg-white dark:bg-[rgb(35,49,67)] py-12 px-4 transition-colors duration-200 '>
            <div className='max-w-5xl mx-auto space-y-6'>

                {/* Title Header Section */}
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-4">
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                        Appointment Records
                    </h1>
                    <span className="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 px-3 py-1 rounded-full text-xs font-bold">
                        Total: {appointments.length}
                    </span>
                </div>

                {/* Empty State Exception handling */}
                {appointments.length === 0 ? (
                    <div className="text-center p-12 bg-slate-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800">
                        <p className="text-sm text-slate-400 dark:text-zinc-500 italic">No scheduled clinician appointment configurations logged.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {appointments.map((appt) => {
                            const isPaid = appt.paymentStatus === 'paid';
                            const isCompleted = appt.appointmentStatus?.toLowerCase() === 'completed';
                            const doctorName = appt.doctorDetails?.doctorName || "Specified Clinician";
                            const specialization = appt.doctorDetails?.specialization || "General Medicine";
                            const fee = appt.doctorDetails?.consultationFee || "150";

                            return (
                                <div
                                    key={appt._id?.$oid || appt._id}
                                    className="bg-white dark:bg-zinc-900/90 border border-slate-200/70 dark:border-zinc-800/80 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between gap-6 transition-all hover:border-blue-200 dark:hover:border-zinc-700"
                                >
                                    {/* Left Details Block */}
                                    <div className="flex-1 space-y-3.5">
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                                {doctorName}
                                            </h2>
                                            <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-[10px] tracking-wider px-2.5 py-0.5 rounded-full uppercase">
                                                {specialization}
                                            </span>
                                        </div>

                                        {/* Meta Scheduling Items */}
                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                <span>{appt.appointmentDate}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                <span>{appt.appointmentTime}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CreditCard className="w-4 h-4 text-slate-400" />
                                                <span>
                                                    Fee Paid:{" "}
                                                    <span className={isPaid ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-rose-500 font-bold"}>
                                                        {isPaid ? `Paid ($${fee})` : `Unpaid ($${fee})`}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Symptoms Container Box */}
                                        <div className="bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800 p-3.5 rounded-xl max-w-2xl">
                                            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                                                <span className="font-bold text-slate-700 dark:text-white mr-1">Symptoms:</span>
                                                {appt.symptoms || <span className="text-slate-400 italic">None logged</span>}
                                            </p>
                                        </div>

                                        {/* Fake / Sandbox Mock Stripe Transaction Track Token ID if present */}
                                        {appt.transactionId && (
                                            <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 tracking-tight">
                                                Stripe ID: {appt.transactionId}
                                            </p>
                                        )}
                                    </div>

                                    {/* Right Controls Area */}
                                    <div className="flex flex-col justify-center items-end gap-3 min-w-[160px]">
                                        {isCompleted ? (
                                            <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-extrabold text-[10px] tracking-widest px-4 py-1.5 rounded-lg uppercase select-none border border-blue-100 dark:border-blue-900/30">
                                                Completed
                                            </span>
                                        ) : (
                                            <div className="flex flex-col items-stretch md:items-end gap-2.5 w-full">
                                                {/* Client Buttons Handler component */}
                                                <ActionButtons appointment={appt} isPaid={isPaid} />

                                                {/* Dynamic Status Chip styling logic */}
                                                {appt.appointmentStatus?.toLowerCase() === 'accepted' ? (
                                                    <span className="self-center md:self-end bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] tracking-widest px-4 py-1 rounded-lg uppercase border border-emerald-100 dark:border-emerald-900/20 select-none">
                                                        Accepted
                                                    </span>
                                                ) : (
                                                    <span className="self-center md:self-end bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] tracking-widest px-4 py-1 rounded-lg uppercase border border-amber-100 dark:border-amber-900/20 select-none">
                                                        {appt.appointmentStatus || "Pending"}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}