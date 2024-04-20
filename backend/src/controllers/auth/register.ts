import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import createUser from "@/services/user/create"
import findUserByEmail from "@/services/user/findByEmail"

import ConflictError from "@/classes/errors/ConflictError"
import EmailSendingError from "@/classes/errors/EmailSendingError"

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

    const emailToken = jwt.sign(
        {
            userId: createdUser._id,
        },
        process.env.EMAIL_SECRET,
        { expiresIn: "10m" }
    )

    try {
        await sendVerificationCode(req.body.email, emailToken)
    } catch (error) {
        console.log("email verification could not be sent: ", error)

        throw new EmailSendingError(
            "Failed to send verification email. Please try again later."
        )
    }

    res.status(201).json({
        message: "Registration successful. Please verify your email.",
    })
}

export default register
