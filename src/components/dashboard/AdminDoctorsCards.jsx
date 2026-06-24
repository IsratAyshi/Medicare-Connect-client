'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { updateDoctorVerificationStatus } from '@/lib/actions/admin';
import { toast } from 'react-toastify';

export default function AdminDoctorsCards({ initialDoctors }) {
    const [doctors, setDoctors] = useState(initialDoctors);
    const [processingId, setProcessingId] = useState(null);

    const getDoctorId = (doc) => doc?._id?.$oid || doc?._id || doc?.id;

    const handleStatusUpdate = async (doctor, targetStatus) => {
        const id = getDoctorId(doctor);
        setProcessingId(id);

        try {
            const res = await updateDoctorVerificationStatus(id, targetStatus);
            if (res?.success) {
                toast.success(`License successfully updated to ${targetStatus}!`);
                setDoctors(prev =>
                    prev.map(d => getDoctorId(d) === id ? { ...d, verificationStatus: targetStatus } : d)
                );
            } else {
                toast.error("Failed to register verification lifecycle transition changes.");
            }
        } catch (error) {
            console.error("Verification processing failed:", error);
            toast.error("An error occurred executing internal database queries.");
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusStyle = (status) => {
        const normalized = status?.toLowerCase() || 'pending';
        if (normalized === 'approved') return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40';
        if (normalized === 'rejected') return 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40';
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40';
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {doctors.length === 0 ? (
                <div className="w-full bg-white dark:bg-[#001e3d] rounded-2xl border p-20 text-center text-sm font-medium text-slate-400">
                    No practitioner registration profiles currently exist in the database repository.
                </div>
            ) : (
                doctors.map((doctor) => {
                    const docId = getDoctorId(doctor);
                    const currentStatus = doctor.verificationStatus || 'Pending';
                    const isRowLoading = processingId === docId;

                    return (
                        <div
                            key={docId}
                            className="w-full bg-white dark:bg-[#001e3d] rounded-2xl border border-slate-100 dark:border-slate-800/80 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                        >
                            {/* Left Core Context Identity Column */}
                            <div className="flex items-start gap-5 flex-1">
                                <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative shrink-0 border border-slate-100 dark:border-slate-700">
                                    <Image
                                        src={doctor.profileImage || "https://images.template.net/574174/Doctor-Headshot-Template-edit-online.webp"}
                                        alt={doctor.doctorName || 'Doctor'}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                            {doctor.doctorName || 'Dr. Practitioner'}
                                        </h3>
                                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/40">
                                            {doctor.specialization || 'General Medicine'}
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-400 dark:text-zinc-400">
                                        {doctor.hospitalName || 'Unassigned Health Center Facility'}
                                    </p>

                                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs font-medium text-slate-500 dark:text-zinc-400">
                                        <div>
                                            <span className="text-slate-400 dark:text-zinc-500 font-medium">Qualifications:</span> <span className="font-bold text-slate-700 dark:text-slate-200">{doctor.qualifications || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 dark:text-zinc-500 font-medium">Clinical Experience:</span> <span className="font-bold text-slate-700 dark:text-slate-200">{doctor.experience || 0} Years</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 dark:text-zinc-500 font-medium">Consultation Charge:</span> <span className="font-bold text-slate-800 dark:text-white">${doctor.consultationFee || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Interactive Actions Control Segment */}
                            <div className="flex flex-row md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 border-slate-100 dark:border-slate-800/60 pt-4 md:pt-0 w-full md:w-auto gap-4 shrink-0">
                                <div className="flex flex-col items-start md:items-end gap-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">Status</span>
                                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase ${getStatusStyle(currentStatus)}`}>
                                        {currentStatus}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    {isRowLoading ? (
                                        <div className="px-8 py-1.5 flex items-center justify-center">
                                            <span className="w-4 h-4 border-2 border-[#4376C8] border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    ) : (
                                        <>
                                            {currentStatus === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(doctor, 'Approved')}
                                                        className="text-xs font-bold bg-[#1A5336] text-white px-4 py-1.5 rounded-xl border border-transparent hover:bg-[#133F29] transition-all"
                                                    >
                                                        Approve Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(doctor, 'Rejected')}
                                                        className="text-xs font-bold bg-transparent text-rose-600 dark:text-rose-400 px-4 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
                                                    >
                                                        Reject License
                                                    </button>
                                                </>
                                            )}
                                            {currentStatus === 'Approved' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(doctor, 'Rejected')}
                                                        className="text-xs font-bold bg-transparent text-rose-600 dark:text-rose-400 px-4 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
                                                    >
                                                        Reject License
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(doctor, 'Pending')}
                                                        className="text-xs font-bold bg-transparent text-amber-600 dark:text-amber-400 px-4 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900/60 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all"
                                                    >
                                                        Cancel Verify
                                                    </button>
                                                </>
                                            )}
                                            {currentStatus === 'Rejected' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(doctor, 'Approved')}
                                                    className="text-xs font-bold bg-[#1A5336] text-white px-4 py-1.5 rounded-xl border border-transparent hover:bg-[#133F29] transition-all"
                                                >
                                                    Approve Verify
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    );
                })
            )}
        </div>
    );
}