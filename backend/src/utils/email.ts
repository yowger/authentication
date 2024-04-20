import { createTransport } from "nodemailer"

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT as unknown as number,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

export const sendVerificationCode = async (toEmail: string, token: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Verify your email",
        text: `Please follow the given link to verify your email 
        http://localhost:8000/api/verify/${token}  
        Thanks`,
    })
}
