import BadRequestError from "./BadRequestError"

export default class ExpiredTokenError extends BadRequestError {
    constructor(public message: string = "Expired token.") {
        super(message)
    }
}
