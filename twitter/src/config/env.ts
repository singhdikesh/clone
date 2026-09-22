import "dotenv/config";

export const env = {
    smtpHost: process.env.SMTP_HOST!,
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpUser: process.env.SMTP_USER!,
    smtpPassword: process.env.SMTP_PASSWORD!,
    emailFrom: process.env.EMAIL_FROM!,
    frontendUrl: process.env.FRONTEND_URL!,
}