import UserModel from "@/models/User"

const findUserByEmail = async (email: string) => {
    return UserModel.findOne({ email })
        .select("+name +email +password +verified")
        .lean()
        .exec()
}

export default findUserByEmail
