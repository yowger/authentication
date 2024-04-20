import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class BadRequestError extends CustomerError {
    statusCode = ResponseStatus.BAD_REQUEST

    constructor(public message: string = "Bad Request.") {
        super(message)
    }
}
