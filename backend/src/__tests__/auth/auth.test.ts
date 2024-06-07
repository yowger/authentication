import mongoose from "mongoose"
import supertest from "supertest"

import app from "@/app"
// import createUser from "../../src/services/user/create"

describe("Auth", () => {
    describe("User registration", () => {
        describe("given the username and password are valid", () => {
            it("should return a message", async () => {
                const userId = new mongoose.Types.ObjectId().toString()

                const registerPayload = {
                    _id: userId,
                    name: "John die",
                    email: "johndoe@gmail.com",
                    password: "password123",
                }

                const userInput = {
                    name: "John doe",
                    email: "johndoe@gmail.com",
                    password: "password123",
                }

                // const createUserMock = jest
                //     .fn(createUser)
                //     // @ts-ignore
                //     .mockReturnValueOnce(userPayload)

                const { statusCode, body } = await supertest(app)
                    .post("/api/register")
                    .send(userInput)

                console.log("body", body)
                console.log("code", statusCode)
            })

            // it("", () => {})
        })
    })
})
