import "module-alias/register"
import "dotenv/config"

import mongoose from "mongoose"

import app from "./app"

import type { Error } from "mongoose"

mongoose.connect(process.env.DATABASE)

mongoose.connection.on("error", (error: Error) => {
    console.error(`mongoose connection error: ${error.message}`)
})

app.set("port", process.env.PORT || 8000)

const server = app.listen(app.get("port"), () => {
    const address = server.address()

    if (typeof address !== "string") {
        console.log(`[server]: Server listening on port ${address?.port}`)
    }
})
