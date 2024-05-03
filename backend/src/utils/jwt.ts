import jwt from "jsonwebtoken"

import { Types } from "mongoose"
import type { JwtPayload } from "jsonwebtoken"

type TokenPayloads = {
    ACCESS_TOKEN: {
        userId: Types.ObjectId
    }
    REFRESH_TOKEN: {
        userId: Types.ObjectId
    }
    EMAIL_VERIFY_TOKEN: {
        userId: Types.ObjectId
    }
    RESET_PASSWORD_TOKEN: {
        userId: Types.ObjectId
    }
}

type TokenType = keyof TokenPayloads

type TokenConfig = {
    expiresIn: number
    secret: string
}

const tokenConfigs: { [key in TokenType]: TokenConfig } = {
    ACCESS_TOKEN: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
    REFRESH_TOKEN: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
    EMAIL_VERIFY_TOKEN: {
        secret: process.env.EMAIL_VERIFY_TOKEN_SECRET,
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRY,
    },
    RESET_PASSWORD_TOKEN: {
        secret: process.env.RESET_PASSWORD_TOKEN_SECRET,
        expiresIn: process.env.RESET_PASSWORD_TOKEN_EXPIRY,
    },
}

export function generateToken<T extends TokenType>(
    type: T,
    payload: TokenPayloads[T],
    options?: jwt.SignOptions
): string | null {
    try {
        const secretKey = tokenConfigs[type].secret
        const expiresIn = options?.expiresIn
            ? options.expiresIn
            : tokenConfigs[type].expiresIn + "s"

        return jwt.sign(payload, secretKey, { expiresIn, ...options })
    } catch (error) {
        // todo log
        console.log("Error generating token: ", error)
        return null
    }
}

export function verifyToken<T extends TokenType>(
    type: T,
    token: string
): TokenPayloads[T] | null {
    try {
        const secretKey = tokenConfigs[type].secret

        return jwt.verify(token, secretKey) as TokenPayloads[T] & JwtPayload
    } catch (error) {
        // todo log
        console.log("Error verifying token: ", error)
        return null
    }
}
