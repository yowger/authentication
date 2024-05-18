import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const PostPage = lazy(() => import("../pages/PostPage"))

export default function PostRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostPage />} />
        </Routes>
    )
}
