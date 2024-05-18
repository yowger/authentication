import { useRoutes } from "react-router-dom"

import useAuthContext from "@/features/auth/hooks/useAuthContext"

import ProtectedRoutes from "./ProtectedRoutes"
import PublicRoutes from "./PublicRoutes"
// import CommonRoutes from "./CommonRoutes"

export default function RootRoutes() {
    const { isLoggedIn } = useAuthContext()

    const Routes = isLoggedIn ? ProtectedRoutes : PublicRoutes

    const router = useRoutes([...Routes])

    return router
}
