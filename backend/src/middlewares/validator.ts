import Joi from "joi"

import BadRequestError from "@/handler/subtypes/BadRequestError"

import type { NextFunction, Request, Response } from "express"

export enum ValidationSource {
    body = "body",
}

const validator =
    (schema: Joi.AnySchema, source: ValidationSource = ValidationSource.body) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req[source])

            if (!error) return next()

            const { details } = error
            const message = details
                .map((i) => i.message.replace(/['"]+/g, ""))
                .join(",")

            throw new BadRequestError(message)
        } catch (error) {
            next(error)
        }
    }

export default validator
