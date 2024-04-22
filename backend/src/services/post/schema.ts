import Joi from "joi"

const postSchema = {
    create: Joi.object({
        title: Joi.string().trim().required().min(3).max(255),
        content: Joi.string().trim().required().min(3),
    }),
}

export default postSchema
