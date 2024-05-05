import { createTransport } from "nodemailer"

import { logger } from "@/utils/logger"

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export const sendVerificationCodeEmail = async (
    toEmail: string,
    token: string
) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: process.env.EMAIL_USER,
                to: toEmail,
                subject: "Verify your email",
                text: `Please follow the given link to verify your email 
            ${process.env.CLIENT_URL}/api/verify/${token}  
            Thanks`,
            },
            function (error, info) {
                if (error) {
                    logger.error("Error sending verification email:", error)

                    reject(error)
                } else {
                    resolve(true)
                }
            }
        )
    })
}

export const sendForgotPasswordEmail = async (
    toEmail: string,
    token: string
) => {
    return new Promise((resolve, reject) => {
        const expiryInMinutes = process.env.PASSWORD_RESET_TOKEN_EXPIRY / 60

        transporter.sendMail(
            {
                from: process.env.EMAIL_USER,
                to: toEmail,
                subject: "Verify your email",
                text: `Click the link below to reset your password:
        ${process.env.CLIENT_URL}/api/reset-password/${token}
        
        This link will expire in ${expiryInMinutes} minutes.
        
        If you did not request a password reset, please ignore this email.`,
            },
            function (error, info) {
                if (error) {
                    logger.error("Error sending forgot password email:", error)

                    reject(error)
                } else {
                    resolve(true)
                }
            }
        )
    })
}
