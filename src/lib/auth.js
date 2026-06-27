import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
            mapProfileToUser: async (profile, context) => {

                const callbackURL = context?.callbackURL || "";
                const isMedSpec = callbackURL.includes("medical-specialist");

                return {
                    // accountRole: isMedSpec ? "medical_specialist" : "patient_family",
                    accountRole: "patient_family",
                    gender: "other",
                    status: "active",
                };
            },
        }, 
    },
    user: {
        additionalFields: {
            accountRole: {
                type: "string",
                default: "patient_family",
                input: true
            },
            gender: {
                type: "string",
                default: "other",
                input: true,
            },
            status: {
            type: "string",
            default: "active",
            input: true
            },
            phoneNumber: {
            type: "string",
            input: true
            }
        }
    },
    plugins: [
        admin()
    ]
});