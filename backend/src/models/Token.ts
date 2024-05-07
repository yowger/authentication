import { model, Schema } from "mongoose"

import { TOKEN_TYPE } from "@/types/token"
import type { Types } from "mongoose"

export const { EMAIL_VERIFY_TOKEN, PASSWORD_RESET_TOKEN } = TOKEN_TYPE
export type TokenTypeKey =
    | typeof EMAIL_VERIFY_TOKEN
    | typeof PASSWORD_RESET_TOKEN

export interface Token {
    _id: Types.ObjectId
    user: Types.ObjectId
    type: TokenTypeKey
    token: string
    expiresAt: Date
    createdAt?: Date
    updatedAt?: Date
}

const schema = new Schema<Token>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: Schema.Types.String,
        enum: [EMAIL_VERIFY_TOKEN, PASSWORD_RESET_TOKEN],
        required: true,
    },
    token: {
        type: Schema.Types.String,
        required: true,
    },
    expiresAt: {
        type: Schema.Types.Date,
        required: true,
        index: { expires: 0 },
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
        select: false,
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now,
        select: false,
    },
})

schema.index({ user: 1, type: 1 }, { unique: true })

const TokenModel = model<Token>("Token", schema)

export default TokenModel
