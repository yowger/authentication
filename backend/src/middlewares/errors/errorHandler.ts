import { JsonWebTokenError } from "jsonwebtoken"

import CustomerError from "@/classes/errors/CustomError"
import UnauthorizedError from "@/classes/errors/UnauthorizedError"

import type {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express"

const errorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // log error
    console.log("error name: ", error.name)
    console.log("error: ", error)

    if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedError("Invalid or expired token")
    }

    if (error instanceof CustomerError) {
        return res.status(error.statusCode).json({
            message: error.message,
        })
    }

    return res.status(500).json({
        message: "Internal server error",
    })
}

export default errorHandler
