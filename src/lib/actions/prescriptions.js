"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";


export async function issuePrescriptionAction(payload) {
    try {
        const result = await serverMutation(
            "/api/doctor/prescriptions/issue",
            payload,
            "POST"
        );
        
        revalidatePath("/dashboard/medSpecialist/prescriptions");
        return result;
    } catch (error) {
        console.error("Action pipeline failed to issue prescription:", error);
        return { success: false, error: error.message };
    }
}


export async function updatePrescriptionAction(rxId, payload) {
    try {
        const result = await serverMutation(
            `/api/doctor/prescriptions/modify/${rxId}`,
            payload,
            "PATCH"
        );
        
        revalidatePath("/dashboard/medSpecialist/prescriptions");
        return result;
    } catch (error) {
        console.error("Action pipeline failed to modify targeted prescription:", error);
        return { success: false, error: error.message };
    }
}