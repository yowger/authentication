import { model, Schema } from "mongoose"

import type { Types } from "mongoose"

export enum TokenType {
    EMAIL_VERIFY_TOKEN = "EMAIL_VERIFY_TOKEN",
    PASSWORD_RESET_TOKEN = "PASSWORD_RESET_TOKEN",
}

export interface Token {
    _id: Types.ObjectId
    user: Types.ObjectId
    type: TokenType
    token: string
    expiresAt: Date
}

const schema = new Schema<Token>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: Schema.Types.String,
        enum: Object.values(TokenType),
        required: true,
    },
    token: {
        type: Schema.Types.String,
        required: true,
    },
    expiresAt: {
        type: Schema.Types.Date,
        index: { expires: 0 },
    },
})

schema.index({ user: 1, type: 1 }, { unique: true })

const TokenModel = model<Token>("Token", schema)

export default TokenModel
