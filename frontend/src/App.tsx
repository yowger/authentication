import { BrowserRouter, Route, Routes } from "react-router-dom"

import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import RegisterConfirmPage from "@/pages/confirmation/RegisterConfirmPage"
import ResendVerificationPage from "./pages/auth/ResendVerificationPage"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/resend-verification"
                    element={<ResendVerificationPage />}
                />
                <Route
                    path="/register-confirm"
                    element={<RegisterConfirmPage />}
                />
            </Routes>
        </BrowserRouter>
    )
}
