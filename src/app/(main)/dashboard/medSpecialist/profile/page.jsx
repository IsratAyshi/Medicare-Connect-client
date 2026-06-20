import { getLoggedInDoctorProfile } from '@/lib/api/doctors';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import DoctorProfileEditor from './DoctorProfileEditor';

const MedSpecialistProfilePage = async () => {

    const user = await getUserSession();
    const doctorProfile = await getLoggedInDoctorProfile();

    return (
        <div className='min-h-screen bg-white dark:bg-[#233143] py-8 transition-colors duration-200'>
            <DoctorProfileEditor user={user} existingProfile={doctorProfile} />
        </div>
    );
};

export default MedSpecialistProfilePage;