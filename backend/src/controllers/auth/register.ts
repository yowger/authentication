import bcrypt from "bcrypt"

import createUser from "@/services/user/create"
import createToken from "@/services/auth/token/create"
import findUserByEmail from "@/services/user/findByEmail"

import ConflictError from "@/classes/errors/ConflictError"
import EmailSendingError from "@/classes/errors/EmailSendingError"

import { generateToken } from "@/utils/jwt"
import { sendVerificationCodeEmail } from "@/utils/email"

import { TokenType } from "@/models/Token"

import type { Response, Request } from "express"

const register = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)
    if (user) {
        throw new ConflictError("User with this email address already exists")
    }

    const salt = 10
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const createdUser = await createUser({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })

    const emailToken = generateToken("EMAIL_VERIFY_TOKEN", {
        userId: createdUser._id,
    })

    const expirationTime = new Date(
        Date.now() + process.env.EMAIL_VERIFY_TOKEN_EXPIRY * 1000
    )

    await createToken({
        user: createdUser._id,
        type: TokenType.EMAIL_VERIFY_TOKEN,
        token: emailToken,
        expiresAt: expirationTime,
    })

    try {
        await sendVerificationCodeEmail(req.body.email, emailToken)
    } catch (error) {
        throw new EmailSendingError(
            "Failed to send verification email. Please try again later."
        )
    }

    res.status(201).json({
        message: "Registration successful. Please verify your email.",
    })
}

export default register
