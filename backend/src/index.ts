import "module-alias/register"

import mongoose from "mongoose"

import app from "./app"

import { logger } from "@/utils/logger"

import { config, validatedEnv } from "@/config/config"

import type { Error as MongoError } from "mongoose"

if (validatedEnv.error) {
    const { details } = validatedEnv.error
    const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",")

    throw new Error(`Critical environment variable missing: ${message}`)
}

mongoose.connect(config.DATABASE)
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

app.set("port", config.PORT || 8000)
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
