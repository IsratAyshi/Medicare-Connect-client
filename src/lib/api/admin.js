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