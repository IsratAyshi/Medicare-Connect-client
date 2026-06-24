'use client';

import React from "react";
import { Modal, Button } from "@heroui/react";
import { CreditCard, SealCheck, ShieldCheck } from "@gravity-ui/icons";

export default function AppointmentBookingModal({
    isOpen,
    onClose,
    doctor,
    selectedDate,
    selectedSlot,
    onConfirmBooking
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="max-w-[480px] w-full bg-white dark:bg-[#0c1926] rounded-[32px] border border-slate-100 dark:border-slate-800/80 shadow-2xl overflow-hidden p-6 relative">

                        {/* Close Trigger Icon */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Modal Header Section */}
                        <Modal.Header className="flex items-center gap-3.5 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl tracking-tight select-none shrink-0">
                                S
                            </div>
                            <div>
                                <Modal.Heading className="text-lg font-extrabold text-slate-800 dark:text-white leading-tight">
                                    Stripe Checkout
                                </Modal.Heading>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-0.5">
                                    Secure Patient Co-Pay
                                </p>
                            </div>
                        </Modal.Header>

                        {/* Modal Body Container */}
                        <Modal.Body className="py-5 space-y-5">

                            {/* Summary Metadata Card Info Block */}
                            <div className="border border-slate-100 dark:border-slate-800 rounded-2xl p-4 space-y-3.5 bg-slate-50/50 dark:bg-zinc-900/30">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">Specialist</span>
                                        <span className="text-xs font-bold text-slate-800 dark:text-white block mt-0.5">{doctor?.doctorName}</span>
                                        <span className="text-[11px] text-slate-400 dark:text-zinc-400 mt-0.5 block">{doctor?.specialization}</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">Consultation Schedule</span>
                                        <span className="text-xs font-bold text-slate-800 dark:text-white block mt-0.5">{selectedDate}</span>
                                        <span className="text-[11px] text-slate-400 dark:text-zinc-400 mt-0.5 block">{selectedSlot}</span>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex justify-between items-center">
                                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-emerald-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <span className="text-xs font-semibold">Total Consultation Fee</span>
                                    </div>
                                    <span className="text-lg font-black text-slate-800 dark:text-white">
                                        ${doctor?.consultationFee}.00
                                    </span>
                                </div>
                            </div>

                            {/* Static Informational Inputs*/}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1.5">Card Number</label>
                                    <div className="w-full bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-700/80 rounded-xl py-2.5 px-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                                        <CreditCard />
                                        4242 &nbsp;4242 &nbsp;4242 &nbsp;4242
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1.5">Expiry Date</label>
                                        <div className="w-full bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-700/80 rounded-xl py-2.5 px-4 text-xs font-mono text-slate-500">12/28</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-1.5">Security Code (CVC)</label>
                                        <div className="w-full bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-700/80 rounded-xl py-2.5 px-4 text-xs font-mono text-slate-500">123</div>
                                    </div>
                                </div>
                            </div>

                            {/* Notification Info banner container */}
                            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-900/30 rounded-xl p-3 flex gap-2.5 items-start">
                                <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 leading-normal font-medium">
                                    Using static test environment card mock credentials (e.g. <span className="font-bold">4242 4242 4242 4242</span>) for this demo.
                                </p>
                            </div>

                        </Modal.Body>

                        {/* Modal Footer Section Actions */}
                        <Modal.Footer className="flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-2">
                            <Button
                                onClick={() => onConfirmBooking("unpaid", "pending")}
                                className="flex-1 bg-white dark:bg-transparent border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-xs font-bold py-3 px-4 rounded-xl transition-all"
                            >
                                Skip & Pay Later
                            </Button>


                            {/* <div className="flex-1">

                                <form action="/api/checkout_sessions" method="POST">
                                    <section>
                                        <button type="submit" role="link"
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <SealCheck />
                                            Pay ${doctor?.consultationFee}.00 via Stripe
                                        </button>
                                    </section>
                                </form>

                            </div> */}

                            <Button
                                onClick={() => onConfirmBooking("paid", "approved")}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                            >
                                <SealCheck />
                                Pay ${doctor?.consultationFee}.00 via Stripe
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}