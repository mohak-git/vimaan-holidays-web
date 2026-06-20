import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/email";
import { waitUntil } from "@vercel/functions";

interface Props {
    user: { email: string; name: string };
    url: string;
}

export async function verificationEmail({ user, url }: Props): Promise<void> {
    waitUntil(
        sendVerificationEmail({
            recipient: { email: user.email, name: user.name },
            verificationUrl: url,
        }),
    );
}

export async function passwordReset({ user, url }: Props): Promise<void> {
    waitUntil(
        sendPasswordResetEmail({
            recipient: { email: user.email, name: user.name },
            resetUrl: url,
        }),
    );
}
