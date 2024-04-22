declare namespace Express {
    type ObjectId = import("mongoose").Types.ObjectId

    export interface Request {
        user: ObjectId
    }
}
