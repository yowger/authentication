import login from "./login"
import refreshToken from "./refreshToken"
import register from "./register"
import verify from "./verify"

const authController = {
    login,
    register,
    refreshToken,
    verify,
}

export default authController
