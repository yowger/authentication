import express from "express"

import postController from "@/controllers/post"

import postSchema from "@/services/post/schema"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import authenticate from "@/middlewares/authenticate"
import validator from "@/middlewares/validator"

const router = express.Router()

router
    .route("/")
    .post(
        authenticate,
        validator(postSchema.create),
        asyncHandler(postController.create)
    )

export default router
