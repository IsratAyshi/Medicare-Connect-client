import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';



export async function POST(req) {
  try {
    // const headersList = await headers()
    const body = await req.json();
    const { stripePriceId, doctorId, metadata } = body;

    const origin = req.headers.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/appointments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/all-doctors/${doctorId}?payment=cancelled`,

      metadata: {
        appointmentId: metadata?.appointmentId ? String(metadata.appointmentId) : null,
        patientId: metadata?.patientId ? String(metadata.patientId) : null,
        doctorId: metadata?.doctorId ? String(metadata.doctorId) : null,
        appointmentDate: metadata?.appointmentDate ? String(metadata.appointmentDate) : null,
        appointmentTime: metadata?.appointmentTime ? String(metadata.appointmentTime) : null,
        symptoms: metadata?.symptoms ? String(metadata.symptoms) : "",
      }
    });

    // return NextResponse.redirect(session.url, 303)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}