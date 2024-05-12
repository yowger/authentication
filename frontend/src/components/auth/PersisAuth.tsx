import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useRefreshAuth } from "@/api/auth/useRefreshAuth"
import { useEffect } from "react"

export default function PersisAuth() {
    const location = useLocation()
    const refreshAuthMutation = useRefreshAuth()
    console.log("🚀 ~ PersisAuth ~ refreshAuthMutation:", refreshAuthMutation)

    useEffect(() => {
        refreshAuthMutation.mutate()
    }, [])

    if (refreshAuthMutation.isError) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (refreshAuthMutation.isPending) {
        return <div>Loading...</div>
    }

    return <Outlet />
}
