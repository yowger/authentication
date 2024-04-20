import { model, Schema } from "mongoose"

import type { Types } from "mongoose"

// import { roles } from "@/types/roles"

// import type { Roles } from "@/types/roles"

export interface User {
    _id: Types.ObjectId
    name: string
    email: string
    password: string
    verified?: boolean
    // role: Roles
    createdAt?: Date
    updatedAt?: Date
}

const schema = new Schema<User>({
    name: {
        type: Schema.Types.String,
        required: true,
        lowercase: true,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
        select: false,
    },
    // role: {
    //     type: String,
    //     enum: Object.values(roles),
    //     default: roles.noAccess,
    // },
    verified: {
        type: Schema.Types.Boolean,
        default: false,
    },
    createdAt: {
        type: Schema.Types.Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type: Schema.Types.Date,
        required: true,
        select: false,
    },
})

const UserModel = model<User>("User", schema)

export default UserModel
