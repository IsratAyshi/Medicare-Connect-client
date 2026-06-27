import { serverFetch } from "../core/server";


export async function getPatientAppointments(patientId) {

    const result = await serverFetch(`/api/appointments/patient/${patientId}`);
    
    return result?.data || [];
    
}


// export async function getPatientAppointments(patientId) {
//     // Edge case: If the user session didn't return an ID, don't attempt the call
//     if (!patientId) {
//         console.warn("getPatientAppointments aborted: patientId is undefined.");
//         return [];
//     }

//     try {
//         const result = await serverFetch(`/api/appointments/patient/${patientId}`);
        
//         // If serverFetch handled a redirect internally, 'result' might be undefined or not JSON
//         if (!result || typeof result !== 'object') {
//             return [];
//         }
        
//         return result.data || [];
//     } catch (err) {
//         // If it's a Next.js redirect exception, we MUST rethrow it so Next.js can perform the redirect!
//         if (err.message?.includes('NEXT_REDIRECT') || err.digest?.includes('NEXT_REDIRECT')) {
//             throw err;
//         }
        
//         console.error("Failed fetching appointments via serverFetch layer:", err);
//         return [];
//     }
// }