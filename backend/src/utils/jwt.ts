import jwt from "jsonwebtoken"

import InvalidTokenError from "@/classes/errors/InvalidTokenError"

import { Types } from "mongoose"
import type { JwtPayload } from "jsonwebtoken"

type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN" | "EMAIL_TOKEN"

type TokenConfig = {
    expiresIn: number
    secret: string
    defaultClaims?: Partial<JwtPayload>
}

const tokenConfigs: { [key in TokenType]: TokenConfig } = {
    ACCESS_TOKEN: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY as unknown as number,
        defaultClaims: { userId: Types.ObjectId },
    },
    REFRESH_TOKEN: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY as unknown as number,
        defaultClaims: { userId: Types.ObjectId },
    },
    EMAIL_TOKEN: {
        secret: process.env.EMAIL_TOKEN_SECRET,
        expiresIn: process.env.EMAIL_TOKEN_EXPIRY as unknown as number,
        defaultClaims: { userId: Types.ObjectId },
    },
}

export function createToken(
    type: TokenType,
    payload: JwtPayload,
    options?: Partial<TokenConfig>
): string {
    const secretKey = options?.secret || tokenConfigs[type].secret
    const expiresIn = options?.expiresIn || tokenConfigs[type].expiresIn

    const tokenPayload: JwtPayload & { type?: string } = {
        ...payload,
        ...(options?.defaultClaims || {}),
    }

    try {
        return jwt.sign(tokenPayload, secretKey, { expiresIn })
    } catch (error) {
        throw new InvalidTokenError()
    }
}

export function verifyToken(type: TokenType, token: string) {
    try {
        return jwt.verify(token, tokenConfigs[type].secret) as JwtPayload
    } catch (error) {
        throw new InvalidTokenError()
    }
}
