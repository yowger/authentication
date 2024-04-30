import BaseError from "./BaseError"

import { ResponseStatus } from "./types"

export default class UnauthorizedError extends BaseError {
    constructor(description = "Unauthorized access") {
        super(
            "UnauthorizedError",
            ResponseStatus.UNAUTHORIZED,
            true,
            description
        )
    }
}
