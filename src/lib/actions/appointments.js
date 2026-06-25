'use server';


import { serverMutation } from "../core/server";
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
        const { patientId, doctorId, appointmentDate, appointmentTime, symptoms } = session.metadata;

        // Forward the data to Express backend
        const result = await serverMutation("/api/appointments/fulfill-paid", {
            patientId,
            doctorId,
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
