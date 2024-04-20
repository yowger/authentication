import jwt from "jsonwebtoken"

import findUserById from "@/services/user/findById"
import updateUser from "@/services/user/update"

import { Types } from "mongoose"
import type { Response, Request } from "express"

const verify = async (req: Request, res: Response) => {
    const token = req.params.token

    const payload = jwt.verify(token, process.env.EMAIL_SECRET) as {
        userId: Types.ObjectId
    }
    console.log("🚀 ~ payload ~ payload:", payload)

    const user = await findUserById(payload.userId)

    user.verified = true

    await updateUser(user)

    res.status(200).json({ message: "Email verification successful." })
}

export default verify
