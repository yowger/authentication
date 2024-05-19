import { createTransport } from "nodemailer"

import { logger } from "@/utils/logger"

import { config } from "@/config/env"

const transporter = createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
    },
})

export const sendVerificationCodeEmail = async (
    toEmail: string,
    token: string
) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: config.EMAIL_USER,
                to: toEmail,
                subject: "Verify your email",
                text: `Please follow the given link to verify your email 
            ${config.CLIENT_URL}/verify/${token}  
            Thanks`,
            },
            function (error, info) {
                if (error) {
                    logger.error("Error sending verification email: ", error)

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
        const expiryInMinutes = config.PASSWORD_RESET_TOKEN_EXPIRY / 60

        transporter.sendMail(
            {
                from: config.EMAIL_USER,
                to: toEmail,
                subject: "Verify your email",
                text: `Click the link below to reset your password:
        ${config.CLIENT_URL}/reset-password/${token}
        
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
