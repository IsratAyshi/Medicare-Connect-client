import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";


export const getLoggedInPatientProfile = async () => {
    const user = await getUserSession();
    
    return serverFetch(`/api/users/${user.id}`);
};