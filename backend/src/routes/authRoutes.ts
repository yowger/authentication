import express from "express"

import authController from "@/controllers/auth"

import authSchema from "@/controllers/auth/schema"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import validator from "@/middlewares/validator"

const router = express.Router()

// router
//     .route("/login")
//     .post(validator(schema.login), asyncHandler(userAuthController.login))
// router.route("/logout").post(asyncHandler(userAuthController.logout))
router
    .route("/register")
    .post(validator(authSchema.register), asyncHandler(authController.register))
router.route("/verify/:token").get(asyncHandler(authController.verify))
//     .post(validator(schema.register), asyncHandler(userAuthController.register))

export default router
