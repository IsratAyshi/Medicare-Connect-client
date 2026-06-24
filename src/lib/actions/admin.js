'use server';

import { serverMutation } from "../core/server";



export const updateUserAccountStatus = async (userId, targetStatus) => {
    const path = `/api/admin/users/status/${userId}`;
    const data = { status: targetStatus };
    const method = 'PATCH';

    // Matches your exact parameters: path, data, method
    return await serverMutation(path, data, method);
};



export const updateDoctorVerificationStatus = async (doctorId, targetStatus) => {
    const path = `/api/admin/doctors/verify/${doctorId}`;
    const data = { verificationStatus: targetStatus };
    const method = 'PATCH';

    return await serverMutation(path, data, method);
};