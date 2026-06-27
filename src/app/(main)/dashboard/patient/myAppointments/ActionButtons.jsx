
"use client";

import React, { useState } from 'react';
import { Button, Modal, useOverlayState } from '@heroui/react';
import { handlePayNow } from '@/lib/actions/appointments-client';
import { getDoctorSchedule, rescheduleAppointment } from '@/lib/actions/appointments';


export default function ActionButtons({ appointment, isPaid }) {
    // const [isOpen, setIsOpen] = useState(false);

    const modalState = useOverlayState();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

    // Core Doctor Schedule States
    const [availableDays, setAvailableDays] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);

    const [formData, setFormData] = useState({
        appointmentDate: appointment?.appointmentDate || '',
        appointmentTime: appointment?.appointmentTime || ''
    });

    const doctorName = appointment?.doctorDetails?.doctorName || "your Clinical Specialist";
    const appointmentId = appointment?._id?.$oid || appointment?._id;
    const doctorId = appointment?.doctorId;


    const handleOpenModal = () => {
        modalState.open();

        if (doctorId) {
            setIsLoadingSchedule(true);
            getDoctorSchedule(doctorId)
                .then((res) => {
                    const slots = res?.availableSlots || [];
                    const days = res?.availableDays || [];

                    setAvailableSlots(slots);
                    setAvailableDays(days);

                    if (slots.length > 0 && !formData.appointmentTime) {
                        setFormData(prev => ({ ...prev, appointmentTime: slots[0] }));
                    }
                })
                .catch((err) => console.error("Schedule retrieval failed:", err))
                .finally(() => setIsLoadingSchedule(false));
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await rescheduleAppointment(appointmentId, formData);
            if (res?.success) {
                // setIsOpen(false);
                modalState.close();
            } else {
                alert(res?.message || "Failed to update schedule parameters.");
            }
        } catch (error) {
            console.error(error);
            alert("A network modification exception occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center gap-2 w-full justify-end">
            {!isPaid && (
                <button
                    onClick={() => handlePayNow(appointment)}
                    className="bg-[#1e533c] hover:bg-[#163e2c] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm"
                >
                    Pay now (Stripe)
                </button>
            )}

            {/* Reschedule Button - Now runs the optimized handler function */}
            <Button
                size="sm"
                variant="bordered"
                onClick={handleOpenModal}
                className="text-slate-600 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 font-semibold text-xs px-4 py-2.5 rounded-xl h-auto"
            >
                Reschedule
            </Button>

            <Button
                size="sm"
                variant="bordered"
                className="text-rose-500 border-rose-200 dark:border-rose-950/60 font-semibold text-xs px-4 py-2.5 rounded-xl h-auto hover:bg-rose-50/50 dark:hover:bg-rose-950/20"
            >
                Cancel
            </Button>

            {/* HeroUI Reschedule Modal Container Block */}

            {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}>
             */}
            <Modal state={modalState}>
                <Modal.Backdrop>
                    <Modal.Container placement="center">
                        <Modal.Dialog className="sm:max-w-md bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-0">
                            <Modal.CloseTrigger
                                // onClick={() => setIsOpen(false)} 
                                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600" />

                            <Modal.Header className="px-6 pt-6 pb-2">
                                <Modal.Heading className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                                    Reschedule Consultation
                                </Modal.Heading>
                                <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-500 dark:text-zinc-400">
                                    Select your new preferred date and available clinical slot with {doctorName}.
                                </p>

                                {/* Available Days Notification Section */}
                                {availableDays.length > 0 && (
                                    <div className="mt-3 inline-flex flex-wrap gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/60 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 w-full">
                                        <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Weekly Days:</span>
                                        <span className="text-xs font-semibold text-[#1e533c] dark:text-emerald-400">
                                            {availableDays.join(', ')}
                                        </span>
                                    </div>
                                )}
                            </Modal.Header>

                            <form onSubmit={handleFormSubmit}>
                                <Modal.Body className="px-6 py-4 space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Choose Date</label>
                                        <input
                                            type="date"
                                            name="appointmentDate"
                                            value={formData.appointmentDate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 text-sm border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-500 font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Choose Slot</label>
                                        <div className="relative">
                                            <select
                                                name="appointmentTime"
                                                value={formData.appointmentTime}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isLoadingSchedule || availableSlots.length === 0}
                                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 text-sm border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-emerald-500 font-medium disabled:opacity-60"
                                            >
                                                {isLoadingSchedule ? (
                                                    <option>Loading available hours...</option>
                                                ) : availableSlots.length === 0 ? (
                                                    <option>No available slots logged</option>
                                                ) : (
                                                    availableSlots.map((slot, index) => (
                                                        <option key={index} value={slot}>
                                                            {slot}
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer className="px-6 pb-6 pt-2 flex justify-end gap-2.5">
                                    <Button
                                        type="button"
                                        variant="bordered"
                                        onClick={modalState.close}
                                        className="text-slate-600 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 font-semibold text-xs px-5 py-2 rounded-xl h-auto"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || isLoadingSchedule || availableSlots.length === 0}
                                        className="bg-[#1e533c] hover:bg-[#163e2c] text-white font-semibold text-xs px-5 py-2 rounded-xl h-auto transition-all shadow-sm disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Updating..." : "Reschedule"}
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </div>
    );
}