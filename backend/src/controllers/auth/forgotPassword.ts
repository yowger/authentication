import findUserByEmail from "@/services/user/findByEmail"
import findToken from "@/services/auth/token/find"
import updateToken from "@/services/auth/token/update"

import ConflictError from "@/classes/errors/ConflictError"
import NotFoundError from "@/classes/errors/NotFoundError"

import { generateToken } from "@/utils/jwt"
import { sendForgotPasswordEmail } from "@/utils/email"

import { Token, TokenType } from "@/models/Token"

import type { Response, Request } from "express"

const forgotPassword = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)

    if (!user) {
        throw new NotFoundError("Email address not found.")
    }

    const existingResetPasswordToken = await findToken({
        user: user._id,
        type: TokenType.PASSWORD_RESET_TOKEN,
    })

    if (
        existingResetPasswordToken &&
        existingResetPasswordToken.token &&
        existingResetPasswordToken.expiresAt > new Date()
    ) {
        throw new ConflictError(
            "A reset password email has already been sent. Please check your email or wait before requesting a new one."
        )
    }

    const newResetPasswordToken = generateToken("RESET_PASSWORD_TOKEN", {
        userId: user._id,
    })

    const expirationTime = new Date(
        Date.now() + process.env.RESET_PASSWORD_TOKEN_EXPIRY * 1000
    )
    await updateToken(
        { user: user._id, type: TokenType.PASSWORD_RESET_TOKEN },
        {
            user: user._id,
            type: TokenType.PASSWORD_RESET_TOKEN,
            token: newResetPasswordToken,
            expiresAt: expirationTime,
        } as Token,
        { upsert: true }
    )

    await sendForgotPasswordEmail(req.body.email, newResetPasswordToken)

    res.status(200).json({ message: "Password reset link sent to your email." })
}

export default forgotPassword
