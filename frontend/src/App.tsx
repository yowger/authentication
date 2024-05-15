import { BrowserRouter, Route, Routes } from "react-router-dom"

import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import RegisterConfirmPage from "@/pages/auth/RegisterConfirmPage"
import ResendVerificationPage from "./pages/auth/ResendVerificationPage"
import VerifyEmailPage from "./pages/auth/VerifyEmailPage"
import PersisAuth from "./components/auth/PersisAuth"
import ProfilePage from "./pages/profile/ProfilePage"

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
                <Route element={<PersisAuth />}>
                    <Route path="/" element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
