import Joi from "joi"

const authSchema = {
    login: Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        password: Joi.string().required(),
    }),
    register: Joi.object({
        name: Joi.string().required(),
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        password: Joi.string()
            .regex(/^(?=.*[A-Z])(?=.*\d).+$/)
            .message(
                "Password must contain at least one uppercase letter and one number"
            )
            .required(),
    }),
}

export default authSchema
