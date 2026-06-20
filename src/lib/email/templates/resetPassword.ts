import { buildBaseHtml } from "./base";
import { escapeHtml } from "./html";

interface ResetPasswordTemplateParams {
    resetUrl: string;
    userName: string;
}

export function buildResetPasswordHtml(params: ResetPasswordTemplateParams): string {
    const resetUrl = escapeHtml(params.resetUrl);
    const userName = escapeHtml(params.userName);

    return buildBaseHtml({
        title: "Reset your password",
        greeting: `Dear ${userName},`,
        body: "We received a request to reset the password associated with your Vimaan Holidays account. Click the button below to choose a new password and regain access to your account.",
        ctaText: "Reset Password",
        ctaUrl: resetUrl,
        footerNote:
            "This reset link expires in 10 mins. If you did not request a password change, please ignore this email — your account remains secure.",
    });
}
