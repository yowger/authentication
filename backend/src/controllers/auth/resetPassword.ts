import findUserById from "@/services/user/findById"
import updateUserById from "@/services/user/updateById"
import updateToken from "@/services/auth/token/update"
import findToken from "@/services/auth/token/find"

import NotFoundError from "@/classes/errors/NotFoundError"
import UnauthorizedError from "@/classes/errors/UnauthorizedError"

import { verifyToken } from "@/utils/jwt"

import { TokenType } from "@/models/Token"

import type { Response, Request } from "express"

const resetPassword = async (req: Request, res: Response) => {
    const decodedToken = verifyToken("RESET_PASSWORD_TOKEN", req.params.token)

    const user = await findUserById(decodedToken.userId)

    if (!user) {
        throw new NotFoundError("Could not reset password, user not found.")
    }

    const resetPasswordToken = await findToken({
        user: user._id,
        type: TokenType.PASSWORD_RESET_TOKEN,
    })

    if (!resetPasswordToken.token) {
        throw new NotFoundError("Could not reset password, token not found.")
    } else if (resetPasswordToken.token != req.params.token) {
        throw new UnauthorizedError(
            "Invalid password reset token. Please request another password reset"
        )
    }

    user.password = req.body.password

    await updateUserById(user._id, user)

    resetPasswordToken.token = null
    resetPasswordToken.expiresAt = null
    await updateToken(
        { user: user._id, type: TokenType.PASSWORD_RESET_TOKEN },
        resetPasswordToken
    )

    res.status(200).json({ message: "Password reset successfully" })
}

export default resetPassword
