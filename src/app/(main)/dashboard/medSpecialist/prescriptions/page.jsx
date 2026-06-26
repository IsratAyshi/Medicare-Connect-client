// dashboard/medSpecialist/prescriptions/page.jsx
import React from 'react';

import { getUserSession } from '@/lib/core/session';
import { getDoctorPrescriptions, getSinglePatientRecord } from '@/lib/api/doctors';
import PrescriptionForm from '@/components/doctors/PrescriptionForm';


export default async function PrescriptionsCabinPage({ searchParams }) {

    const params = await searchParams;
    const openFormView = params?.action === 'create';

    const user = await getUserSession();
    const doctorId = user?.id || user?._id;


    const [prescriptions, targetPatient] = await Promise.all([
        getDoctorPrescriptions(doctorId),
        openFormView ? getSinglePatientRecord(params?.patientId) : null
    ]);

    return (
        <div className="min-h-screen bg-white dark:bg-[rgb(24,34,47)] py-12 px-6 transition-colors duration-200">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                    Medications & Prescription Records
                </h1>

                {/* Form Injection Area for New Prescriptions */}
                {openFormView && (
                    <PrescriptionForm
                        appointmentId={params?.appointmentId}
                        patientId={params?.patientId}
                        patientName={targetPatient?.name || "Verified Patient"}
                        doctorId={doctorId}
                    />
                )}

                {/* Prescriptions List */}
                <div className="space-y-4">
                    {prescriptions.length === 0 ? (
                        <div className="text-center p-12 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800">
                            <p className="text-xs text-slate-400 italic">No historical records logged in your prescription archive.</p>
                        </div>
                    ) : (
                        prescriptions.map((rx) => {
                            const rxId = rx._id?.$oid || rx._id;
                            const dateString = rx.createdAt ? new Date(rx.createdAt).toLocaleDateString() : "Recent Date";

                            return (
                                <div
                                    key={rxId}
                                    className="bg-[#ECF0FF] dark:bg-zinc-900/90 border border-slate-200/70 dark:border-zinc-800 p-6 rounded-2xl shadow-sm space-y-3 relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                                {rx.patient?.name || "Anonymous Patient"}
                                            </h3>
                                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                                                Date of Issue: {dateString}
                                            </p>
                                        </div>
                                        <button className="border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 text-slate-600 dark:text-zinc-300 font-bold text-xs px-3 py-1.5 rounded-xl transition-all">
                                            Modify Rx
                                        </button>
                                    </div>

                                    <div className="text-xs space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                                        <p className="text-slate-600 dark:text-zinc-300">
                                            <span className="font-extrabold text-slate-700 dark:text-white mr-1.5">Diagnosis:</span>
                                            {rx.diagnosis}
                                        </p>
                                        <p className="text-slate-600 dark:text-zinc-300">
                                            <span className="font-extrabold text-slate-700 dark:text-white mr-1.5">Medications:</span>
                                            {rx.medications}
                                        </p>
                                        {rx.notes && (
                                            <p className="text-slate-600 dark:text-zinc-300">
                                                <span className="font-extrabold text-slate-700 dark:text-white mr-1.5">Notes:</span>
                                                {rx.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}