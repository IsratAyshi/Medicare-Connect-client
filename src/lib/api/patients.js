import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getLoggedInPatientProfile = async () => {
    const user = await getUserSession();
    
    return serverFetch(`/api/users/${user.id}`);
};


export async function getPatientDashboardStats(patientId) {
    if (!patientId) return null;
    
    const result = await serverFetch(`/api/patient-stats/${patientId}`);
    return result?.stats || null;
    
}