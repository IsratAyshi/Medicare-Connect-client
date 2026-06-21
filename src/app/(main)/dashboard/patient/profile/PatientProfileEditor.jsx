'use client';

import React, { useState } from 'react';
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Button,
} from '@heroui/react';
import { ChevronDown } from '@gravity-ui/icons';
import { updatePatientProfile } from '@/lib/actions/patients';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const textInputClass = "w-full bg-slate-50 dark:bg-[#1a2635] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2.5 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 dark:focus:border-emerald-500 transition disabled:opacity-70 disabled:cursor-not-allowed";
const selectBoxClass = "w-full flex flex-col gap-1";

const triggerClasses = "w-full bg-slate-50 dark:bg-[#1a2635] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-slate-300 dark:data-[hover=true]:border-slate-600";
const popoverClasses = "bg-white dark:bg-[#1e2b3c] border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-slate-700 dark:text-slate-300 px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white outline-none data-[focused=true]:bg-slate-100 dark:data-[focused=true]:bg-slate-800";

export default function PatientProfileEditor({ user, existingProfile }) {
    const [profile, setProfile] = useState(existingProfile);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedGender, setSelectedGender] = useState(new Set([profile?.gender?.toLowerCase() || 'female']));

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const phoneNumber = formData.get('phoneNumber');
        const gender = formData.get('gender');
        const image = formData.get('image');

        // Validations
        const newErrors = {};
        if (!name?.trim()) newErrors.name = "Representative billing name is required";
        if (!phoneNumber?.trim()) newErrors.phoneNumber = "Contact phone coordinate number is required";
        if (!gender) newErrors.gender = "Demographic gender designation selection is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        const updatedPatientPayload = {
            name: name.trim(),
            phoneNumber: phoneNumber.trim(),
            gender: gender,
            image: image.trim() !== '' ? image.trim() : (profile?.image || user?.image || ''),
            accountRole: "patient_family" // Explicit enforcement layer guarantee
        };

        try {
            const payload = await updatePatientProfile(user?.id || profile?._id?.$oid || profile?._id, updatedPatientPayload);

            const isSuccess = payload?.success ||
                payload?.acknowledged ||
                payload?.modifiedCount > 0 ||
                payload?.matchedCount > 0;

            if (isSuccess) {
                setProfile(prev => ({
                    ...prev,
                    ...updatedPatientPayload
                }));
                toast.success("Personal health profile updated successfully!");
                setErrors({});
                router.refresh();
            } else {
                toast.info("No modifications were written to your profile data.");
            }
        } catch (err) {
            console.error("Patient form execution error:", err);
            toast.error("Could not write health ledger changes safely.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e2b3c] p-8 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
            <Form onSubmit={handleSubmit} className="space-y-6" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-5 w-full">
                    <legend className="text-2xl font-bold text-slate-800 dark:text-slate-100 w-full pb-4 mb-2">
                        Personal Health Profile
                    </legend>

                    {/* ROW 1: Representative Name + Immutable Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField name="name" defaultValue={profile?.name || ''} isInvalid={!!errors.name} className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Full Representative Name</Label>
                            <Input placeholder="Sarah Jenkins" className={textInputClass} />
                            {errors.name && <FieldError className="text-xs text-rose-500 mt-1">{errors.name}</FieldError>}
                        </TextField>

                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Email (Immutable)</Label>
                            <input
                                type="email"
                                value={profile?.email || ''}
                                disabled
                                className={`${textInputClass} bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 border-slate-200/60`}
                            />
                        </div>
                    </div>

                    {/* ROW 2: Phone Number + Gender Selection Dropdown Wrapper */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField name="phoneNumber" defaultValue={profile?.phoneNumber || ''} isInvalid={!!errors.phoneNumber} className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Phone Number</Label>
                            <Input placeholder="+1 (555) 014-4921" className={textInputClass} />
                            {errors.phoneNumber && <FieldError className="text-xs text-rose-500 mt-1">{errors.phoneNumber}</FieldError>}
                        </TextField>

                        <Select
                            className={selectBoxClass}
                            name="gender"
                            defaultSelectedKeys={[profile?.gender.toLowerCase() || 'female']}
                        >
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Gender</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-slate-800 dark:text-slate-100" />
                                <Select.Indicator><ChevronDown size={16} className="text-slate-400" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="Female" className={listItemClasses} textValue="Female">Female</ListBox.Item>
                                    <ListBox.Item id="Male" className={listItemClasses} textValue="Male">Male</ListBox.Item>
                                    <ListBox.Item id="Other" className={listItemClasses} textValue="Other">Other</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* ROW 3: Profile Photo / Avatar Input */}
                    <TextField name="image" defaultValue={profile?.image || ''} className="flex flex-col gap-1 w-full">
                        <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Profile Photo/Avatar URL</Label>
                        <Input placeholder="https://images.unsplash.com/photo-..." className={textInputClass} />
                    </TextField>
                </Fieldset>

                {/* Submit Action Block Container */}
                <div className="flex justify-end pt-4 w-full">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold rounded-xl px-8 transition-colors h-11 flex items-center justify-center disabled:opacity-50"
                    >
                        {isSubmitting ? "Saving Changes..." : "Save Changes"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}