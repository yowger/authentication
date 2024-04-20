import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class UnauthorizedError extends CustomerError {
    statusCode = ResponseStatus.UNAUTHORIZED

    constructor(public message: string = "Unauthorized") {
        super(message)
    }
}
