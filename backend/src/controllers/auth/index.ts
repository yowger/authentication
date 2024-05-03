import login from "./login"
import logout from "./logout"
import refreshToken from "./refreshToken"
import register from "./register"
import verify from "./verify"
import forgotPassword from "./forgotPassword"
import resetPassword from "./resetPassword"
import resendVerification from "./resendVerification"

const authController = {
    login,
    logout,
    register,
    refreshToken,
    verify,
    forgotPassword,
    resetPassword,
    resendVerification,
}

export default authController
