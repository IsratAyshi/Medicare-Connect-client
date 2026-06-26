import { redirect } from "next/navigation";

export default async function MedSpecialistCallback({ searchParams }) {
    const { redirectTo } = await searchParams;
    redirect(redirectTo || "/");
}