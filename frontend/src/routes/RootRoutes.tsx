import { useRoutes } from "react-router-dom"

import ProtectedRoutes from "./ProtectedRoutes"
import PublicRoutes from "./PublicRoutes"
import CommonRoutes from "./CommonRoutes"

export default function RootRoutes() {
    const router = useRoutes([
        ...PublicRoutes,
        ...ProtectedRoutes,
        ...CommonRoutes,
    ])

    return router
}
