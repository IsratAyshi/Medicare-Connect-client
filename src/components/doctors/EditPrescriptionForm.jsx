"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updatePrescriptionAction } from '@/lib/actions/prescriptions';
import { toast } from 'react-toastify';


export default function EditPrescriptionForm({ rxId, initialData, patientName }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [form, setForm] = useState({
        diagnosis: initialData?.diagnosis || '',
        medications: initialData?.medications || '',
        notes: initialData?.notes || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        startTransition(async () => {
            const res = await updatePrescriptionAction(rxId, form);
            if (res.success) {
                // Clear query parameters out of the active view matrix route cleanly
                toast.success("Prescription updated successfully!");
                router.push('/dashboard/medSpecialist/prescriptions');
            }
        });
    };

    return (
        <div className="bg-[#fcfaff] dark:bg-zinc-950 border border-purple-100 dark:border-purple-950/40 p-6 rounded-2xl space-y-5 shadow-sm animate-in fade-in-50 duration-200">
            <div className="flex justify-between items-center border-b border-purple-100/60 dark:border-purple-950/40 pb-3">
                <h2 className="text-lg font-bold text-purple-900 dark:text-purple-400">Modify Existing Prescription (Rx)</h2>
                <span className="bg-purple-50 dark:bg-zinc-900 text-purple-700 dark:text-zinc-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    Patient: <span className="text-[#00458F] dark:text-[#3B82F1] font-bold">{patientName}</span>
                </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Medical Diagnosis</label>
                    <input
                        required
                        type="text"
                        placeholder="e.g., Essential Hypertension, Viral Gastroenteritis"
                        value={form.diagnosis}
                        onChange={e => setForm({ ...form, diagnosis: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Medications Instructions</label>
                    <textarea
                        required
                        rows={3}
                        placeholder="e.g., Cetirizine 10mg at bedtime for 5 days, Vitamin D3 once weekly"
                        value={form.medications}
                        onChange={e => setForm({ ...form, medications: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Advisory Notes</label>
                    <textarea
                        rows={2}
                        placeholder="e.g., Maintain a balanced diet, avoid smoking, and seek immediate care if symptoms worsen."
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                        className="w-full text-sm px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard/medSpecialist/prescriptions')}
                        className="px-5 py-2 text-xs font-bold text-slate-500 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isPending}
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl shadow-sm transition-all disabled:opacity-50"
                    >
                        {isPending ? "Saving Revisions..." : "Save Revisions"}
                    </button>
                </div>
            </form>
        </div>
    );
}