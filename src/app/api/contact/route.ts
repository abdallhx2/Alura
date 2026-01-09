import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "ALOURA Contact <onboarding@resend.dev>",
      to: ["ruoiya.sa@gmail.com"],
      replyTo: email,
      subject: `رسالة جديدة من ${name} | ALOURA`,
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <!-- Header -->
              <tr>
                <td style="background-color: #000000; padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; letter-spacing: 8px; font-weight: 300;">ALOURA</h1>
                  <p style="margin: 15px 0 0; color: #ffffff; font-size: 14px; letter-spacing: 2px; opacity: 0.8;">بيت الإبداع</p>
                </td>
              </tr>

              <!-- Title -->
              <tr>
                <td style="padding: 40px 30px 20px; text-align: center; border-bottom: 1px solid #eee;">
                  <h2 style="margin: 0; color: #000000; font-size: 20px; font-weight: 500;">رسالة جديدة من نموذج التواصل</h2>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <!-- Name -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 15px 20px; background-color: #fafafa; border-right: 4px solid #000;">
                        <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">الاسم</p>
                        <p style="margin: 0; color: #000; font-size: 16px; font-weight: 500;">${name}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Email -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 15px 20px; background-color: #fafafa; border-right: 4px solid #000;">
                        <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">البريد الإلكتروني</p>
                        <p style="margin: 0; color: #000; font-size: 16px;"><a href="mailto:${email}" style="color: #000; text-decoration: none;">${email}</a></p>
                      </td>
                    </tr>
                  </table>

                  <!-- Phone -->
                  ${phone ? `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 15px 20px; background-color: #fafafa; border-right: 4px solid #000;">
                        <p style="margin: 0 0 5px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">رقم الهاتف</p>
                        <p style="margin: 0; color: #000; font-size: 16px;"><a href="tel:${phone}" style="color: #000; text-decoration: none;">${phone}</a></p>
                      </td>
                    </tr>
                  </table>
                  ` : ''}

                  <!-- Message -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 20px; background-color: #fafafa; border-right: 4px solid #000;">
                        <p style="margin: 0 0 10px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">الرسالة</p>
                        <p style="margin: 0; color: #000; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Reply Button -->
              <tr>
                <td style="padding: 0 30px 40px; text-align: center;">
                  <a href="mailto:${email}" style="display: inline-block; padding: 15px 40px; background-color: #000; color: #fff; text-decoration: none; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">الرد على الرسالة</a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #fafafa; padding: 25px 30px; text-align: center; border-top: 1px solid #eee;">
                  <p style="margin: 0; color: #999; font-size: 12px;">تم إرسال هذه الرسالة من نموذج التواصل في موقع ALOURA</p>
                  <p style="margin: 10px 0 0; color: #ccc; font-size: 11px;">© 2025 ALOURA Creative House</p>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
