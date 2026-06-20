import { headers } from "next/headers";
import { auth } from "../auth";


export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user || null;
}

export const requireAccountRole = async (accountRole) => {
    const user = await getUserSession()
    if (!user) {
        redirect('/auth/login')
    }
    if (user?.accountRole !== accountRole) {
        redirect('/unauthorized')
    }
    return user;
}