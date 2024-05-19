import BaseError from "../BaseError"

import { ResponseStatus } from "../types"

export default class InternalServerError extends BaseError {
    constructor(description = "Internal server error") {
        super(
            "InternalServerError",
            ResponseStatus.INTERNAL_SERVER_ERROR,
            false,
            description
        )
    }
}
