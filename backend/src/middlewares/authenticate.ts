import asyncHandler from "@/middlewares/errors/asyncHandler"

import UnauthorizedError from "@/classes/errors/UnauthorizedError"
import verifyAccessToken from "@/services/auth/jwt/verifyAccessToken"

import type { Request, Response, NextFunction } from "express"

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    ) {
        throw new UnauthorizedError()
    }

    const token = req.headers.authorization.split(" ")[1]

    const decoded = verifyAccessToken(token)

    req.user = decoded.userId

    next()
}

export default asyncHandler(authenticate)
