import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class ServiceUnavailableError extends CustomerError {
    statusCode = ResponseStatus.SERVICE_UNAVAILABLE

    constructor(public message: string = "Service unavailable") {
        super(message)
    }
}
