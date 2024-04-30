import BaseError from "./BaseError"

import { ResponseStatus } from "./types"

export default class NotFoundError extends BaseError {
    constructor(description = "Resource not found") {
        super("NotFoundError", ResponseStatus.NOT_FOUND, true, description)
    }
}
