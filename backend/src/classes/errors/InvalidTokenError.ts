import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class InvalidTokenError extends CustomerError {
    statusCode = ResponseStatus.UNAUTHORIZED

    constructor(public message: string = "Invalid or expired token") {
        super(message)
    }
}
