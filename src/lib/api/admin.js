import { serverFetch } from "../core/server";


export const getAllSystemUsers = async () => {
    try {
        return await serverFetch('/api/admin/users');
    } catch (error) {
        console.error("Failed to load user catalog:", error);
        return [];
    }
};

export const getAllSpecialists = async () => {
    try {
        return await serverFetch('/api/admin/doctors');
    } catch (error) {
        console.error("Failed to download specialist logs:", error);
        return [];
    }
};

export async function getSystemClinicalRegister() {
    const result = await serverFetch("/api/admin/appointments-register", {
      cache: "no-store", 
    });

    return result?.success ? result.data : (result || []);
  
}

export async function getAdminDashboardMetrics() {

    const result = await serverFetch("/api/admin/dashboard-stats", {
        cache: "no-store", 
    });
    return result;
    
}

export async function getSpecialtyBreakdown() {

    const result = await serverFetch("/api/admin/specialty-breakdown", {
        cache: "no-store" 
    });
    
    return result;
}

export async function getClinicianPerformance() {

    return await serverFetch("/api/admin/clinician-performance", { 
        cache: "no-store" 
    });
    
}


export async function getAppointmentTimeline() {

    return await serverFetch("/api/admin/appointment-timeline", { 
        cache: "no-store" 
    });
    
}

export async function getCashFlowLedger() {

    const result = await serverFetch("/api/admin/cashflow-ledger", {
        cache: "no-store",
    });
    return result?.success ? result.data : (result || []);
    
}