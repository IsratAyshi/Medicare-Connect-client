"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import { serverMutation } from "@/lib/core/server";
import { clientMutation } from '@/lib/core/client-fetch';
import { Select, Label, ListBox } from "@heroui/react";
import { useSession } from '@/lib/auth-client';

export default function ReviewForm({ patientId, distinctDoctors, onClose, onReviewPublished }) {

    const { data: session } = useSession();
    const sessionToken = session?.session?.token || null;

    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [selectedRating, setSelectedRating] = useState("5");
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handlePublishFeedback = async (e) => {
        e.preventDefault();
        if (!selectedDoctorId) return toast.warning("Please choose a practitioner target from the menu list.");
        if (!commentText.trim()) return toast.warning("Please draft meaningful comment remarks before publishing.");

        setIsSubmitting(true);
        try {
            const result = await clientMutation("/api/reviews", {
                patientId,
                doctorId: selectedDoctorId,
                rating: Number(selectedRating),
                reviewText: commentText
            }, sessionToken);

            if (result?.success) {
                toast.success("Feedback profile record published successfully!");
                setCommentText("");
                onReviewPublished(); // Trigger list refresh in the parent container
                onClose();           // Close the form panel layout view
            } else {
                throw new Error(result?.error || "Execution error processing request submission handler.");
            }
        } catch (err) {
            toast.error(err.message || "Could not publish review submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#ECF0FF] dark:bg-zinc-900/40 border border-blue-100 dark:border-zinc-800/80 p-6 rounded-3xl space-y-5 animate-in fade-in slide-in-from-top-4 duration-200">
            <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-200">
                Leave your feedback for verified medical specialist you interacted with
            </h2>

            <form onSubmit={handlePublishFeedback} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* HeroUI v3 Select Architecture: Choosing Doctors */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Select Doctor</span>
                        <Select
                            selectedKeys={selectedDoctorId ? [selectedDoctorId] : []}
                            // onSelectionChange={(keys) => {

                            //     const value = Array.from(keys).join("");
                            //     setSelectedDoctorId(value);
                            // }}
                            onSelectionChange={(keys) => {
                                const value = keys instanceof Set
                                    ? Array.from(keys)[0]
                                    : keys;
                                setSelectedDoctorId(String(value || ""));
                            }}
                            className="w-full bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
                        >
                            <Select.Trigger className="w-full flex justify-between items-center border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm">
                                <Select.Value placeholder="Choose Doctor Profile" />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg mt-1 z-50">
                                <ListBox className="p-1">
                                    {distinctDoctors.map(doc => (
                                        // Explicitly bind text keys to the text value mapping engine
                                        <ListBox.Item id={String(doc.id)} key={String(doc.id)} textValue={doc.name} className="p-2 text-sm hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                                            <Label className="font-semibold block">{doc.name}</Label>
                                            <span className="text-xs text-slate-400 block">{doc.specialty}</span>
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* HeroUI v3 Select Architecture: Rating Values */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Rating</span>
                        <Select
                            selectedKeys={selectedRating ? [selectedRating] : []}
                            onSelectionChange={(keys) => {
                                const value = keys instanceof Set
                                    ? Array.from(keys)[0]
                                    : keys;
                                setSelectedRating(String(value || "5"));
                            }}
                            className="w-full bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100"
                        >
                            <Select.Trigger className="w-full flex justify-between items-center border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm">
                                <Select.Value placeholder="⭐⭐⭐⭐⭐ (5) Excellent" />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg mt-1 z-50">
                                <ListBox className="p-1">
                                    {[5, 4, 3, 2, 1].map(num => (
                                        // Explicitly define textValue string properties to prevent engine mixups
                                        // <ListBox.Item key={String(num)} textValue={`${num} Stars`} value={String(num)} className="p-2 text-sm hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                                        <ListBox.Item id={String(num)} key={String(num)} textValue={`${num} Stars`} className="p-2 text-sm hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
                                            {"⭐".repeat(num)} ({num}) {num === 5 ? 'Excellent' : num === 4 ? 'Good' : 'Average'}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </div>

                {/* Comment Area Text Field Entry Section */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">Review Comments</span>
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Comment on diagnosis accuracy, friendliness, etc..."
                        rows={3}
                        className="w-full p-4 text-sm bg-white dark:bg-zinc-900 text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:border-emerald-500"
                    />
                </div>

                {/* Control Actions Form Footers */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-white hover:bg-slate-50 dark:bg-transparent dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold text-sm border border-slate-200 dark:border-zinc-700 px-5 py-2 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#00458F] hover:bg-[#002F66] text-white font-bold text-sm px-5 py-2 rounded-xl transition-all disabled:opacity-50 shadow-sm"
                    >
                        {isSubmitting ? "Publishing..." : "Publish Review"}
                    </button>
                </div>
            </form>
        </div>
    );
}