import { publicServerFetch, serverFetch } from "../core/server"
import { getUserSession } from "../core/session";


export const getDoctors = async (queryString) => {
    // return protectedFetch('/api/doctors');
    return publicServerFetch(`/api/doctors?${queryString}`);
}

export const getDoctorProfile = async (userId) => {
    if (!userId) return null;
    return serverFetch(`/api/doctors/${userId}`);
}


export const getLoggedInDoctorProfile = async () => {
    const user = await getUserSession();
    return getDoctorProfile(user?.id);
}


export const getDoctorDetails = async (id) => {
    return publicServerFetch(`/api/doctors/details/${id}`);
};

// reviews for a specific doctor
export const getDoctorReviews = async (doctorId) => {
    return publicServerFetch(`/api/reviews/${doctorId}`);
};


// featured first 4 doctors for homepage
export const getFeaturedDoctors = async () => {
    return publicServerFetch('/api/doctors/featured');
};


export async function getDoctorAppointments(doctorId) {
    if (!doctorId) return [];

    const result = await serverFetch(`/api/doctor/appointments/${doctorId}`);
    return result?.data || [];
    
}


export async function getDoctorPrescriptions(doctorId) {
    if (!doctorId) return [];

    const result = await serverFetch(`/api/doctor/prescriptions/list/${doctorId}`);
    return result?.data || [];
    
}


export async function getSinglePatientRecord(patientId) {
    if (!patientId) return null;

    const result = await serverFetch(`/api/doctor/patient-details/${patientId}`);
    return result?.data || null;
    
}