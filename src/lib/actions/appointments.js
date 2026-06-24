'use server';

import { serverMutation } from "../core/server";



export const createNewAppointment = async (appointmentData) => {
    const path = '/api/appointments/book';
    const method = 'POST';

    return await serverMutation(path, appointmentData, method);
};