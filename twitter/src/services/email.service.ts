import nodemailer from "nodemailer";
import {env} from "../config/env";

const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,

    auth: {
        user: env.smtpUser,
        pass: env.smtpPassword
    }
})

export const sendVerificationEmail = async(email: string, name: string, verificationUrl: string) => {
    await transporter.sendMail({
        from: env.emailFrom,
        to: email,
        subject: "Verify your Twitter account",
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
            ">

                <h2>Welcome, ${name}!</h2>

                <p>
                Thank you for creating your account.
                </p>

                <p>
                Please verify your email address by clicking
                the button below.
                </p>

                <div style="margin: 30px 0;">
                <a
                    href="${verificationUrl}"
                    style="
                    background-color: #1d9bf0;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 6px;
                    display: inline-block;
                    "
                >
                    Verify Email
                </a>
                </div>

                <p>
                This verification link will expire in 30 minutes.
                </p>

                <p>
                If you did not create this account, you can
                safely ignore this email.
                </p>

            </div>
         `,
    });
}