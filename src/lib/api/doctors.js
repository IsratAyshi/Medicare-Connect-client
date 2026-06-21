import { protectedFetch, serverFetch } from "../core/server"
import { getUserSession } from "../core/session";


export const getDoctors = async (queryString) => {
    // return protectedFetch('/api/doctors');
    return serverFetch(`/api/doctors?${queryString}`);
}


export const getDoctorProfile = async (userId) => {
    if (!userId) return null;
    return serverFetch(`/api/doctors/${userId}`);
}


export const getLoggedInDoctorProfile = async () => {
    const user = await getUserSession();
    return getDoctorProfile(user?.id);
}