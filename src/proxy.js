import dns from "dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import { NextResponse } from 'next/server'
import { headers } from "next/headers";
import { auth } from "./lib/auth";
 

export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next();
  
}
 
export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/appointments',
    '/appointments/:path*',
    '/api/checkout_sessions',
  ]
}