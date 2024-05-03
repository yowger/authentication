import TokenModel, { Token } from "@/models/Token"

const createToken = async (token: Omit<Token, "_id">) => {
    const createdToken = await TokenModel.create(token)

    return createdToken.toObject()
}

export default createToken
