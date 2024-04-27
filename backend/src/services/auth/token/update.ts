import TokenModel, { Token } from "@/models/Token"

import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose"

const updateToken = async (
    query: FilterQuery<Token>,
    token: UpdateQuery<Token>,
    options: QueryOptions = {}
) => {
    return TokenModel.findOneAndUpdate(query, token, { new: true, ...options })
        .lean()
        .exec()
}

export default updateToken
