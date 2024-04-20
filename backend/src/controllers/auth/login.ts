import bcrypt from "bcrypt"

import findUserByEmail from "@/services/user/findByEmail"
import createAccessToken from "@/services/auth/createAccessToken"
import createRefreshToken from "@/services/auth/createRefreshToken"

import BadRequestError from "@/classes/errors/BadRequestError"
import ForbiddenError from "@/classes/errors/ForbiddenError"
import UnauthorizedError from "@/classes/errors/UnauthorizedError"

import type { Response, Request } from "express"

const login = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)
    if (user) {
        throw new BadRequestError("User with this email address already exists")
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

    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: (process.env.REFRESH_TOKEN_EXPIRY as unknown as number) * 1000,
    })

    res.status(200).json({
        accessToken,
        message: "Login successful",
    })
}

export default login
