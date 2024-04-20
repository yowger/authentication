import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class NotFoundError extends CustomerError {
    statusCode = ResponseStatus.NOT_FOUND

    constructor(public message: string = "Resource not found.") {
        super(message)
    }
}
