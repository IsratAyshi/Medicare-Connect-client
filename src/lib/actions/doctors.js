'use server';
import { serverMutation } from "../core/server";


// export const createDoctorProfile = async (newProfileData) => {
//     return serverMutation('/api/doctors', newProfileData);
// }

export const updateDoctorProfile = async (userId, updatedProfileData) => {
    const payload = {
        userId: userId,
        ...updatedProfileData
    };

    return serverMutation('/api/doctors', payload, 'POST');
}

export const updateDoctorSchedule = async (userId, scheduleData) => {
    return serverMutation(`/api/doctors/schedule/${userId}`, scheduleData, 'PATCH');
};
