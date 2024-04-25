import dotenv from "dotenv"
import joi from "joi"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../.env") })

export type EnvVars = {
    CLIENT_URL: string
    SERVER_URL: string
    NODE_ENV: "production" | "development"
    DATABASE: string
    ALLOWED_ORIGINS: string
    EMAIL_HOST: string
    EMAIL_PORT: number
    EMAIL_USER: string
    EMAIL_PASSWORD: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    EMAIL_TOKEN_SECRET: string
    FORGOT_PASSWORD_SECRET: string
    ACCESS_TOKEN_EXPIRY: number
    REFRESH_TOKEN_EXPIRY: number
    EMAIL_TOKEN_EXPIRY: number
    FORGOT_PASSWORD_EXPIRY: number
}

const envSchema = joi.object<EnvVars>().keys({
    CLIENT_URL: joi.string().required(),
    SERVER_URL: joi.string().required(),
    NODE_ENV: joi.string().valid("production", "development").required(),
    DATABASE: joi.string().required(),
    ALLOWED_ORIGINS: joi.string().required(),
    EMAIL_HOST: joi.string().required(),
    EMAIL_PORT: joi.number().positive().required(),
    EMAIL_USER: joi.string().required(),
    EMAIL_PASSWORD: joi.string().required(),
    ACCESS_TOKEN_SECRET: joi.string().required(),
    REFRESH_TOKEN_SECRET: joi.string().required(),
    EMAIL_TOKEN_SECRET: joi.string().required(),
    FORGOT_PASSWORD_SECRET: joi.string().required(),
    ACCESS_TOKEN_EXPIRY: joi.number().positive().required(),
    REFRESH_TOKEN_EXPIRY: joi.number().positive().required(),
    EMAIL_TOKEN_EXPIRY: joi.number().positive().required(),
    FORGOT_PASSWORD_EXPIRY: joi.number().positive().required(),
})

export const config = envSchema.validate(process.env, { allowUnknown: true })
