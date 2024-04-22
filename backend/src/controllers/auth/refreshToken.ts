import createAccessToken from "@/services/auth/jwt/createAccessToken"
import findUserById from "@/services/user/findById"
import verifyRefreshToken from "@/services/auth/jwt/verifyRefreshToken"

import InvalidTokenError from "@/classes/errors/InvalidTokenError"
import MissingTokenError from "@/classes/errors/MissingTokenError"
import NotFoundError from "@/classes/errors/NotFoundError"

import type { Response, Request } from "express"

const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        throw new MissingTokenError("Missing refresh token.")
    }

    const decodedToken = verifyRefreshToken(refreshToken)

    if (!decodedToken) {
        throw new InvalidTokenError("Invalid refresh token.")
    }

    const user = await findUserById(decodedToken.userId)

    if (!user) {
        throw new NotFoundError("User not found.")
    }

    const newAccessToken = createAccessToken(user._id)

    res.status(200).json({
        accessToken: newAccessToken,
    })
}

export default refreshToken
