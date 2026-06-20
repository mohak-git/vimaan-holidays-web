import { serverEnv } from "@/config/env.server";
import { BrevoClient } from "@getbrevo/brevo";

let client: BrevoClient | null = null;

export function getBrevoClient(): BrevoClient {
    if (!client) client = new BrevoClient({ apiKey: serverEnv.BREVO_API_KEY });

    return client;
}

export function resetBrevoClient(): void {
    client = null;
}
