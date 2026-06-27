
"use client";

import React, { useState } from 'react';
import { AlertDialog, Button, Modal, useOverlayState } from '@heroui/react';
import { handlePayNow } from '@/lib/actions/appointments-client';
import { cancelAppointment, getDoctorSchedule, rescheduleAppointment } from '@/lib/actions/appointments';
import { toast } from 'react-toastify';


export default function ActionButtons({ appointment, isPaid }) {
    // const [isOpen, setIsOpen] = useState(false);

    const modalState = useOverlayState();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    const [appointmentToCancel, setAppointmentToCancel] = useState(null);

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

    const handleConfirmCancel = async () => {
        if (!appointmentToCancel) return;

        setIsCanceling(true);
        try {
            const res = await cancelAppointment(appointmentId);
            if (res?.success) {
                setAppointmentToCancel(null); // Close the AlertDialog on success
                toast.success("The appointment has been canceled.");
            } else {
                toast.error(res?.message || "Failed to cancel the appointment.");
            }
        } catch (error) {
            console.error("Cancellation flow encountered an error:", error);
            toast.error("A network modification exception occurred while canceling.");
        } finally {
            setIsCanceling(false);
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

            {/* Reschedule Button */}
            <Button
                size="sm"
                variant="bordered"
                onClick={handleOpenModal}
                className="text-slate-600 bg-purple-100 dark:bg-purple-900/20 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 font-semibold text-xs px-4 py-2.5 rounded-xl h-auto"
            >
                Reschedule
            </Button>

            <Button
                size="sm"
                variant="bordered"
                onClick={() => setAppointmentToCancel(appointment)}
                disabled={isCanceling || isSubmitting}
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
                                        <span className="text-xs font-semibold text-[#002F66] dark:text-emerald-400">
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
                                        className="bg-[#00458F] hover:bg-[#002F66] text-white font-semibold text-xs px-5 py-2 rounded-xl h-auto transition-all shadow-sm disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Updating..." : "Reschedule"}
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>



            {/* --- HeroUI Cancellation Confirmation Alert Dialog Layout --- */}
            <AlertDialog>
                <AlertDialog.Backdrop
                    isOpen={appointmentToCancel !== null}
                    onOpenChange={(open) => {
                        if (!open) setAppointmentToCancel(null);
                    }}
                >
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[420px] bg-white dark:bg-[#1a2432] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl">
                            <AlertDialog.CloseTrigger onClick={() => setAppointmentToCancel(null)} />

                            <AlertDialog.Header className="flex gap-3 items-center">
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                                    Cancel Appointment?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body className="py-3">
                                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                                    Are you sure you want to cancel the appointment scheduled for
                                    <strong> {appointmentToCancel?.appointmentDate}</strong> at
                                    <strong> {appointmentToCancel?.appointmentTime}</strong>?
                                </p>
                                {appointmentToCancel?.paymentStatus === 'paid' && (
                                    <div className="mt-2.5 p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                                            ⚠️ Detected Paid Appointment. Proceeding will result in a refund.
                                        </p>
                                    </div>
                                )}
                                <p className="mt-3 text-xs text-slate-400 dark:text-zinc-500">
                                    This data tracking purge layer operations are destructive and cannot be reversed.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer className="flex justify-end gap-2 pt-2 border-t border-slate-50 dark:border-slate-800/60">
                                <Button
                                    variant="tertiary"
                                    disabled={isCanceling}
                                    onClick={() => setAppointmentToCancel(null)}
                                >
                                    Go Back
                                </Button>
                                <Button
                                    variant="danger"
                                    disabled={isCanceling}
                                    onClick={handleConfirmCancel}
                                >
                                    {isCanceling ? "Canceling..." : "Confirm Cancellation"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>

        </div>
    );
}