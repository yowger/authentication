import jwt from "jsonwebtoken"

import type { JwtPayload } from "jsonwebtoken"

import { Types } from "mongoose"

type AccessTokenPayload = {
    userId: Types.ObjectId
} & JwtPayload

export default function verifyAccessToken(token: string) {
    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    ) as AccessTokenPayload
}
