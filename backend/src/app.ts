import { config } from "@/config/env"

import express from "express"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"

import authRouter from "@/routes/auth"
import postRouter from "@/routes/post"
import userRouter from "./routes/user"

import errorHandler from "@/middlewares/errors/errorHandler"

import NotFoundError from "@/classes/errors/NotFoundError"

import { logger } from "./utils/logger"

process.on("uncaughtException", (error) => {
    logger.error("error", error)
})

if (config.error) {
    const { details } = config.error
    const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",")

    throw new Error(`Config validation error: ${message}`)
}

const app = express()

const allowedOriginsSet = new Set(
    process.env.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) || []
)

app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOriginsSet.has(origin) || !origin) {
                callback(null, true)
            } else {
                callback(new Error(`Origin '${origin}' not allowed by CORS`))
            }
        },
        optionsSuccessStatus: 200,
    })
)

app.use(cookieParser())
app.use(express.json({ limit: "5mb" }))
app.use(
    express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
)

app.use(compression())

app.use("/api", authRouter)
app.use("/api/post", postRouter)
app.use("/api/user", userRouter)

app.use((req, res, next) => next(new NotFoundError("Api url not found.")))

app.use(errorHandler)

export default app
