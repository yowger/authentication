import bcrypt from "bcrypt"

import createUser from "@/services/user/create"
import findUserByEmail from "@/services/user/findByEmail"

import ConflictError from "@/classes/errors/ConflictError"
import EmailSendingError from "@/classes/errors/EmailSendingError"

import { createToken } from "@/utils/jwt"
import { sendVerificationCode } from "@/utils/email"

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

    const emailToken = createToken("EMAIL_TOKEN", createdUser._id)

    try {
        await sendVerificationCode(req.body.email, emailToken)
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
