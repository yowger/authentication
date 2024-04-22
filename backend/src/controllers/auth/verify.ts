import findUserById from "@/services/user/findById"
import updateUser from "@/services/user/update"
import verifyEmailToken from "@/services/auth/jwt/verifyEmailToken"

import NotFoundError from "@/classes/errors/NotFoundError"

import type { Response, Request } from "express"

const verify = async (req: Request, res: Response) => {
    const token = req.params.token

    const payload = verifyEmailToken(token)

    const user = await findUserById(payload.userId)

    if (!user) {
        throw new NotFoundError("Could not verify, user not found.")
    }

    user.verified = true

    await updateUser(user)

    res.status(200).json({ message: "Email verification successful." })
}

export default verify
