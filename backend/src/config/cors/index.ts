import cors from "cors"

import { config } from "../env"

import { logger } from "@/utils/logger"

const allowedOriginsSet = new Set(
    config.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) || []
)

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOriginsSet.has(origin) || !origin) {
            callback(null, true)
        } else {
            const errorMessage = `Origin '${origin}' not allowed by CORS`
            logger.error("cors_disallowed_origin", errorMessage)
            callback(new Error(errorMessage))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

export default corsOptions
