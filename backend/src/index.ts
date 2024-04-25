import "module-alias/register"
import "dotenv/config"

import mongoose from "mongoose"

import app from "./app"

import { config } from "@/config/env"

import type { Error as MongoError } from "mongoose"

mongoose.connect(process.env.DATABASE)

mongoose.connection.on("error", (error: MongoError) => {
    console.error(`mongoose connection error: ${error.message}`)
})

app.set("port", process.env.PORT || 8000)

if (config.error) {
    const { details } = config.error
    const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",")

    throw new Error(`Config validation error: ${message}`)
}

const server = app.listen(app.get("port"), () => {
    const address = server.address()

    if (typeof address !== "string") {
        console.log(`[server]: Server listening on port ${address?.port}`)
    }
})
