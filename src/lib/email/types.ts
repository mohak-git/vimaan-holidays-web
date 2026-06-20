export interface EmailRecipient {
    email: string;
    name: string;
}

export interface SendEmailParams {
    to: EmailRecipient[];
    subject: string;
    htmlContent: string;
    tags?: string[];
}

export interface SendVerificationEmailParams {
    recipient: EmailRecipient;
    verificationUrl: string;
}

export interface SendPasswordResetEmailParams {
    recipient: EmailRecipient;
    resetUrl: string;
}

type SuccesResult = { success: true; messageId: string };
type FailureResult = { success: false; error: string };
export type EmailResult = SuccesResult | FailureResult;
