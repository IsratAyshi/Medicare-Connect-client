"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { verifyAndSaveStripeAppointment } from '@/lib/actions/appointments';

const PaymentSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const dashboardLinks = {
        admin: '/dashboard/admin',
        patient_family: '/dashboard/patient',
        medical_specialist: '/dashboard/medSpecialist'
    }

    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState("Verifying your payment secure records...");

    const sessionId = searchParams.get('session_id');
    const initialized = useRef(false); //On execution #1, initialized.current is false, when execution #2 fires, initialized.current is now true, so stops from useEffect from running twice

    useEffect(() => {
        // if (!sessionId) {
        //     setLoading(false);
        //     setStatusMessage("No active session identifier found.");
        //     return;
        // }

        if (!sessionId) {
            // Wrap early sync returns in a setTimeout to defer the state update safely
            setTimeout(() => {
                setLoading(false);
                setStatusMessage("No active session identifier found.");
            }, 0);
            return;
        }

        // Strict mode guard check
        if (initialized.current) return;
        initialized.current = true;

        const fulfillOrder = async () => {
            try {
                const res = await verifyAndSaveStripeAppointment(sessionId);
                if (res?.success) {
                    setStatusMessage("Payment verified successfully! Your appointment has been confirmed.");
                } else {
                    setStatusMessage(res?.message || "Could not confirm payment structure status.");
                }
            } catch (err) {
                setStatusMessage("An unexpected networking validation error surfaced.");
            } finally {
                setLoading(false);
            }
        };

        fulfillOrder();
    }, [sessionId]);

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 mt-25">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 p-8 rounded-3xl shadow-xl text-center space-y-6">

                {loading ? (
                    <div className="mx-auto flex items-center justify-center h-20 w-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                        <svg className="h-10 w-10 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                        {loading ? "Confirming Booking..." : "Payment Status Update"}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {statusMessage}
                    </p>
                </div>

                <hr className="border-slate-100 dark:border-zinc-800" />

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        href={user && user.accountRole ? `${dashboardLinks[user.accountRole]}` : '/'}
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 text-center bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 text-xs font-bold py-3.5 px-4 rounded-xl transition-all border border-slate-200/40"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;