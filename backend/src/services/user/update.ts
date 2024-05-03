import UserModel, { User } from "@/models/User"

import { UpdateQuery } from "mongoose"

const updateUser = async (user: UpdateQuery<User>) => {
    const now = new Date()

    user.updatedAt = now

    return UserModel.updateOne(
        { _id: user._id },
        { $set: { ...user } },
        { new: true }
    )
        .lean()
        .exec()
}

export default updateUser
