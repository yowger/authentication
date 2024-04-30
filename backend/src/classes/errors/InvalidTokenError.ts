import BaseError from "./BaseError"

import { ResponseStatus } from "./types"

export default class InvalidTokenError extends BaseError {
    constructor(description = "Invalid token provided") {
        super(
            "InvalidTokenError",
            ResponseStatus.UNAUTHORIZED,
            true,
            description
        )
    }
}
