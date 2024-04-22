import createRefreshToken from "@/services/auth/jwt/createRefreshToken"

import createAccessToken from "@/services/auth/jwt/createAccessToken"
import verifyRefreshToken from "@/services/auth/jwt/verifyRefreshToken"

import InvalidTokenError from "@/classes/errors/InvalidTokenError"
import MissingTokenError from "@/classes/errors/MissingTokenError"

import { refreshTokenConfig } from "@/services/auth/config/cookies"

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

    const now = Date.now()
    const expirationThreshold = 30 * 60 * 1000 // 30 minutes

    if (decodedToken.exp - now < expirationThreshold) {
        const newRefreshToken = createRefreshToken(decodedToken.userId)

        res.cookie("refresh_token", newRefreshToken, refreshTokenConfig)
    }

    const newAccessToken = createAccessToken(decodedToken.userId)

    res.status(200).json({
        accessToken: newAccessToken,
    })
}

export default refreshToken
