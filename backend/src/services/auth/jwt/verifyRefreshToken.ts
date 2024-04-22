import jwt from "jsonwebtoken"

import type { JwtPayload } from "jsonwebtoken"

import { Types } from "mongoose"

type RefreshTokenPayload = {
    userId: Types.ObjectId
} & JwtPayload

export default function verifyRefreshToken(token: string) {
    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    ) as RefreshTokenPayload
}
