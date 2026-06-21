import { getLoggedInPatientProfile } from '@/lib/api/patients';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import PatientProfileEditor from './PatientProfileEditor';


const PatientPersonalProfilePage = async () => {
    const user = await getUserSession();
    const liveProfile = await getLoggedInPatientProfile();

    // Fallback to session baseline context if full document sync hasn't occurred yet
    const clientData = liveProfile || user;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#233143] py-8 transition-colors duration-200">
            <PatientProfileEditor user={user} existingProfile={clientData} />
        </div>
    );
};

export default PatientPersonalProfilePage;