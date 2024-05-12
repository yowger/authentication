import type { CookieOptions } from "express"

import { config } from "./config"

export const refreshTokenConfig: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: config.REFRESH_TOKEN_EXPIRY * 1000,
}
