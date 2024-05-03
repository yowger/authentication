import { model, Schema } from "mongoose"

import type { Types } from "mongoose"

export interface Post {
    _id: Types.ObjectId
    title: string
    content: string
    author: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

const schema = new Schema<Post>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
})

const PostModel = model<Post>("Post", schema)

export default PostModel
