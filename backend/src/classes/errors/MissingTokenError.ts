import BadRequestError from "./BadRequestError"

export default class MissingTokenError extends BadRequestError {
    constructor(public message: string = "Missing token.") {
        super(message)
    }
}
