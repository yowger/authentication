import type { CookieOptions } from "express"

import { config } from "./config"

export const refreshTokenConfig: CookieOptions = {
    httpOnly: false /* false for testing api */,
    secure: false /* false for testing api */,
    // httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: config.REFRESH_TOKEN_EXPIRY * 1000,
}
