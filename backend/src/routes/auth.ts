import express from "express"

import authController from "@/controllers/auth"

import authSchema from "@/services/auth/schema"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import validator from "@/middlewares/validator"

const authRouter = express.Router()

authRouter
    .route("/login")
    .post(validator(authSchema.login), asyncHandler(authController.login))
authRouter.route("/logout").post(asyncHandler(authController.logout))
authRouter
    .route("/register")
    .post(validator(authSchema.register), asyncHandler(authController.register))
authRouter.route("/verify/:token").post(asyncHandler(authController.verify))
authRouter.route("/refresh").post(asyncHandler(authController.refreshToken))
authRouter
    .route("/forgot-password")
    .post(asyncHandler(authController.forgotPassword))
authRouter
    .route("/reset-password/:token")
    .post(asyncHandler(authController.resetPassword))
authRouter
    .route("/resend-verification")
    .post(asyncHandler(authController.resendVerification))

export default authRouter
