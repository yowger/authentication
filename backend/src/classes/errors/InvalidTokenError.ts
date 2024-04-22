import BadRequestError from "./BadRequestError"

export default class InvalidTokenError extends BadRequestError {
    constructor(public message: string = "Invalid or expired token.") {
        super(message)
    }
}
