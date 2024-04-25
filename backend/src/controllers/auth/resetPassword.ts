import findUserById from "@/services/user/findById"
import updateUser from "@/services/user/update"

import NotFoundError from "@/classes/errors/NotFoundError"

import { verifyToken } from "@/utils/jwt"

import type { Response, Request } from "express"

const resetPassword = async (req: Request, res: Response) => {
    const decodedToken = verifyToken("FORGOT_PASSWORD", req.params.token)
    console.log("🚀 ~ resetPassword ~ decodedToken:", decodedToken)

    const user = await findUserById(decodedToken.userId)

    if (!user) {
        throw new NotFoundError("Could not reset password, user not found.")
    }

    user.password = req.body.password

    await updateUser(user)

    res.status(200).json({ message: "Password reset successfully" })
}

export default resetPassword
