import { serverMutation } from "../core/server";



export async function submitReviewAction(payload) {
    return await serverMutation("/api/reviews", payload);
}