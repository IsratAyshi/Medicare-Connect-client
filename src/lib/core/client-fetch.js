import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const clientFetch = async (path, token = null, options = {}) => {
    const headers = { ...options.headers };
    if (token) {
        headers["authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) redirect('/unauthorized');
    if (res.status === 403) redirect('/forbidden');

    return res.json();
};


export const clientMutation = async (path, data, token = null, method = 'POST') => {
    
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers["authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers,
        body: JSON.stringify(data),
    });

    if (res.status === 401) redirect('/unauthorized');;
    if (res.status === 403) redirect('/forbidden');

    return res.json();
};