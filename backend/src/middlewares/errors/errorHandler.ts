import { Error } from "mongoose"

import { JsonWebTokenError } from "jsonwebtoken"

import CustomerError from "@/classes/errors/CustomError"

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

    if (error instanceof Error.ValidationError) {
        const message = Object.values(error.errors)
            .map((error) => error.message.replace(/`/g, ""))
            .join(", ")

        return res.status(400).json({ message })
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
