"use client";

import React, { useState, useEffect } from 'react';

import { Star, Trash2, Edit3, MessageSquarePlus } from 'lucide-react';
import { toast } from 'react-toastify';

// Subcomponents & Data Fetchers
import ReviewForm from './ReviewForm';

import { useSession } from '@/lib/auth-client';
import { getPatientReviews, getPatientVisitedDoctors } from '@/lib/api/reviews';

export default function PatientMyReviewsPage() {
    const { data: session } = useSession();
    const patientId = session?.user?.id || session?.user?._id;

    const sessionToken = session?.session?.token || null;

    const [reviews, setReviews] = useState([]);
    const [distinctDoctors, setDistinctDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const refreshReviewsList = async () => {
        if (!patientId || !sessionToken) return;
        const updatedReviews = await getPatientReviews(patientId, sessionToken);
        setReviews(updatedReviews);
    };

    useEffect(() => {
        if (!patientId || !sessionToken) return;

        async function loadReviewWorkspace() {
            try {
                const reviewsData = await getPatientReviews(patientId, sessionToken);
                setReviews(reviewsData);

                const appointmentsData = await getPatientVisitedDoctors(patientId, sessionToken);
                const uniqueDocs = [];
                const seen = new Set();

                appointmentsData.forEach(appt => {
                    if (appt.doctorId && !seen.has(appt.doctorId) && appt.doctorDetails) {
                        seen.add(appt.doctorId);
                        uniqueDocs.push({
                            id: appt.doctorId,
                            name: appt.doctorDetails.doctorName,
                            specialty: appt.doctorDetails.specialization
                        });
                    }
                });
                setDistinctDoctors(uniqueDocs);

            } catch (err) {
                console.error("Dashboard mount data pipeline error:", err);
                toast.error("Failed to load dashboard review records.");
            } finally {
                setIsLoading(false);
            }
        }
        loadReviewWorkspace();
    }, [patientId, sessionToken]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-[rgb(35,49,67)]">
                <div className="text-center p-20 font-medium text-slate-400 dark:text-zinc-500 animate-pulse">
                    Synchronizing feedback database records...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[rgb(35,49,67)] py-12 px-4 transition-colors duration-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Dashboard Header Bar Title */}
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800/80 pb-4">
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                        My Feedback Reviews
                    </h1>
                    {!isFormOpen && (
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-[#00458F] hover:bg-[#002F66] text-white font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all"
                        >
                            <MessageSquarePlus className="w-4 h-4" />
                            Write New Review
                        </button>
                    )}
                </div>

                {/* Separated Clean Toggled Form Component */}
                {isFormOpen && (
                    <ReviewForm
                        patientId={patientId}
                        distinctDoctors={distinctDoctors}
                        onClose={() => setIsFormOpen(false)}
                        onReviewPublished={refreshReviewsList}
                    />
                )}

                {/* Grid Displays: Existing Logged Reviews */}
                {reviews.length === 0 ? (
                    <div className="text-center p-12 bg-slate-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800">
                        <p className="text-sm text-slate-400 dark:text-zinc-500 italic">No feedback reviews written yet from your portal profile account.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map((rev) => {
                            const docName = rev.doctorDetails?.doctorName || "Specified Clinician";
                            const docSpecialization = rev.doctorDetails?.specialization || "General Medicine";
                            const rawDate = rev.createdAt?.$date || rev.createdAt;
                            const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('en-US') : 'Recent';

                            return (
                                <div
                                    key={rev._id?.$oid || rev._id}
                                    className="bg-white dark:bg-zinc-900/90 border border-slate-200/70 dark:border-zinc-800/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-200 dark:hover:border-zinc-700 transition-all"
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{docName}</h3>
                                                <p className="text-xs text-slate-400 font-medium tracking-wide">{docSpecialization}</p>
                                            </div>
                                            <div className="flex items-center text-amber-400">
                                                {Array.from({ length: Number(rev.rating) || 5 }).map((_, idx) => (
                                                    <Star key={idx} className="w-4 h-4 fill-current" />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-600 dark:text-zinc-300 italic leading-relaxed pt-1">
                                            "{rev.reviewText}"
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-zinc-800/50 text-xs text-slate-400 font-medium">
                                        <span>Published: {formattedDate}</span>
                                        <div className="flex items-center gap-1">
                                            <button type="button" className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button type="button" className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg text-slate-400 hover:text-rose-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
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