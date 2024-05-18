import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const LoginPage = lazy(() => import("../pages/LoginPage"))
const RegisterPage = lazy(() => import("../pages/RegisterPage"))
const VerifyEmailPage = lazy(() => import("../pages/VerifyEmailPage"))
const ResendVerificationPage = lazy(
    () => import("../pages/ResendVerificationPage")
)
const RegisterConfirmPage = lazy(() => import("../pages/RegisterConfirmPage"))

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="verify/:id" element={<VerifyEmailPage />} />
            <Route
                path="resend-verification"
                element={<ResendVerificationPage />}
            />
            <Route path="register-confirm" element={<RegisterConfirmPage />} />
        </Routes>
    )
}
