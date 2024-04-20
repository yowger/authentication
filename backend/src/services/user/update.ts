import UserModel, { User } from "@/models/User"

const updateUser = async (user: User) => {
    const now = new Date()

    user.updatedAt = now

    return UserModel.findByIdAndUpdate(user._id, user, { new: true })
        .lean()
        .exec()
}

export default updateUser
