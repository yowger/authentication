import BaseError from "../BaseError"

import { ResponseStatus } from "../types"

export default class EmailSendingError extends BaseError {
    constructor(description = "Failed to send email") {
        super(
            "EmailSendingError",
            ResponseStatus.INTERNAL_SERVER_ERROR,
            false,
            description
        )
    }
}
