import { publicServerFetch} from "../core/server";


export const getOverviewStats = async () => {
    try {
        return await publicServerFetch('/api/overview-stats');
    } catch (error) {
        console.error("Error reading application summary data context:", error);
        return { totalDoctors: 0, totalPatients: 0, appointmentsCount: 0, totalReviews: 0 };
    }
};


export async function getTopPublicReviews() {

    const result = await publicServerFetch("/api/public/top-reviews");
    return result?.data || [];
    
}