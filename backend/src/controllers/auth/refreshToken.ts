import MissingTokenError from "@/classes/errors/MissingTokenError"

import { generateToken, verifyToken } from "@/utils/jwt"

import { refreshTokenConfig } from "@/config/cookies"

import type { Response, Request } from "express"

const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
        throw new MissingTokenError("Missing refresh token.")
    }

    const decodedToken = verifyToken("REFRESH_TOKEN", refreshToken)

    const now = Date.now()
    const expirationThreshold = 30 * 60 * 1000 // 30 minutes

    if (decodedToken.exp - now < expirationThreshold) {
        const newRefreshToken = generateToken("REFRESH_TOKEN", {
            userId: decodedToken.userId,
        })

        res.cookie("refresh_token", newRefreshToken, refreshTokenConfig)
    }

    const newAccessToken = generateToken("ACCESS_TOKEN", {
        userId: decodedToken.userId,
    })

    res.status(200).json({
        accessToken: newAccessToken,
    })
}

export default refreshToken
