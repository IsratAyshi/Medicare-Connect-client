'use server';

import { serverMutation } from "../core/server";

export const updatePatientProfile = async (userId, updatedPatientData) => {
    const payload = {
        userId: userId,
        ...updatedPatientData
    };

    return serverMutation('/api/users/profile', payload, 'PATCH');
};