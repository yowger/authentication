import findUserById from "@/services/user/findById"
import updateUser from "@/services/user/update"

import NotFoundError from "@/classes/errors/NotFoundError"

import type { Response, Request } from "express"
import { verifyToken } from "@/utils/jwt"

const verify = async (req: Request, res: Response) => {
    const token = req.params.token

    const decodedToken = verifyToken("EMAIL_TOKEN", token)
    
    const user = await findUserById(decodedToken.userId)

    if (!user) {
        throw new NotFoundError("Could not verify, user not found.")
    }

    user.verified = true

    await updateUser(user)

    res.status(200).json({ message: "Email verification successful." })
}

export default verify
