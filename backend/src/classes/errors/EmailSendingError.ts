import CustomerError from "./CustomError"

import { ResponseStatus } from "./types"

export default class EmailSendingError extends CustomerError {
    statusCode = ResponseStatus.INTERNAL_SERVER_ERROR

    constructor(
        public message: string = "There was a problem sending the email."
    ) {
        super(message)
    }
}
