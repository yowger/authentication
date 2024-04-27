import UserModel, { User } from "@/models/User"

import { Types, UpdateQuery } from "mongoose"

const updateUserById = async (
    userId: Types.ObjectId,
    user: UpdateQuery<User>
) => {
    const now = new Date()

    user.updatedAt = now

    return UserModel.findByIdAndUpdate(user._id, user, { new: true })
        .lean()
        .exec()
}

export default updateUserById
