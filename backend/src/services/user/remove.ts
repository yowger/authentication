import UserModel from "@/models/User"

import { Types } from "mongoose"

const updateUser = async (id: Types.ObjectId) => {
    return UserModel.findByIdAndDelete(id).lean().exec()
}

export default updateUser
