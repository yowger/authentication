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

export default createLimiter
