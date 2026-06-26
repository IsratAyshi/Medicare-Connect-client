import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Inbox, Phone } from 'lucide-react';
import ActionHandler from '@/components/doctors/ActionHandler';
import { getDoctorAppointments } from '@/lib/api/doctors';
import { getUserSession } from '@/lib/core/session';

export default async function DoctorAppointmentsPage() {
    const user = await getUserSession();
    const doctorId = user?.id || user?._id;
    const appointments = await getDoctorAppointments(doctorId);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[rgb(24,34,47)] py-12 px-4 transition-colors duration-200">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Profile Section */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 dark:border-zinc-800 pb-5">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                            Scheduled Appointment Inbox
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                            Review requests, confirm consultation setups, and log diagnosis updates.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-2 rounded-2xl w-fit shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                            Active Queue: {appointments.length}
                        </span>
                    </div>
                </div>

                {/* Empty State Configuration */}
                {appointments.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center gap-3">
                        <Inbox className="w-10 h-10 text-slate-300 dark:text-zinc-600" />
                        <p className="text-sm font-medium text-slate-400 dark:text-zinc-500 italic">
                            No paid upcoming consultations detected in your system queue.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((appt) => {
                            const currentStatus = appt.appointmentStatus?.toLowerCase() || "pending";
                            const patientName = appt.patientDetails?.name || "Verified Patient";
                            const patientPhone = appt.patientDetails?.phoneNumber || "No Contact Number";
                            const patientAvatar = appt.patientDetails?.image || "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745";
                            const apptId = appt._id?.$oid || appt._id;

                            return (
                                <div
                                    key={apptId}
                                    className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between gap-6"
                                >
                                    {/* Main Column Details Container */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-zinc-800 relative shrink-0">
                                                <Image
                                                    src={patientAvatar}
                                                    alt={`${patientName} Avatar`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                                                        {patientName}
                                                    </h2>
                                                    <span className="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-bold text-[9px] tracking-wider px-2 py-0.5 rounded-md uppercase border border-slate-200/50 dark:border-zinc-700/50">
                                                        Paid Consultation
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                                    <Phone className="w-3 h-3" />
                                                    <span>{patientPhone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Operational Date/Time Tags Row */}
                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/30 px-3 py-2 rounded-xl w-fit">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-blue-500" />
                                                <span>{appt.appointmentDate}</span>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700 hidden sm:block" />
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                <span>{appt.appointmentTime}</span>
                                            </div>
                                        </div>

                                        {/* Symptom Presentation Box Block */}
                                        <div className="bg-slate-50/50 dark:bg-zinc-800/20 border border-slate-100 dark:border-zinc-800/60 p-4 rounded-xl">
                                            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                                                <span className="font-extrabold text-slate-700 dark:text-zinc-100 mr-1.5">
                                                    Symptom Presentation:
                                                </span>
                                                {appt.symptoms || <span className="text-slate-400 italic">No historical symptoms documented.</span>}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Panel Column (Right Alignment) */}
                                    <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-4 min-w-[180px] border-t md:border-t-0 border-slate-100 dark:border-zinc-800 pt-4 md:pt-0">
                                        <ActionHandler appointmentId={apptId} patientId={appt.patientId} currentStatus={currentStatus} />

                                        {/* Status Layout Badges */}
                                        {currentStatus === "completed" && (
                                            <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-black text-[10px] tracking-widest px-3.5 py-1.5 rounded-xl uppercase border border-blue-100 dark:border-blue-900/40 select-none">
                                                Completed
                                            </span>
                                        )}
                                        {currentStatus === "accepted" && (
                                            <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-black text-[10px] tracking-widest px-3.5 py-1.5 rounded-xl uppercase border border-emerald-100 dark:border-emerald-900/40 select-none">
                                                Accepted
                                            </span>
                                        )}
                                        {currentStatus === "pending" && (
                                            <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-black text-[10px] tracking-widest px-3.5 py-1.5 rounded-xl uppercase border border-amber-100 dark:border-amber-900/40 select-none">
                                                Pending
                                            </span>
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