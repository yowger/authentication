import jwt from "jsonwebtoken"

import InvalidTokenError from "@/classes/errors/InvalidTokenError"

import { Types } from "mongoose"
import type { JwtPayload } from "jsonwebtoken"

type TokenPayloads = {
    ACCESS_TOKEN: {
        userId: Types.ObjectId
    }
    REFRESH_TOKEN: {
        userId: Types.ObjectId
    }
    EMAIL_TOKEN: {
        userId: Types.ObjectId
    }
    FORGOT_PASSWORD: {
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
    EMAIL_TOKEN: {
        secret: process.env.EMAIL_TOKEN_SECRET,
        expiresIn: process.env.EMAIL_TOKEN_EXPIRY,
    },
    FORGOT_PASSWORD: {
        secret: process.env.FORGOT_PASSWORD_SECRET,
        expiresIn: process.env.FORGOT_PASSWORD_EXPIRY,
    },
}

export function createToken<T extends TokenType>(
    type: T,
    payload: TokenPayloads[T],
    options?: jwt.SignOptions
): string {
    const secretKey = tokenConfigs[type].secret
    const expiresIn = options.expiresIn
        ? options.expiresIn
        : tokenConfigs[type].expiresIn + "s"

    try {
        return jwt.sign(payload, secretKey, { expiresIn, ...options })
    } catch (error) {
        throw new InvalidTokenError()
    }
}

export function verifyToken<T extends TokenType>(type: T, token: string) {
    const secretKey = tokenConfigs[type].secret

    try {
        return jwt.verify(token, secretKey) as TokenPayloads[T] & JwtPayload
    } catch (error) {
        throw new InvalidTokenError()
    }
}
