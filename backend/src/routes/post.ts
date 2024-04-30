import express from "express"

import postController from "@/controllers/post"

import postSchema from "@/services/post/schema"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import authenticate from "@/middlewares/authenticate"
import validator from "@/middlewares/validator"

const postRouter = express.Router()

postRouter
    .route("/")
    .post(
        authenticate,
        validator(postSchema.create),
        asyncHandler(postController.create)
    )

export default postRouter
