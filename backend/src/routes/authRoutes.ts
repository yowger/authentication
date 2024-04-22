import express from "express"

import authController from "@/controllers/auth"

import authSchema from "@/controllers/auth/schema"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import validator from "@/middlewares/validator"

const router = express.Router()

router
    .route("/login")
    .post(validator(authSchema.login), asyncHandler(authController.login))
router
    .route("/register")
    .post(validator(authSchema.register), asyncHandler(authController.register))
router.route("/verify/:token").get(asyncHandler(authController.verify))
router.route("/refresh").get(asyncHandler(authController.refreshToken))

export default router
