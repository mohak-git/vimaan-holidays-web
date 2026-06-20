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
