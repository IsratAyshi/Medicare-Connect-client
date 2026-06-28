# 🏥 MediCare Connect
 
**A modern full-stack healthcare management platform** designed to streamline the interaction between patients, doctors, and hospital administrators. The application provides an end-to-end digital solution for appointment booking, doctor management, secure authentication, online payments, prescription management, and healthcare administration through dedicated role-based dashboards.
 
---
 
## 🌐 Live Demo
 
> [https://medicare-connect-client-rho.vercel.app](https://medicare-connect-client-rho.vercel.app)
 
---
 
## 🎯 Purpose
 
Traditional hospital appointment systems suffer from long waiting queues, manual paperwork, and poor communication between patients and providers. MediCare Connect digitizes the entire workflow — from doctor discovery and appointment booking to consultation management and payment processing — giving every stakeholder a dedicated role-based dashboard.
 
---
 
## ✨ Features
 
- ** Role-Based Authentication** — Separate dashboards and access controls for Patients, Medical Specialists, and Admins, secured with Better Auth and session-based web tokens.
- ** Appointment Booking & Management** — Patients can search, filter, and book appointments with verified doctors. Doctors can accept, manage, prescribe, and mark consultations as completed.
- ** Stripe Payment Integration** — Patients pay consultation fees via Stripe before appointments are confirmed. All transactions are logged and visible across patient and admin dashboards.
- ** Doctor Profile & Schedule Management** — Medical specialists can create and update their professional profile, set available days and time slots, and manage their patient schedule dynamically.
- ** Prescription Management** — Doctors can issue digital prescriptions post-consultation, which are stored and accessible through the platform.
- ** Admin Analytics Dashboard** — Admins get a full system overview with Recharts-powered visualizations: doctor performance ratings, appointment timelines, specialty breakdowns, and platform statistics.
- ** Reviews & Ratings** — Patients can submit, view, and manage feedback for doctors they have visited. Top reviews are featured on the public homepage, and anonymously on the doctors details page.
- ** Dark / Light Theme** — Full dark mode support across all pages and dashboards using `next-themes`, with consistent UI in both modes.
---
 
## 🛠️ Tech Stack
 
### Frontend (Client)
 
| Package | Purpose |
|---|---|
| `next.js 15` | React framework with App Router, Server Components |
| `react` | UI library |
| `@heroui/react` | Component library (modals, buttons, cards, avatars) |
| `better-auth` | Authentication (email/password + Google OAuth) |
| `tailwindcss` | Utility-first CSS framework |
| `next-themes` | Dark/light theme management |
| `framer-motion` | UI animations |
| `lucide-react` | Icon set |
| `@gravity-ui/icons` | Supplementary icon set |
| `react-toastify` | Toast notifications |
| `recharts` | Charts and analytics visualizations |
| `@stripe/stripe-js` | Stripe client-side payment integration |
 
### Backend (Server)
 
| Package | Purpose |
|---|---|
| `express` | Node.js REST API server |
| `mongodb` | Database driver |
| `better-auth/adapters/mongodb` | Role-based authentication secret, session Tokens |
| `stripe` | Server-side Stripe payment processing |
| `cors` | Cross-origin request handling |
| `dotenv` | Environment variable management |

 
---