import findUserByEmail from "@/services/user/findByEmail"

import NotFoundError from "@/classes/errors/NotFoundError"

import { createToken } from "@/utils/jwt"
import { sendForgotPasswordEmail } from "@/utils/email"

import type { Response, Request } from "express"

const forgotPassword = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)

    if (!user) {
        throw new NotFoundError("Email address not found.")
    }

    const token = createToken("FORGOT_PASSWORD", { userId: user._id })

    await sendForgotPasswordEmail(req.body.email, token)

    res.status(200).json({ message: "Password reset link sent to your email." })
}

export default forgotPassword
