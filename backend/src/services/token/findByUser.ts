import TokenModel from "@/models/Token"

import { QueryOptions, Types } from "mongoose"

const findTokenByUser = async (
    user: Types.ObjectId,
    options: QueryOptions = {}
) => {
    return TokenModel.findOne({ user }, options)
        .select("+PasswordResetToken +emailVerifyToken")
        .lean()
        .exec()
}

export default findTokenByUser
