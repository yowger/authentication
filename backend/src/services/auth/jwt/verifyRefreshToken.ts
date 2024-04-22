import jwt from "jsonwebtoken"

import { Types } from "mongoose"

type AccessTokenPayload = {
    userId: Types.ObjectId
}

export default function verifyRefreshToken(token: string) {
    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    ) as AccessTokenPayload
}
