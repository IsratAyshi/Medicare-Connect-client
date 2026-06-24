"use client";

import React, { useState } from "react";
import { Star } from "@gravity-ui/icons";
import Image from "next/image";
import { Button } from "@heroui/react";
import { toast } from "react-toastify";
import AppointmentBookingModal from "@/components/booking/AppointmentBookingModal";
// 1. IMPORT THE SERVER ACTION
import { createNewAppointment } from "@/lib/actions/appointments";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DoctorDetailsContainer({ doctor, initialReviews }) {
    const router = useRouter();
    const { data: session } = useSession();


    const [selectedDate, setSelectedDate] = useState("2026-06-23");
    const [selectedSlot, setSelectedSlot] = useState(doctor?.availableSlots?.[0] || "");
    const [symptoms, setSymptoms] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isVerified = doctor?.verificationStatus === "Approved";

    const handleBooking = () => {
        if (!session?.user) {
            toast.warn("Please sign in to schedule your clinical appointment.");
            router.push("/auth/login");
            return;
        }

        if (!isVerified) return;
        setIsModalOpen(true);
    }


    // const handleConfirmFinalBooking = async (paymentStatus, appointmentStatus) => {
    //     if (isSubmitting) return;

    //     if (!session?.user?.id) {
    //         toast.error("Your current session has expired. Please re-authenticate.");
    //         router.push("/auth/login");
    //         return;
    //     }

    //     setIsSubmitting(true);

    //     const appointmentPayload = {
    //         patientId: session.user.id,
    //         doctorId: doctor._id?.$oid || doctor._id,
    //         appointmentDate: selectedDate,
    //         appointmentTime: selectedSlot,
    //         appointmentStatus: appointmentStatus,  // e.g. "pending" or "approved"
    //         symptoms: symptoms,
    //         paymentStatus: paymentStatus  // e.g. "unpaid" or "paid"
    //     };

    //     try {
    //         const res = await createNewAppointment(appointmentPayload);

    //         if (res?.success) {
    //             toast.success(
    //                 paymentStatus === "paid"
    //                     ? `Appointment scheduled and paid securely via Stripe!`
    //                     : `Appointment registered! Please clear payment due at the clinic.`
    //             );
    //             setSymptoms("");
    //             setIsModalOpen(false);
    //         } else {
    //             toast.error(res?.message || "Failed to commit appointment details to the database.");
    //         }
    //     } catch (error) {
    //         console.error("Booking handler network error:", error);
    //         toast.error("A critical network fault occurred processing your scheduling entry.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };


    const handleConfirmFinalBooking = async (paymentStatus, appointmentStatus) => {
        if (isSubmitting) return;

        if (!session?.user?.id) {
            toast.error("Your current session has expired. Please re-authenticate.");
            router.push("/auth/login");
            return;
        }

        setIsSubmitting(true);

        // Package up the core metadata fields
        const appointmentMetadata = {
            patientId: session.user.id,
            doctorId: doctor._id?.$oid || doctor._id,
            appointmentDate: selectedDate,
            appointmentTime: selectedSlot,
            symptoms: symptoms,
        };

        // --- STRIPE LIVE CHECKOUT ROUTE ---
        if (paymentStatus === "paid") {
            try {
                if (!doctor?.stripePriceId) {
                    throw new Error("This doctor does not have an active payment setup configuration.");
                }

                const response = await fetch("/api/checkout_sessions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        stripePriceId: doctor.stripePriceId, // Populated from your MongoDB document
                        doctorId: doctor._id,
                        metadata: appointmentMetadata   // Carries details to Stripe for processing later
                    }),
                });

                const data = await response.json();

                if (data.url) {
                    // Hand off control to Stripe's secure payment interface
                    window.location.assign(data.url);
                } else {
                    throw new Error(data.error || "Failed to initialize Stripe checkout room.");
                }
            } catch (error) {
                console.error("Stripe routing initialization fault:", error);
                toast.error(error.message || "Could not launch secure payment engine.");
                setIsSubmitting(false);
            }
            return;
        }

        // --- PAY LATER / CLINIC PAYMENT REGISTER FLOW ---
        const appointmentPayload = {
            ...appointmentMetadata,
            appointmentStatus: appointmentStatus, // e.g. "pending"
            paymentStatus: "unpaid"
        };

        try {
            const res = await createNewAppointment(appointmentPayload);

            if (res?.success) {
                toast.success("Appointment registered! Please clear payment due at the clinic.");
                setSymptoms("");
                setIsModalOpen(false);
            } else {
                toast.error(res?.message || "Failed to commit appointment details to the database.");
            }
        } catch (error) {
            console.error("Booking handler network error:", error);
            toast.error("A critical network fault occurred processing your scheduling entry.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT AREA: Doctor Profile Info + Reviews */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 p-6 rounded-3xl flex flex-col sm:flex-row gap-6 shadow-sm">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700">
                        <Image
                            src={doctor?.profileImage}
                            alt={doctor?.doctorName}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{doctor?.doctorName}</h1>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${isVerified
                                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50"
                                : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50"
                                }`}>
                                {doctor?.verificationStatus || "Pending"}
                            </span>
                        </div>

                        <span className="mt-1.5 self-start bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-lg uppercase">
                            {doctor?.specialization} Specialist
                        </span>

                        <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-zinc-300">
                            <p><span className="font-semibold text-slate-400 dark:text-zinc-500">Qualifications:</span> {doctor?.qualifications}</p>
                            <p><span className="font-semibold text-slate-400 dark:text-zinc-500">Clinical Experience:</span> {doctor?.experience} Years Active Practice</p>
                            <p><span className="font-semibold text-slate-400 dark:text-zinc-500">Affiliated Hospital:</span> {doctor?.hospitalName}</p>
                            <p><span className="font-semibold text-slate-400 dark:text-zinc-500">Appointment Fee:</span> ${doctor?.consultationFee}</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Block */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 p-6 rounded-3xl shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                        Clinician Reviews Feedback ({initialReviews.length})
                    </h2>

                    {initialReviews.length > 0 ? (
                        <div className="space-y-4">
                            {initialReviews.map((review, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{review.reviewerName || "Anonymous User"}</h4>
                                            <span className="text-[11px] text-slate-400">{review.date || "Recent"}</span>
                                        </div>
                                        <div className="flex text-amber-400 gap-0.5">
                                            {[...Array(review.rating || 5)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-zinc-300 italic leading-relaxed">
                                        "{review.comment}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-400 dark:text-zinc-500 italic">No feedback reviews submitted yet for this specialist.</p>
                    )}
                </div>
            </div>

            {/* RIGHT SIDEBAR: Scheduling & Form Panels */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 p-6 rounded-3xl shadow-sm space-y-5">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Schedule Your Appointment</h2>
                    <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                        Set active weekdays, daily clinician slot, and your symptoms description.
                    </p>
                </div>

                {/* Available Days */}
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-2">Available Clinical Workdays</span>
                    <div className="flex flex-wrap gap-2">
                        {doctor?.availableDays?.map((day) => (
                            <span key={day} className="px-3 py-1 bg-blue-50 dark:bg-zinc-800 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-zinc-700">
                                {day}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Date Input */}
                <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-2">Configure Appointment Date</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        disabled={!isVerified}
                        className="w-full bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-xl py-2.5 px-4 text-sm font-normal outline-none focus:border-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Slots Dropdown */}
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-2">Available Slots</span>
                    <div className="relative w-full">
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            disabled={!isVerified}
                            className="w-full bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-xl py-2.5 pl-4 pr-10 text-sm font-normal outline-none focus:border-blue-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed appearance-none"
                        >
                            {doctor?.availableSlots?.map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 dark:text-zinc-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Symptoms Presentation text area */}
                <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-2">Symptoms Presentation</label>
                    <textarea
                        rows={3}
                        placeholder="e.g. Mild headache, regular physical co-pay check..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        disabled={!isVerified}
                        className="w-full bg-slate-50 dark:bg-zinc-800/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 border border-slate-200 dark:border-zinc-700 rounded-xl py-2.5 px-4 text-sm font-normal outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Submit Action Button */}
                {isVerified ? (
                    <Button
                        onClick={handleBooking}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-blue-500/10 transition-colors flex items-center justify-center"
                    >
                        <span>Book Appointment (${doctor?.consultationFee})</span>
                    </Button>
                ) : (
                    <div className="space-y-3">
                        <button
                            disabled
                            className="w-full bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 font-semibold py-3 px-4 rounded-xl flex items-center justify-center cursor-not-allowed"
                        >
                            <span>Appointment Booking Unavailable</span>
                        </button>
                        <p className="text-[11px] text-center text-amber-600 dark:text-amber-400/80 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/60 dark:border-amber-900/30 rounded-xl p-2.5">
                            This doctor is currently not taking appointments because their profile verification is pending approval.
                        </p>
                    </div>
                )}
            </div>

            {/* 3. INJECT THE RECONFIGURED TRANSACTION OVERLAY MODAL */}
            <AppointmentBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                doctor={doctor}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onConfirmBooking={handleConfirmFinalBooking}
            />

        </div>
    );
}