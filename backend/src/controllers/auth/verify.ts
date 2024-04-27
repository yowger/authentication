import findUserById from "@/services/user/findById"
import updateUserById from "@/services/user/updateById"
import updateToken from "@/services/auth/token/update"

import NotFoundError from "@/classes/errors/NotFoundError"

import { verifyToken } from "@/utils/jwt"

import type { Response, Request } from "express"

const verify = async (req: Request, res: Response) => {
    const token = req.params.token

    const decodedToken = verifyToken("EMAIL_VERIFY_TOKEN", token)

    const user = await findUserById(decodedToken.userId)

    if (!user) {
        throw new NotFoundError("Could not verify, user not found.")
    }

    user.verified = true

    await updateUserById(user._id, user)

    await updateToken(user._id, { emailVerifyToken: null })

    res.status(200).json({ message: "Email verification successful." })
}

export default verify
