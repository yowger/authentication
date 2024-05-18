import findUserById from "@/services/user/findById"

import NotFoundError from "@/classes/errors/NotFoundError"

import type { Response, Request } from "express"

const read = async (req: Request, res: Response) => {
    const user = await findUserById(req.user)

    if (!user) {
        throw new NotFoundError("User not found")
    }

    return res.status(200).json(user)
}

export default read
