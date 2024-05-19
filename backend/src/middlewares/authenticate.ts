import UnauthorizedError from "@/handler/subtypes/UnauthorizedError"

import type { Request, Response, NextFunction } from "express"
import { verifyToken } from "@/utils/jwt"

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer")
        ) {
            throw new UnauthorizedError()
        }

        const token = req.headers.authorization.split(" ")[1]

        const decoded = verifyToken("ACCESS_TOKEN", token)

        req.user = decoded.userId

        next()
    } catch (error) {
        next(error)
    }
}

export default authenticate
