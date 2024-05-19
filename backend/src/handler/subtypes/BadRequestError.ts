import BaseError from "../BaseError"

import { ResponseStatus } from "../types"

export default class BadRequestError extends BaseError {
    constructor(description = "Bad request") {
        super("BadRequestError", ResponseStatus.BAD_REQUEST, true, description)
    }
}
