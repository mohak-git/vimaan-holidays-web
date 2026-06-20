import "server-only";
import { sendEmail } from "./send";
import { buildResetPasswordHtml, buildVerifyEmailHtml } from "./templates";
import type {
    EmailResult,
    SendPasswordResetEmailParams,
    SendVerificationEmailParams,
} from "./types";

export function sendVerificationEmail(params: SendVerificationEmailParams): Promise<EmailResult> {
    const { recipient, verificationUrl } = params;
    const htmlContent = buildVerifyEmailHtml({ verificationUrl, userName: recipient.name });

    return sendEmail({
        to: [recipient],
        subject: "Verify your email - Vimaan Holidays",
        htmlContent,
        tags: ["email-verification"],
    });
}

export function sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<EmailResult> {
    const { recipient, resetUrl } = params;
    const htmlContent = buildResetPasswordHtml({ resetUrl, userName: recipient.name });

    return sendEmail({
        to: [recipient],
        subject: "Reset your password - Vimaan Holidays",
        htmlContent,
        tags: ["password-reset"],
    });
}
