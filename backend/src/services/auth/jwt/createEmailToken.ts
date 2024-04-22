import jwt from "jsonwebtoken"

import { Types } from "mongoose"

export default function createEmailToken(userId: Types.ObjectId) {
    return jwt.sign({ userId }, process.env.EMAIL_SECRET, {
        expiresIn: process.env.EMAIL_TOKEN_EXPIRY + "s",
    })
}
