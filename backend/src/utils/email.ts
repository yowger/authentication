import { createTransport } from "nodemailer"

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT as unknown as number,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

// todo: change to client url
export const sendVerificationCodeEmail = async (
    toEmail: string,
    token: string
) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Verify your email",
        text: `Please follow the given link to verify your email 
        ${process.env.SERVER_URL}/api/verify/${token}  
        Thanks`,
    })
}

// todo: change to client url
export const sendForgotPasswordEmail = async (
    toEmail: string,
    token: string
) => {
    const expiryInMinutes = Number(process.env.FORGOT_PASSWORD_EXPIRY) / 60

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Verify your email",
        text: `Click the link below to reset your password:
        ${process.env.SERVER_URL}/api/reset-password/${token}
        
        This link will expire in ${expiryInMinutes} minutes.
        
        If you did not request a password reset, please ignore this email.`,
    })
}
