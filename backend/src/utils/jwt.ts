import jwt from "jsonwebtoken"

import { logger } from "@/utils/logger"

import { config } from "@/config/config"

import type { JwtPayload } from "jsonwebtoken"
import { Types } from "mongoose"
import { type TokenType, TOKEN_TYPE } from "@/types/token"

type TokenPayload<T extends TokenType> =
    T extends typeof TOKEN_TYPE.ACCESS_TOKEN
        ? { userId: Types.ObjectId }
        : T extends typeof TOKEN_TYPE.EMAIL_VERIFY_TOKEN
        ? { userId: Types.ObjectId }
        : T extends typeof TOKEN_TYPE.REFRESH_TOKEN
        ? { userId: Types.ObjectId }
        : T extends typeof TOKEN_TYPE.PASSWORD_RESET_TOKEN
        ? { userId: Types.ObjectId }
        : never

type TokenConfig = {
    expiresIn: number
    secret: string
}
const tokenConfigs: Record<TokenType, TokenConfig> = {
    ACCESS_TOKEN: {
        secret: config.ACCESS_TOKEN_SECRET,
        expiresIn: config.ACCESS_TOKEN_EXPIRY,
    },
    REFRESH_TOKEN: {
        secret: config.REFRESH_TOKEN_SECRET,
        expiresIn: config.REFRESH_TOKEN_EXPIRY,
    },
    EMAIL_VERIFY_TOKEN: {
        secret: config.EMAIL_VERIFY_TOKEN_SECRET,
        expiresIn: config.EMAIL_VERIFY_TOKEN_EXPIRY,
    },
    PASSWORD_RESET_TOKEN: {
        secret: config.PASSWORD_RESET_TOKEN_SECRET,
        expiresIn: config.PASSWORD_RESET_TOKEN_EXPIRY,
    },
}

export function generateToken<T extends TokenType>(
    type: T,
    payload: TokenPayload<T>,
    options?: jwt.SignOptions
): string | null {
    try {
        const secretKey = tokenConfigs[type].secret
        const expiresIn = options?.expiresIn
            ? options.expiresIn
            : tokenConfigs[type].expiresIn + "s"

        return jwt.sign(payload, secretKey, { expiresIn, ...options })
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Error generating token: (type: ${type})`, error)
        }

        return null
    }
}

export function verifyToken<T extends TokenType>(
    type: T,
    token: string
): (TokenPayload<T> & JwtPayload) | null {
    try {
        const secretKey = tokenConfigs[type].secret
        console.log("🚀 ~ secretKey:", secretKey)
        console.log("🚀 ~ token:", token)
        console.log("🚀 ~ type:", type)

        return jwt.verify(token, secretKey) as TokenPayload<T> & JwtPayload
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Error verifying token (type: ${type})`, error)
        }

        return null
    }
}
