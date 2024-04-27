import TokenModel from "@/models/Token"

import { Types } from "mongoose"

const removeToken = async (id: Types.ObjectId) => {
    return TokenModel.findByIdAndDelete(id).lean().exec()
}

export default removeToken
