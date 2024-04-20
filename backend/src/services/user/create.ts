import UserModel, { User } from "@/models/User"

const createUser = async (user: Omit<User, "_id">) => {
    const now = new Date()

    user.createdAt = user.updatedAt = now

    const createdUser = await UserModel.create(user)

    return createdUser.toObject()
}

export default createUser
