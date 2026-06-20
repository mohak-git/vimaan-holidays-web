interface BaseTemplateParams {
    title: string;
    greeting: string;
    body: string;
    ctaText: string;
    ctaUrl: string;
    footerNote: string;
}

export function buildBaseHtml(params: BaseTemplateParams): string {
    const { title, greeting, body, ctaText, ctaUrl, footerNote } = params;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${title} - Vimaan Holidays</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f1e8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f1e8;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(14,31,42,0.06);">
          <tr>
            <td style="height:4px;background-color:#d4af37;font-size:0;line-height:0;" height="4">
              &nbsp;
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 0;text-align:center;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#0e1f2a;letter-spacing:3px;text-transform:uppercase;font-weight:400;">Vimaan Holidays</div>
              <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#cc875d;letter-spacing:3px;text-transform:uppercase;margin-top:6px;">India's Premium Boutique Travel Agency</div>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px auto 0;">
                <tr>
                  <td style="height:1px;width:48px;background-color:#d4af37;font-size:0;line-height:0;" height="1">
                    &nbsp;
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px;text-align:center;">
              <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#0e1f2a;font-weight:400;margin:0 0 8px;letter-spacing:-0.3px;">${title}</h1>
              <p style="font-size:15px;color:#5a4a3a;line-height:1.7;margin:0 0 8px;">${greeting}</p>
              <p style="font-size:15px;color:#5a4a3a;line-height:1.7;margin:0 0 28px;">${body}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
                <tr>
                  <td style="background-color:#d4af37;border-radius:8px;padding:14px 36px;text-align:center;">
                    <a href="${ctaUrl}" style="color:#0e1f2a;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:1px;text-transform:uppercase;display:inline-block;white-space:nowrap;">${ctaText}</a>
                  </td>
                </tr>
              </table>
              <p style="font-size:12px;color:#a09080;margin:0 0 4px;">Or copy this link into your browser:</p>
              <p style="font-size:12px;color:#d4af37;word-break:break-all;margin:0;line-height:1.5;">${ctaUrl}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;background-color:#ebe3d5;text-align:center;">
              <p style="font-size:12px;color:#8a7a6a;margin:0 0 10px;line-height:1.5;">${footerNote}</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="height:1px;width:32px;background-color:#cc875d;font-size:0;line-height:0;" height="1">
                    &nbsp;
                  </td>
                </tr>
              </table>
              <p style="font-size:11px;color:#a09080;margin:10px 0 0;">Vimaan Holidays &mdash; India's premium boutique travel agency</p>
            </td>
          </tr>
        </table>
        <p style="font-size:11px;color:#a09080;margin:16px 0 0;text-align:center;">&copy; ${new Date().getFullYear()} Vimaan Holidays. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
