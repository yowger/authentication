import findUserByEmail from "@/services/user/findByEmail"
import findToken from "@/services/token/find"
import updateToken from "@/services/token/update"

import BadRequestError from "@/classes/errors/BadRequestError"
import EmailSendingError from "@/classes/errors/EmailSendingError"
import InternalServerError from "@/classes/errors/InternalServerError"
import NotFoundError from "@/classes/errors/NotFoundError"

import { generateToken } from "@/utils/jwt"
import { sendVerificationCodeEmail } from "@/utils/email"

import { config } from "@/config/config"

import type { Response, Request } from "express"
import { TOKEN_TYPE } from "@/types/token"

const resendVerification = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)
    if (!user) {
        throw new NotFoundError("User not found")
    }
    if (user.verified) {
        throw new BadRequestError("User is already verified")
    }

    const existingToken = await findToken({
        user: user._id,
        type: TOKEN_TYPE.EMAIL_VERIFY_TOKEN,
    })
    if (existingToken && existingToken.expiresAt > new Date()) {
        return res.status(200).json({
            message: "Existing verification email is still valid.",
            tokenValid: true,
        })
    }

    const verificationToken = generateToken(TOKEN_TYPE.EMAIL_VERIFY_TOKEN, {
        userId: user._id,
    })
    if (!verificationToken) {
        throw new InternalServerError("Failed to generate email verification.")
    }

    const expirationTime = new Date(
        Date.now() + config.EMAIL_VERIFY_TOKEN_EXPIRY * 1000
    )
    existingToken.token = verificationToken
    existingToken.expiresAt = expirationTime
    existingToken.updatedAt = new Date()
    await updateToken(existingToken)

    await sendVerificationCodeEmail(req.body.email, verificationToken).catch(
        (error) => {
            throw new EmailSendingError(
                "Failed to send verification email. Please try again later."
            )
        }
    )

    res.status(200).json({
        message: "Email verification send. Please check your email.",
        tokenValid: false,
    })
}

export default resendVerification
