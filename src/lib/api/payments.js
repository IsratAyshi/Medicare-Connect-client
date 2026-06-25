import { serverFetch } from "../core/server";


export async function getPatientPaymentHistory(patientId) {
    if (!patientId) return [];

    const result = await serverFetch(`/api/payments/patient/${patientId}`);
    return result?.data || [];
    
}