"use client";

import { updateAppointmentStatusAction } from '@/lib/actions/appointments';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';


export default function ActionHandler({ appointmentId, patientId, currentStatus }) {
    // const [isUpdating, setIsUpdating] = useState(false);

    // const handleUpdateStatus = async (nextStatus) => {
    // setIsUpdating(true); // Turn loading state ON
    // await updateAppointmentStatusAction(appointmentId, nextStatus);
    // setIsUpdating(false); 
    // };

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    //useTransition hook gives an isPending boolean flag. This flag turns true the millisecond the user clicks the button and stays true until the server-side action is 100% finished and Next.js finishes re-rendering the updated elements

    const handleUpdateStatus = async (nextStatus) => {
        startTransition(async () => {
            const res = await updateAppointmentStatusAction(appointmentId, nextStatus);
            if (!res?.success) {
                console.error("Failed to transition status:", res?.error);
            }
        });
    };

    if (currentStatus === 'completed') return null;

    return (
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {currentStatus === 'pending' && (
                <>
                    <button
                        disabled={isPending}
                        onClick={() => handleUpdateStatus('accepted')}
                        className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        {isPending ? "Updating..." : "Accept Link"}
                    </button>
                    <button
                        disabled={isPending}
                        type="button"
                        className="flex-1 md:flex-none border border-rose-200 dark:border-rose-950/60 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/10 font-semibold text-xs px-4 py-2 rounded-xl transition-all disabled:opacity-50"
                    >
                        Reject
                    </button>
                </>
            )}

            {currentStatus === 'accepted' && (
                <button
                    type="button"
                    onClick={() => router.push(`/dashboard/medSpecialist/prescriptions?action=create&appointmentId=${appointmentId}&patientId=${patientId}`)}
                    className="w-full md:w-auto bg-[#004ca3] hover:bg-[#003d82] text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                >
                    Mark Completed & Prescribe
                </button>
            )}
        </div>
    );
}