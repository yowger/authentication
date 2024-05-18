import { BrowserRouter, Route, Routes } from "react-router-dom"

import LoginPage from "@/features/auth/pages/LoginPage"
import RegisterPage from "@/features/auth/pages/RegisterPage"
import RegisterConfirmPage from "@/features/auth/pages/RegisterConfirmPage"
import ResendVerificationPage from "./features/auth/pages/ResendVerificationPage"
import VerifyEmailPage from "./features/auth/pages/VerifyEmailPage"
import ProtectedRoutes from "./features/auth/components/ProtectedRoutes"
import ProfilePage from "./features/profile/page/ProfilePage"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify/:id" element={<VerifyEmailPage />} />
                <Route
                    path="/resend-verification"
                    element={<ResendVerificationPage />}
                />
                <Route
                    path="/register-confirm"
                    element={<RegisterConfirmPage />}
                />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<ProfilePage />} />
                    <Route path="/post" element={<p>post</p>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
