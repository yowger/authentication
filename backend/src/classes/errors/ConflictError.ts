import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class ConflictError extends CustomerError {
    statusCode = ResponseStatus.CONFLICT

    constructor(public message: string = "Conflict.") {
        super(message)
    }
}
