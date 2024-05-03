import TokenModel, { Token } from "@/models/Token"

import { Types, FilterQuery, QueryOptions } from "mongoose"

const findToken = async (
    query: FilterQuery<Token>,
    options: QueryOptions = {}
) => {
    return TokenModel.findOne(query, options)
        .select("+PasswordResetToken +emailVerifyToken")
        .lean()
        .exec()
}

export default findToken
