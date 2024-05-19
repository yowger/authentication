import type { CookieOptions } from "express"

import { config } from "../env"

export const refreshTokenConfig: CookieOptions = {
    httpOnly: true,
    secure: true,
    // only for testing in thunderclient
    // httpOnly: false,
    // secure: false,
    sameSite: "none",
    maxAge: config.REFRESH_TOKEN_EXPIRY * 1000,
}
