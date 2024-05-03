import findUserByEmail from "@/services/user/findByEmail"
import findToken from "@/services/token/find"

import NotFoundError from "@/classes/errors/NotFoundError"

import { generateToken } from "@/utils/jwt"
import { sendForgotPasswordEmail } from "@/utils/email"

import type { Response, Request } from "express"
import createToken from "@/services/token/create"
import { TOKEN_TYPE } from "@/types/types"

const forgotPassword = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)
    if (!user) {
        throw new NotFoundError("Email address not found.")
    }

    const existingToken = await findToken({
        user: user._id,
        type: TOKEN_TYPE.PASSWORD_RESET_TOKEN,
    })
    if (existingToken && existingToken.expiresAt > new Date()) {
        return res.status(200).json({
            message: "Existing reset password token is still valid",
            tokenValid: true,
        })
    }

    const newResetPasswordToken = generateToken(
        TOKEN_TYPE.PASSWORD_RESET_TOKEN,
        {
            userId: user._id,
        }
    )

    const expirationTime = new Date(
        Date.now() + process.env.PASSWORD_RESET_TOKEN_EXPIRY * 1000
    )
    await createToken({
        user: user._id,
        type: TOKEN_TYPE.PASSWORD_RESET_TOKEN,
        token: newResetPasswordToken,
        expiresAt: expirationTime,
    })

    await sendForgotPasswordEmail(req.body.email, newResetPasswordToken)

    res.status(200).json({ message: "Password reset link sent to your email." })
}

export default forgotPassword
