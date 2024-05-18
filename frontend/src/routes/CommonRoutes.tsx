import { lazy } from "react"

const AboutPage = lazy(() => import("@/features/misc/pages/AboutPage"))

const CommonRoutes = [
    {
        path: "/about",
        element: <AboutPage />,
    },
    { path: "*", element: <p>Page not found</p> },
]

export default CommonRoutes
