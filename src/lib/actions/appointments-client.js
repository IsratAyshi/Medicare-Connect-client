"use client";

import { toast } from "react-toastify";


export async function handlePayNow(appointment) {
  try {
    const stripePriceId = appointment.doctorDetails?.stripePriceId;
    if (!stripePriceId) {
      toast.error("This clinician has no active stripe price configuration setup.");
      return;
    }

    const appointmentId = appointment._id?.$oid || appointment._id;

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stripePriceId,
        doctorId: appointment.doctorId,
        
        metadata: {
          appointmentId: String(appointmentId),
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
          symptoms: appointment.symptoms,
        },
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.assign(data.url);
    } else {
      throw new Error(data.error || "Failed to launch session.");
    }
  } catch (error) {
    console.error("Stripe UI redirection error:", error);
    toast.error(error.message || "Could not spin up Stripe payment screen.");
  }
}