import { buildBaseHtml } from "./base";
import { escapeHtml } from "./html";

interface VerifyEmailTemplateParams {
    verificationUrl: string;
    userName: string;
}

export function buildVerifyEmailHtml(params: VerifyEmailTemplateParams): string {
    const verificationUrl = escapeHtml(params.verificationUrl);
    const userName = escapeHtml(params.userName);

    return buildBaseHtml({
        title: "Verify your email",
        greeting: `Dear ${userName},`,
        body: "Thank you for choosing Vimaan Holidays. Please verify your email address to complete your registration and start exploring exclusive travel experiences crafted just for you.",
        ctaText: "Verify Email",
        ctaUrl: verificationUrl,
        footerNote:
            "This verification link expires in 10 minutes. If you did not create an account with Vimaan Holidays, please ignore this email.",
    });
}
