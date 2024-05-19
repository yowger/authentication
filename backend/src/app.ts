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

import corsOptions from "@/config/cors"

process.on("uncaughtException", (error) => {
    logger.error("error", error)
})

const app = express()

app.use(cors(corsOptions))

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
