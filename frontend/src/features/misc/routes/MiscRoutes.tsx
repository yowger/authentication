import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const AboutPage = lazy(() => import("../pages/AboutPage"))

export default function MiscRoutes() {
    return (
        <Routes>
            <Route path="about" element={<AboutPage />} />
        </Routes>
    )
}
