import { escapeHtml } from "./html";

interface VerifyEmailTemplateParams {
    verificationUrl: string;
    userName: string;
}

export function buildVerifyEmailHtml(params: VerifyEmailTemplateParams): string {
    const verificationUrl = escapeHtml(params.verificationUrl);
    const userName = escapeHtml(params.userName);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
          <tr>
            <td style="padding:40px 32px 32px;text-align:center">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:600;color:#18181b">Verify your email</h1>
              <p style="margin:0 0 24px;font-size:15px;color:#71717a;line-height:1.5">Hi ${userName}, thanks for signing up. Click the button below to verify your email address.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px">
                <tr>
                  <td style="background-color:#f9735c;border-radius:8px;padding:12px 32px">
                    <a href="${verificationUrl}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;display:inline-block">Verify email</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa">Or copy this link into your browser:</p>
              <p style="margin:0;font-size:13px;color:#71717a;word-break:break-all">${verificationUrl}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background-color:#fafafa;text-align:center;border-top:1px solid #e4e4e7">
              <p style="margin:0;font-size:12px;color:#a1a1aa">This link expires in 1 hour. If you did not sign up, ignore this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
