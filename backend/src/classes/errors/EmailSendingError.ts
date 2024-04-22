import InternalServerError from "./InternalServerError"

export default class EmailSendingError extends InternalServerError {
    constructor(public message: string = "Invalid or missing token.") {
        super(message)
    }
}
