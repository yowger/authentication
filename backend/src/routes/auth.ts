import express from "express"

import authController from "@/controllers/auth"

import authSchema from "@/services/auth/schema"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import validator from "@/middlewares/validator"
import {
    loginLimiter,
    logoutLimiter,
    forgotPasswordLimiter,
    refreshLimiter,
    registerLimiter,
    resendVerificationLimiter,
    resetPasswordLimiter,
    verifyLimiter,
} from "@/middlewares/limiter"

const authRouter = express.Router()

authRouter
    .route("/login")
    .post(
        loginLimiter,
        validator(authSchema.login),
        asyncHandler(authController.login)
    )
authRouter
    .route("/logout")
    .post(logoutLimiter, asyncHandler(authController.logout))
authRouter
    .route("/register")
    .post(
        registerLimiter,
        validator(authSchema.register),
        asyncHandler(authController.register)
    )
authRouter
    .route("/verify/:token")
    .post(verifyLimiter, asyncHandler(authController.verify))
authRouter
    .route("/refresh")
    .post(refreshLimiter, asyncHandler(authController.refreshToken))
authRouter
    .route("/forgot-password")
    .post(forgotPasswordLimiter, asyncHandler(authController.forgotPassword))
authRouter
    .route("/reset-password/:token")
    .post(resetPasswordLimiter, asyncHandler(authController.resetPassword))
authRouter
    .route("/resend-verification")
    .post(
        resendVerificationLimiter,
        asyncHandler(authController.resendVerification)
    )

export default authRouter
