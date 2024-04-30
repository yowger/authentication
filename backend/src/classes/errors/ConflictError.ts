import BaseError from "./BaseError"

import { ResponseStatus } from "./types"

export default class ConflictError extends BaseError {
    constructor(description = "Resource conflict") {
        super("ConflictError", ResponseStatus.CONFLICT, true, description)
    }
}
