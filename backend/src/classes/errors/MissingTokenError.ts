import BaseError from "./BaseError"

import { ResponseStatus } from "./types"

export default class MissingTokenError extends BaseError {
    constructor(description = "Token is missing") {
        super(
            "MissingTokenError",
            ResponseStatus.UNAUTHORIZED,
            true,
            description
        )
    }
}
