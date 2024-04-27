import bcrypt from "bcrypt"

import findUserByEmail from "@/services/user/findByEmail"

import { generateToken } from "@/utils/jwt"

import { refreshTokenConfig } from "@/config/cookies"

import ForbiddenError from "@/classes/errors/ForbiddenError"
import NotFoundError from "@/classes/errors/NotFoundError"
import UnauthorizedError from "@/classes/errors/UnauthorizedError"

import type { Response, Request } from "express"

const login = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)
    if (!user) {
        throw new NotFoundError("User not found.")
    }

    const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (!isPasswordMatch) {
        throw new UnauthorizedError("Invalid password")
    }

    if (!user.verified) {
        throw new ForbiddenError("Email verification required.")
    }

    const accessToken = generateToken("ACCESS_TOKEN", { userId: user._id })
    const refreshToken = generateToken("REFRESH_TOKEN", { userId: user._id })

    res.cookie("refresh_token", refreshToken, refreshTokenConfig)

    res.status(200).json({
        accessToken,
        message: "Login successful",
    })
}

export default login
