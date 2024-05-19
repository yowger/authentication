import { rateLimit } from "express-rate-limit"

import type { Options } from "express-rate-limit"

type RequiredLimiterOptions = {
    windowMs: number
    max: number
    message: string
}
type FilteredLimiterOptions = Omit<
    Options,
    "windowMs" | "max" | "message" | "standardHeaders" | "legacyHeaders"
>
type CustomLimiterOptions = RequiredLimiterOptions &
    Partial<FilteredLimiterOptions>
const createLimiter = ({
    windowMs,
    max,
    message,
    ...rest
}: CustomLimiterOptions) => {
    return rateLimit({
        windowMs,
        max,
        message,
        standardHeaders: "draft-7",
        legacyHeaders: false,
        ...rest,
    })
}

const loginLimiter = createLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: "Too many login attempts, please try again later.",
})
const logoutLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,
    message: "Too many logout attempts, please try again later.",
})
const registerLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: "Too many registration attempts, please try again later.",
})
const verifyLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: "Too many verification attempts, please try again later.",
})
const refreshLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    message: "Too many refresh attempts, please try again later.",
})
const forgotPasswordLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: "Too many forgot password attempts, please try again later.",
})
const resetPasswordLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: "Too many reset password attempts, please try again later.",
})
const resendVerificationLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: "Too many resend verification attempts, please try again later.",
})

export {
    loginLimiter,
    logoutLimiter,
    registerLimiter,
    verifyLimiter,
    refreshLimiter,
    forgotPasswordLimiter,
    resetPasswordLimiter,
    resendVerificationLimiter,
}
