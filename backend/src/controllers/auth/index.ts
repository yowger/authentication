import login from "./login"
import logout from "./logout"
import refreshToken from "./refreshToken"
import register from "./register"
import verify from "./verify"

const authController = {
    login,
    logout,
    register,
    refreshToken,
    verify,
}

export default authController
