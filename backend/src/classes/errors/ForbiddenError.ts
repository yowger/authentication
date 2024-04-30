import BaseError from "./BaseError"

import { ResponseStatus } from "./types"

export default class ForbiddenError extends BaseError {
    constructor(description = "Access forbidden") {
        super("ForbiddenError", ResponseStatus.FORBIDDEN, true, description)
    }
}
