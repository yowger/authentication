import TokenModel, { Token } from "@/models/Token"

import { UpdateQuery } from "mongoose"

const updateToken = async (token: UpdateQuery<Token>) => {
    return TokenModel.updateOne(
        { user: token.user, type: token.type },
        { $set: { ...token } },
        { new: true }
    )
        .lean()
        .exec()
}

export default updateToken
