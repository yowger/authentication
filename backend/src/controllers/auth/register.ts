import bcrypt from "bcrypt"

import createUser from "@/services/user/create"
import createToken from "@/services/token/create"
import findUserByEmail from "@/services/user/findByEmail"
import removeUserById from "@/services/user/remove"

import ConflictError from "@/handler/subtypes/ConflictError"
import EmailSendingError from "@/handler/subtypes/EmailSendingError"
import InternalServerError from "@/handler/subtypes/InternalServerError"

import { generateToken } from "@/utils/jwt"
import { sendVerificationCodeEmail } from "@/utils/email"

import { config } from "@/config/config"

import type { Response, Request } from "express"
import { TOKEN_TYPE } from "@/types/token"

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

    const verificationToken = generateToken(TOKEN_TYPE.EMAIL_VERIFY_TOKEN, {
        userId: createdUser._id,
    })
    if (!verificationToken) {
        await removeUserById(createdUser._id)
        throw new InternalServerError("Failed to generate email verification.")
    }

    const expirationTime = new Date(
        Date.now() + config.EMAIL_VERIFY_TOKEN_EXPIRY * 1000
    )
    await createToken({
        user: createdUser._id,
        type: TOKEN_TYPE.EMAIL_VERIFY_TOKEN,
        token: verificationToken,
        expiresAt: expirationTime,
    })

    await sendVerificationCodeEmail(req.body.email, verificationToken).catch(
        (error) => {
            throw new EmailSendingError(
                "Failed to send verification email. Please try again later."
            )
        }
    )

    res.status(201).json({
        message: "Registration successful. Please verify your email.",
    })
}

export default register
