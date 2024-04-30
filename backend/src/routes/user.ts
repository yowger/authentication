import express from "express"

import userController from "@/controllers/user"

import asyncHandler from "@/middlewares/errors/asyncHandler"
import authenticate from "@/middlewares/authenticate"

const userRouter = express.Router()

userRouter.route("/me").get(authenticate, asyncHandler(userController.read))

export default userRouter
