import { serverEnv } from "@/config/env.server";
import { BrevoError } from "@getbrevo/brevo";
import { getBrevoClient } from "./client";
import type { EmailResult, SendEmailParams } from "./types";

export async function sendEmail(params: SendEmailParams): Promise<EmailResult> {
    try {
        const senderEmail = serverEnv.BREVO_SENDER_EMAIL;
        const replyToEmail = serverEnv.BREVO_REPLY_TO_EMAIL;
        const senderName = serverEnv.BREVO_SENDER_NAME;
        const client = getBrevoClient();

        const res = await client.transactionalEmails.sendTransacEmail({
            sender: { email: senderEmail, name: senderName },
            replyTo: { email: replyToEmail, name: senderName },
            to: params.to.map((r) => ({ email: r.email, name: r.name })),
            subject: params.subject,
            htmlContent: params.htmlContent,
            tags: params.tags,
        });

        return { success: true, messageId: res.messageId! };
    } catch (err) {
        const message =
            err instanceof BrevoError
                ? `Brevo API error (${err.statusCode}): ${err.message}`
                : err instanceof Error
                  ? err.message
                  : "Unknown email error";

        console.error(`[Email] Failed to send: ${message}`, err);
        return { success: false, error: message };
    }
}
