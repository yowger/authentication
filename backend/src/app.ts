import express from "express"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"

import authRouter from "@/routes/authRoutes"

import errorHandler from "@/middlewares/errors/errorHandler"

import NotFoundError from "@/classes/errors/NotFoundError"

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

app.use((req, res, next) => next(new NotFoundError("Api url not found.")))

app.use(errorHandler)

export default app
