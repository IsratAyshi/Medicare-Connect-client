import { clientFetch } from "../core/client-fetch";


// export async function getPatientReviews(patientId) {
//     if (!patientId) return [];
//     const result = await serverFetch(`/api/reviews/patient/${patientId}`);
//     return result?.data || [];
// }

export async function getPatientReviews(patientId, token = null) {
    if (!patientId) return [];
    const result = await clientFetch(`/api/reviews/patient/${patientId}`, token);
    return result?.data || [];
}


// export async function getPatientVisitedDoctors(patientId) {
//     if (!patientId) return [];
//     try {
//         const result = await serverFetch(`/api/appointments/patient/${patientId}`);
//         return result?.data || [];
//     } catch (err) {
//         console.error("Error loading visited appointments:", err);
//         return [];
//     }
// }


export async function getPatientVisitedDoctors(patientId, token = null) {
    if (!patientId) return [];
    try {
        const result = await clientFetch(`/api/appointments/patient/${patientId}`, token);
        return result?.data || [];
    } catch (err) {
        console.error("Error loading visited appointments:", err);
        return [];
    }
}

