import express from "express"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"
// import expressListEndpoints from "express-list-endpoints"

import authRouter from "@/routes/auth"
import postRouter from "@/routes/post"
import userRouter from "@/routes/user"

import errorHandler from "@/middlewares/errors/errorHandler"

import NotFoundError from "@/handler/subtypes/NotFoundError"

import { logger } from "@/utils/logger"

import { config } from "@/config/config"

process.on("uncaughtException", (error) => {
    logger.error("error", error)
})

const app = express()

const allowedOriginsSet = new Set(
    config.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) || []
)

app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOriginsSet.has(origin) || !origin) {
                callback(null, true)
            } else {
                const errorMessage = `Origin '${origin}' not allowed by CORS`
                logger.error("cors_disallowed_origin", errorMessage)

                callback(new Error(errorMessage))
            }
        },
        credentials: true,
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

// testing - list all endpoints
// const endpoints = expressListEndpoints(app);
// console.log(endpoints);

export default app
