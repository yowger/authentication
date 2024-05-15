import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useRefreshAuth } from "@/api/auth/useRefreshAuth"
import { useEffect } from "react"

export default function PersisAuth() {
    const location = useLocation()
    const refreshAuthMutation = useRefreshAuth()

    useEffect(() => {
        refreshAuthMutation.mutate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (refreshAuthMutation.isError) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (refreshAuthMutation.isPending) {
        return <div>Loading...</div>
    }

    return <Outlet />
}
