import BaseError from "../BaseError"

import { ResponseStatus } from "../types"

export default class ServiceUnavailableError extends BaseError {
    constructor(description = "Service unavailable") {
        super(
            "ServiceUnavailableError",
            ResponseStatus.SERVICE_UNAVAILABLE,
            false,
            description
        )
    }
}
