import type { CookieOptions } from "express"

export const refreshTokenConfig: CookieOptions = {
    httpOnly: false,
    secure: false,
    // httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: (process.env.REFRESH_TOKEN_EXPIRY as unknown as number) * 1000,
}
