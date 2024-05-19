import bcrypt from "bcrypt"

import findUserById from "@/services/user/findById"
import updateUser from "@/services/user/update"
import findToken from "@/services/token/find"
import removeToken from "@/services/token/remove"

import NotFoundError from "@/handler/subtypes/NotFoundError"
import UnauthorizedError from "@/handler/subtypes/UnauthorizedError"

import { verifyToken } from "@/utils/jwt"

import type { Response, Request } from "express"
import { TOKEN_TYPE } from "@/types/token"

const resetPassword = async (req: Request, res: Response) => {
    const emailVerificationToken = await findToken({
        type: TOKEN_TYPE.PASSWORD_RESET_TOKEN,
        token: req.params.token,
    })
    if (!emailVerificationToken) {
        throw new NotFoundError(
            "Reset password verification not found or expired. Please request a new one."
        )
    }

    const decodedToken = verifyToken(
        TOKEN_TYPE.PASSWORD_RESET_TOKEN,
        req.params.token
    )
    if (!decodedToken) {
        throw new UnauthorizedError(
            "Reset password verification expired, please request a new one."
        )
    }

    const user = await findUserById(decodedToken.userId)
    if (!user) {
        throw new NotFoundError("Could not reset password, user not found.")
    }

    const salt = 10
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    user.password = hashedPassword
    await updateUser(user)

    await removeToken(emailVerificationToken._id)

    res.status(200).json({ message: "Password reset successfully" })
}

export default resetPassword
