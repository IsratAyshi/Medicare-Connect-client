'use server';


import { revalidatePath } from "next/cache";
import { serverFetch, serverMutation } from "../core/server";
import { stripe } from "../stripe";



export const createNewAppointment = async (appointmentData) => {
    const path = '/api/appointments/book';
    const method = 'POST';

    return await serverMutation(path, appointmentData, method);
};


export async function verifyAndSaveStripeAppointment(sessionId) {
    if (!sessionId) return { success: false, message: "Missing session ID token." };

    try {
        // Retrieve the session from Stripe to verify payment status
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (session.payment_status !== "paid") {
            return { success: false, message: "Transaction has not been marked as paid." };
        }

        // Extract the appointment details from the session's metadata
        const { appointmentId, patientId, doctorId, appointmentDate, appointmentTime, symptoms } = session.metadata;

        // Forward the data to Express backend
        const result = await serverMutation("/api/appointments/fulfill-paid", {
            patientId,
            doctorId,
            appointmentId,
            appointmentDate,
            appointmentTime,
            symptoms,
            amount: session.amount_total / 100, // Convert cents to dollars
            
            transactionId: session.payment_intent,
        });

        return result;

    } catch (error) {
        console.error("Relay handler execution failure:", error);
        return { success: false, message: error.message || "Failed processing payment verification." };
    }
}


export async function updateAppointmentStatusAction(appointmentId, nextStatus) {
    try {
        const result = await serverMutation(
            `/api/doctor/appointments/${appointmentId}/status`, 
            { status: nextStatus }, 
            'PATCH'
        );

        revalidatePath("/dashboard/medSpecialist/appointments");
        
        return result;
    } catch (error) {
        console.error("Action error:", error);
        return { success: false, error: error.message };
    }
}


export const getDoctorSchedule = async (doctorId) => {
    const path = `/api/doctors/${doctorId}/schedule`;
    const result = await serverFetch(path);

    return result?.data || [];
};


export const rescheduleAppointment = async (appointmentId, rescheduleData) => {
    const path = `/api/appointments/${appointmentId}/reschedule`;
    const method = 'PATCH';

    const response = await serverMutation(path, rescheduleData, method);
    
    revalidatePath('/dashboard/patient/myAppointments');
    
    return response;
};