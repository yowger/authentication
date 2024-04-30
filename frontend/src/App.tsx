import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "@/pages/auth/LoginPage"
import Register from "@/pages/auth/RegisterPage"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}
