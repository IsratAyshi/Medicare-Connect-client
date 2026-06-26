'use client';

import React, { useState } from 'react';
import { Select, ListBox, Button } from '@heroui/react';
import { ChevronDown, TrashBin } from '@gravity-ui/icons';
import { updateDoctorSchedule } from '@/lib/actions/doctors';
import { toast } from 'react-toastify';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

const triggerClasses = "w-full bg-white dark:bg-[#1e2b3c] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between outline-none min-w-[180px] sm:min-w-[240px]";
const popoverClasses = "bg-white dark:bg-[#1e2b3c] border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-xl max-h-[280px] overflow-y-auto";
const listItemClasses = "text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white outline-none data-[focused=true]:bg-slate-100 dark:data-[focused=true]:bg-slate-800";

// Normalizes whatever onSelectionChange hands us (Set, string, or Key) into a real Set
function normalizeSelection(keys) {
    if (keys instanceof Set) return keys;
    if (keys === null || keys === undefined) return new Set();
    return new Set([keys]);
}

export default function ScheduleManagerForm({ userId, initialDays, initialSlots }) {
    const [days, setDays] = useState(initialDays);
    const [slots, setSlots] = useState(initialSlots);

    const [selectedDayKeys, setSelectedDayKeys] = useState(new Set(['Monday']));
    const [selectedSlotKeys, setSelectedSlotKeys] = useState(new Set(['09:00 AM']));
    const [isSaving, setIsSaving] = useState(false);

    // Dynamic Array Operations
    const handleAddDay = () => {
        const dayValue = Array.from(selectedDayKeys)[0];
        if (!dayValue) return;

        if (days.includes(dayValue)) {
            alert(`${dayValue} is already configured.`);
            return;
        }
        setDays([...days, dayValue]);
    };

    const handleRemoveDay = (dayToRemove) => {
        setDays(days.filter(d => d !== dayToRemove));
    };

    const handleAddSlot = () => {
        const slotValue = Array.from(selectedSlotKeys)[0];
        if (!slotValue) return;

        if (slots.includes(slotValue)) {
            toast.warning(`${slotValue} is already configured.`);
            return;
        }
        const updatedSlots = [...slots, slotValue].sort((a, b) => {
            return TIME_SLOTS.indexOf(a) - TIME_SLOTS.indexOf(b);
        });
        setSlots(updatedSlots);
    };

    const handleRemoveSlot = (slotToRemove) => {
        setSlots(slots.filter(s => s !== slotToRemove));
    };

    const handleSaveSchedule = async () => {
        setIsSaving(true);
        try {
            const res = await updateDoctorSchedule(userId, {
                availableDays: days,
                availableSlots: slots
            });
            if (res?.modifiedCount > 0) {
                toast.success("Clinical slots updated successfully!");
            } else {
                toast.warning("No changes detected in configurations.");
            }
        } catch (err) {
            toast.error("Could not synchronize timetable properties.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* CARD 1: Working days */}
                <div className="bg-white dark:bg-[#001e3d] border border-slate-100 dark:border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Working Days</h2>
                        <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-1 rounded-md font-bold tracking-wide uppercase">Configure Days</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full">
                        <Select
                            className="flex-1"
                            selectedKeys={selectedDayKeys}
                            onSelectionChange={(keys) => setSelectedDayKeys(normalizeSelection(keys))}
                        >
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-slate-800 dark:text-slate-100 font-medium text-sm text-left" />
                                <Select.Indicator><ChevronDown size={16} className="text-slate-400" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    {WEEKDAYS.map(day => (
                                        <ListBox.Item id={day} key={day} className={listItemClasses} textValue={day}>{day}</ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Button
                            onPress={handleAddDay}
                            className="bg-[#4376C8] text-white font-semibold hover:bg-[#00458F] h-11 px-5 rounded-xl transition-colors flex items-center gap-1"
                        >
                            + Add
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                        {days.map(day => (
                            <div key={day} className="flex items-center gap-2 bg-[#f1dce8] dark:bg-pink-700/20 text-pink-900 dark:text-pink-200 border border-pink-200 dark:border-pink-700/60 px-3 py-1.5 rounded-full text-xs font-semibold select-none group">
                                {day}
                                <button onClick={() => handleRemoveDay(day)} className="text-pink-700/30 hover:text-rose-500 transition-colors">
                                    <TrashBin size={13} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CARD 2: Configured Appointment Hours */}
                <div className="bg-white dark:bg-[#001e3d] border border-slate-100 dark:border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Appointment Time Slots</h2>

                    <div className="flex flex-wrap items-center gap-3 w-full">
                        <Select
                            className="flex-1"
                            selectedKeys={selectedSlotKeys}
                            onSelectionChange={(keys) => setSelectedSlotKeys(normalizeSelection(keys))}
                        >
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-slate-800 dark:text-slate-100 font-medium text-sm text-left" />
                                <Select.Indicator><ChevronDown size={16} className="text-slate-400" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    {TIME_SLOTS.map(time => (
                                        <ListBox.Item id={time} key={time} className={listItemClasses} textValue={time}>{time}</ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Button
                            onPress={handleAddSlot}
                            className="bg-[#4376C8] text-white font-semibold hover:bg-[#00458F] h-11 px-5 rounded-xl transition-colors flex items-center gap-1"
                        >
                            + Add
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                        {slots.map(slot => (
                            <div key={slot} className="flex items-center gap-2 bg-[#e2fafd] dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900 text-[#008d93] dark:text-cyan-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm select-none">
                                {slot}
                                <button onClick={() => handleRemoveSlot(slot)} className="text-cyan-500/60 hover:text-rose-500 transition-colors">
                                    <TrashBin size={13} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="flex justify-end pt-4 pr-2">
                <Button
                    onPress={handleSaveSchedule}
                    isLoading={isSaving}
                    className="bg-[#4376C8] text-white font-bold hover:bg-[#00458F] px-8 h-12 rounded-xl text-sm shadow-md tracking-wide transition-all duration-150"
                >
                    {isSaving ? 'Saving Configurations...' : 'Save Schedule Settings'}
                </Button>
            </div>
        </div>
    );
}