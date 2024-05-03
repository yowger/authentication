import UserModel from "@/models/User"

import type { Types } from "mongoose"

const findUserById = async (id: Types.ObjectId) => {
    return UserModel.findById(id).select("+id +name +email +verified +createdAt").lean().exec()
}

export default findUserById
