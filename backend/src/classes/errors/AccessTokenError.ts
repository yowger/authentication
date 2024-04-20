import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class AccessTokenError extends CustomerError {
    statusCode = ResponseStatus.UNAUTHORIZED

    constructor(public message: string = "Missing access token") {
        super(message)
    }
}
