import findToken from "@/services/token/find"
import findUserById from "@/services/user/findById"
import updateUser from "@/services/user/update"
import removeToken from "@/services/token/remove"

import NotFoundError from "@/classes/errors/NotFoundError"
import UnauthorizedError from "@/classes/errors/UnauthorizedError"

import { verifyToken } from "@/utils/jwt"

import type { Response, Request } from "express"
import { TOKEN_TYPE } from "@/types/types"

const verify = async (req: Request, res: Response) => {
    const emailVerificationToken = await findToken({
        type: TOKEN_TYPE.EMAIL_VERIFY_TOKEN,
        token: req.params.token,
    })
    if (!emailVerificationToken) {
        throw new NotFoundError(
            "Email verification not found or expired. Please request a new one."
        )
    }

    const decodedToken = verifyToken(
        TOKEN_TYPE.EMAIL_VERIFY_TOKEN,
        req.params.token
    )
    if (!decodedToken) {
        throw new UnauthorizedError(
            "Email verification expired, please request a new one."
        )
    }

    const user = await findUserById(decodedToken.userId)
    if (!user) {
        throw new NotFoundError("Could not verify, user not found.")
    }
    if (user.verified) {
        return res.status(200).json({ message: "Email already verified." })
    }
    user.verified = true
    await updateUser(user)

    await removeToken(emailVerificationToken._id)

    res.status(200).json({ message: "Email verification successful." })
}

export default verify
