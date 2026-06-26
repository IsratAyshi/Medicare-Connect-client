import { publicServerFetch, serverFetch} from "../core/server";

export async function getPatientReviews(patientId) {
    if (!patientId) return [];
    const result = await serverFetch(`/api/reviews/patient/${patientId}`);
    return result?.data || [];
}


export async function getPatientVisitedDoctors(patientId) {
    if (!patientId) return [];
    try {
        const result = await serverFetch(`/api/appointments/patient/${patientId}`);
        return result?.data || [];
    } catch (err) {
        console.error("Error loading visited appointments:", err);
        return [];
    }
}


export async function getTopPublicReviews() {

    const result = await publicServerFetch("/api/public/top-reviews");
    return result?.data || [];
    
}