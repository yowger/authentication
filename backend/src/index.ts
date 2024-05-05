import "module-alias/register"

import mongoose from "mongoose"

import app from "./app"

import { logger } from "@/utils/logger"

import type { Error as MongoError } from "mongoose"

mongoose.connect(process.env.DATABASE)

mongoose.connection.on("connected", () => {
    logger.info("Mongoose default connection open")
})

mongoose.connection.on("error", (error: MongoError) => {
    logger.error("Mongoose default connection error", error)
})

mongoose.connection.on("disconnected", () => {
    logger.info("Mongoose default connection disconnected")
})

process.on("SIGINT", () => {
    mongoose.connection.close().finally(() => {
        logger.info(
            "Mongoose default connection disconnected through app termination"
        )
        process.exit(0)
    })
})

app.set("port", process.env.PORT || 8000)

const port = app.get("port")

const server = app
    .listen(port, () => {
        const address = server.address()
        if (typeof address !== "string") {
            logger.info(`server running on port: ${address?.port}`)
        }
    })
    .on("error", (error) => {
        logger.error(error)
    })
