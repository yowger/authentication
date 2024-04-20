import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class ForbiddenError extends CustomerError {
    statusCode = ResponseStatus.FORBIDDEN

    constructor(public message: string = "Access denied.") {
        super(message)
    }
}
