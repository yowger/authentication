import jwt from "jsonwebtoken"

import { Types } from "mongoose"

type AccessTokenPayload = {
    userId: Types.ObjectId
}

export default function verifyEmailToken(token: string) {
    return jwt.verify(token, process.env.EMAIL_SECRET) as AccessTokenPayload
}
