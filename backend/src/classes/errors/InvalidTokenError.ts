import BadRequestError from "./BadRequestError"

export default class InvalidTokenError extends BadRequestError {
    constructor(public message: string = "Invalid token.") {
        super(message)
    }
}
