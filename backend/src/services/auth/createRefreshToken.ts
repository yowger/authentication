import jwt from "jsonwebtoken"

import { Types } from "mongoose"

export default function createRefreshToken(userId: Types.ObjectId) {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    })
}
