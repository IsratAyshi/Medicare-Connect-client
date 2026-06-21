import React from 'react';
import { getDoctorDetails, getDoctorReviews } from '@/lib/api/doctors';

import { notFound } from 'next/navigation';
import DoctorDetailsContainer from '@/components/doctors/DoctorDetailsContainer';

export default async function DoctorDetailsPage({ params }) {
    const { id } = await params;

    // Fetch details and reviews in parallel
    const [doctor, reviews] = await Promise.all([
        getDoctorDetails(id).catch(() => null),
        getDoctorReviews(id).catch(() => [])
    ]);

    // Throw 404 page if doctor data document wasn't located
    if (!doctor) {
        notFound();
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-zinc-950 pt-28 pb-16 px-4 md:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <DoctorDetailsContainer doctor={doctor} initialReviews={reviews || []} />
            </div>
        </div>
    );
}