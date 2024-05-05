import BaseError from "@/classes/errors/BaseError"

import { Error } from "mongoose"
import type {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express"
import { logger } from "@/utils/logger"

const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof Error.ValidationError) {
        logger.warn("validation error: ", error)

        const message = Object.values(error.errors)
            .map((error) => error.message.replace(/`/g, ""))
            .join(", ")

        return res.status(400).json({ message })
    }

    if (error instanceof BaseError) {
        if (!error.isOperational) {
            logger.error("non operational base error: ", error)
        }

        return res.status(error.httpCode).json({
            message: error.message,
        })
    }

    logger.error("Internal server error: ", error)

    return res.status(500).json({
        message: "Internal server error",
    })
}

export default errorHandler
