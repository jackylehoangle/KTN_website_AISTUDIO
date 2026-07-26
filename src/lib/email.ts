import nodemailer, { type Transporter } from "nodemailer";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

interface LeadEmailData {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  sector: string;
  province: string;
  address: string | null;
  message: string;
  preferredChannel: string;
  attachmentName?: string | null;
}

let resendClient: Resend | null = null;
let smtpTransporter: Transporter | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

function getSmtpTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  if (!smtpTransporter) {
    smtpTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return smtpTransporter;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildLeadEmail(data: LeadEmailData) {
  const rows = [
    ["Họ và tên", data.fullName],
    ["Điện thoại", data.phone],
    ["Email", data.email || "Không cung cấp"],
    ["Lĩnh vực", data.sector],
    ["Tỉnh/Thành", data.province],
    ["Địa chỉ", data.address || "Không cung cấp"],
    ["Kênh liên hệ", data.preferredChannel],
    ["Tệp đính kèm", data.attachmentName || "Không có"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#172033;max-width:680px;margin:auto">
      <div style="background:#17347D;color:white;padding:22px 26px;border-radius:12px 12px 0 0">
        <h1 style="font-size:20px;margin:0">Khách hàng mới từ website KTN</h1>
      </div>
      <div style="border:1px solid #dfe4eb;border-top:0;padding:24px 26px;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse">
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding:9px 0;color:#5F6673;width:150px;vertical-align:top">${escapeHtml(label)}</td>
                  <td style="padding:9px 0;font-weight:600">${escapeHtml(value)}</td>
                </tr>`,
            )
            .join("")}
        </table>
        <div style="margin-top:18px;padding:16px;background:#F5F7FA;border-radius:10px">
          <strong>Nội dung cần tư vấn</strong>
          <p style="white-space:pre-wrap;line-height:1.6;margin:8px 0 0">${escapeHtml(data.message)}</p>
        </div>
        <p style="font-size:12px;color:#5F6673;margin-top:20px">Mã yêu cầu: ${escapeHtml(data.id)}</p>
      </div>
    </div>`;
}

export async function notifyNewLead(data: LeadEmailData) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.email;
  const from =
    process.env.EMAIL_FROM ?? "KTN Website <onboarding@resend.dev>";
  const subject = `[KTN] Khách hàng mới: ${data.fullName} - ${data.phone}`;
  const html = buildLeadEmail(data);

  const resend = getResend();
  if (resend) {
    await resend.emails.send({ from, to, subject, html });
    return { sent: true, provider: "resend" as const };
  }

  const smtp = getSmtpTransporter();
  if (smtp) {
    await smtp.sendMail({ from, to, subject, html });
    return { sent: true, provider: "smtp" as const };
  }

  return { sent: false, provider: null };
}
