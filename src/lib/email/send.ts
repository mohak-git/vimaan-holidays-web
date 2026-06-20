import { serverEnv } from "@/config/env.server";
import { BrevoError } from "@getbrevo/brevo";
import { getBrevoClient } from "./client";
import type { SendEmailParams } from "./types";

function formatError(err: unknown): string {
    if (err instanceof BrevoError) return `Brevo API error (${err.statusCode}): ${err.message}`;
    if (err instanceof Error) return err.message;
    return "Unknown error";
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
    try {
        const senderEmail = serverEnv.BREVO_SENDER_EMAIL;
        const replyToEmail = serverEnv.BREVO_REPLY_TO_EMAIL;
        const senderName = serverEnv.BREVO_SENDER_NAME;
        const client = getBrevoClient();

        await client.transactionalEmails.sendTransacEmail({
            sender: { email: senderEmail, name: senderName },
            replyTo: { email: replyToEmail, name: senderName },
            to: params.to.map((r) => ({ email: r.email, name: r.name })),
            subject: params.subject,
            htmlContent: params.htmlContent,
            tags: params.tags,
        });
    } catch (err) {
        console.error(`[Email] Failed to send: ${formatError(err)}`);
    }
}
