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
import { updateDoctorProfile } from '@/lib/actions/doctors';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const textInputClass = "w-full bg-slate-50 dark:bg-[#1a2635] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2.5 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-emerald-600 dark:focus:border-emerald-500 transition";
const selectBoxClass = "w-full flex flex-col gap-1";

const triggerClasses = "w-full bg-slate-50 dark:bg-[#1a2635] border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-slate-300 dark:data-[hover=true]:border-slate-600";
const popoverClasses = "bg-white dark:bg-[#1e2b3c] border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-slate-700 dark:text-slate-300 px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white outline-none data-[focused=true]:bg-slate-100 dark:data-[focused=true]:bg-slate-800";

export default function DoctorProfileEditor({ user, existingProfile }) {
    const [profile, setProfile] = useState(existingProfile);
    const [isEditing, setIsEditing] = useState(!existingProfile?._id);
    const [errors, setErrors] = useState({});

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const specialization = formData.get('specialization');
        const experience = formData.get('experience');
        const qualifications = formData.get('qualifications');
        const consultationFee = formData.get('consultationFee');
        const hospitalName = formData.get('hospitalName');
        const profileImage = formData.get('profileImage');

        // Form Validations
        const newErrors = {};
        if (!specialization) newErrors.specialization = "Clinical specialty selection is required";
        if (!experience) newErrors.experience = "Years of experience required";
        if (!qualifications) newErrors.qualifications = "Qualifications statements are required";
        if (!consultationFee) newErrors.consultationFee = "Consultation reference fee is required";
        if (!hospitalName) newErrors.hospitalName = "Attached hospital reference is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const rawProfileImage = formData.get('profileImage');

        const updatedProfileData = {
            doctorName: user?.name || "Medical Specialist",
            specialization,
            qualifications,
            experience: parseInt(experience, 10),
            consultationFee: parseFloat(consultationFee),
            hospitalName,
            profileImage: rawProfileImage.trim() !== '' ? rawProfileImage : (profile?.profileImage || user?.image || ''),
            availableDays: profile?.availableDays || [],
            availableSlots: profile?.availableSlots || [],
            verificationStatus: profile?.verificationStatus || 'Pending',
            stripePriceId: profile?.stripePriceId || null
        };

        try {
            const payload = await updateDoctorProfile(user?.id, updatedProfileData);

            // FIX: Broaden the check to capture MongoDB native response objects safely
            const isSuccess = payload?.success ||
                payload?.acknowledged ||
                payload?.modifiedCount > 0 ||
                payload?.upsertedCount > 0 ||
                payload?.matchedCount > 0;

            if (isSuccess) {
                // Keep existing document ID or extract the newly generated one from MongoDB's upsertedId payload properties
                const savedId = payload?.insertedId || payload?.upsertedId || profile?._id;

                setProfile({
                    ...updatedProfileData,
                    _id: savedId
                });

                toast.success("Professional credentials saved successfully!");
                setErrors({});
                setIsEditing(false); // Flipping this back to false updates the UI instantly
                router.refresh();

            } else {
                toast.error("No changes were made to your profile details.");
            }
        } catch (err) {
            console.error("Form submission failure:", err);
            toast.error("Could not save professional records.");
        }
    };

    // --- VIEW MODE ---
    if (!isEditing && profile) {
        return (
            <div className="max-w-3xl mx-auto bg-[#ECF0FF] dark:bg-[#001B3F] border border-slate-100 dark:border-slate-800/60 rounded-xl p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <img
                            src={profile.profileImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"}
                            alt={profile.doctorName}
                            className="w-18 h-18 rounded-xl object-cover ring-2 ring-emerald-500/20"
                        />
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{profile.doctorName}</h1>
                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{profile.specialization} Specialist</p>
                            <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                                <span>Verification:</span>
                                <span className={`
            px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border select-none
            ${profile.verificationStatus?.toLowerCase() === 'approved'
                                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40'
                                        : profile.verificationStatus?.toLowerCase() === 'rejected'
                                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/40'
                                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40' // Fallback to Pending styles
                                    }
        `}>
                                    {profile.verificationStatus || 'Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button
                        onPress={() => setIsEditing(true)}
                        className="bg-[#4376C8] text-white font-medium hover:bg-[#00458F] rounded-lg px-4 h-10 transition-colors"
                    >
                        Edit Credentials
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <div><strong>Hospital Attachment:</strong> {profile.hospitalName}</div>
                    <div><strong>Experience:</strong> {profile.experience} Years</div>
                    <div><strong>Consultation Fee:</strong> ${profile.consultationFee}</div>
                    <div><strong>Qualifications:</strong> {profile.qualifications}</div>
                </div>
            </div>
        );
    }

    // --- EDIT / CREATE FORM MODE ---
    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e2b3c] p-8 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
            <Form onSubmit={handleSubmit} className="space-y-6" validationErrors={errors} validationBehavior="aria">
                <Fieldset className="space-y-5 w-full">
                    <legend className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 w-full pb-3 mb-2">
                        Professional Credentials Editor
                    </legend>

                    {/* ROW 1: Clinical Specialties + Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Select className={selectBoxClass} name="specialization" defaultSelectedKeys={[profile?.specialization || 'Cardiology']}>
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Clinical Specialty</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-slate-800 dark:text-slate-100" />
                                <Select.Indicator><ChevronDown size={16} className="text-slate-400" /></Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="Cardiology" className={listItemClasses} textValue="Cardiology">Cardiology</ListBox.Item>
                                    <ListBox.Item id="Neurology" className={listItemClasses} textValue="Neurology">Neurology</ListBox.Item>
                                    <ListBox.Item id="Pediatrics" className={listItemClasses} textValue="Pediatrics">Pediatrics</ListBox.Item>
                                    <ListBox.Item id="Orthopedics" className={listItemClasses} textValue="Orthopedics">Orthopedics</ListBox.Item>
                                    <ListBox.Item id="Dermatology" className={listItemClasses} textValue="Dermatology">Dermatology</ListBox.Item>
                                    <ListBox.Item id="General Medicine" className={listItemClasses} textValue="General Medicine">General Medicine</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <TextField name="experience" defaultValue={profile?.experience?.toString() || ''} isInvalid={!!errors.experience} className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Experience (Years)</Label>
                            <Input placeholder="14" type="number" className={textInputClass} />
                            {errors.experience && <FieldError className="text-xs text-rose-500 mt-1">{errors.experience}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 2: Qualifications Statement + Co-Pay Fee */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <TextField name="qualifications" defaultValue={profile?.qualifications || ''} isInvalid={!!errors.qualifications} className="flex flex-col gap-1 sm:col-span-2 w-full">
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Qualifications Statement</Label>
                            <Input placeholder="MD, FACC - Harvard Medical School" className={textInputClass} />
                            {errors.qualifications && <FieldError className="text-xs text-rose-500 mt-1">{errors.qualifications}</FieldError>}
                        </TextField>

                        <TextField name="consultationFee" defaultValue={profile?.consultationFee?.toString() || ''} isInvalid={!!errors.consultationFee} className="flex flex-col gap-1 w-full">
                            <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Co-Pay Consultation Fee ($)</Label>
                            <Input placeholder="150" type="number" className={textInputClass} />
                            {errors.consultationFee && <FieldError className="text-xs text-rose-500 mt-1">{errors.consultationFee}</FieldError>}
                        </TextField>
                    </div>

                    {/* ROW 3: Attached Medical Hospital Name */}
                    <TextField name="hospitalName" defaultValue={profile?.hospitalName || ''} isInvalid={!!errors.hospitalName} className="flex flex-col gap-1 w-full">
                        <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Affiliated Medical Hospital Name</Label>
                        <Input placeholder="Boston General Hospital" className={textInputClass} />
                        {errors.hospitalName && <FieldError className="text-xs text-rose-500 mt-1">{errors.hospitalName}</FieldError>}
                    </TextField>

                    {/* ROW 4: Profile Photo URL Field (Matches Image) */}
                    <TextField name="profileImage" defaultValue={profile?.profileImage || ''} className="flex flex-col gap-1 w-full"
                    >
                        <Label className="text-slate-500 dark:text-slate-400 font-semibold text-xs uppercase tracking-wider">Profile Photo / Avatar Image (URL)</Label>
                        <Input placeholder="https://example.com/avatar.jpg" className={textInputClass} />
                    </TextField>
                </Fieldset>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
                    {profile && (
                        <Button
                            type="button"
                            variant="bordered"
                            onPress={() => setIsEditing(false)}
                            className="border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg px-5 font-medium h-11"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-[#4376C8] text-white font-semibold hover:bg-[#00458F] rounded-lg px-6 transition-colors h-11 flex items-center gap-2"
                    >
                        Save Professional Records
                    </Button>
                </div>
            </Form>
        </div>
    );
}