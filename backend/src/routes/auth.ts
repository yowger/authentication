import express from "express"

import authController from "@/controllers/auth"

import authSchema from "@/services/auth/schema"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import validator from "@/middlewares/validator"

const router = express.Router()

router
    .route("/login")
    .post(validator(authSchema.login), asyncHandler(authController.login))
router.route("/logout").post(asyncHandler(authController.logout))
router
    .route("/register")
    .post(validator(authSchema.register), asyncHandler(authController.register))
router.route("/verify/:token").get(asyncHandler(authController.verify))
router.route("/refresh").post(asyncHandler(authController.refreshToken))
router
    .route("/forgot-password")
    .post(asyncHandler(authController.forgotPassword))
router
    .route("/reset-password/:token")
    .post(asyncHandler(authController.resetPassword))

export default router
