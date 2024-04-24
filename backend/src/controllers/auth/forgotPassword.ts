import NotFoundError from "@/classes/errors/NotFoundError"
import findUserByEmail from "@/services/user/findByEmail"
import type { Response, Request } from "express"

const forgotPassword = async (req: Request, res: Response) => {
    const user = await findUserByEmail(req.body.email)

    if (!user) {
        throw new NotFoundError("Email address not found.")
    }

    
}

export default forgotPassword
