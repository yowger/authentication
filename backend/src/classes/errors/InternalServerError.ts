import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class InternalServerError extends CustomerError {
    statusCode = ResponseStatus.INTERNAL_SERVER_ERROR

    constructor(public message: string = "Internal server error.") {
        super(message)
    }
}
