import jwt from "jsonwebtoken"

import { Types } from "mongoose"

export default function createAccessToken(userId: Types.ObjectId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY + "s",
    })
}
