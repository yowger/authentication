import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useRefreshAuth } from "@/api/auth/useRefreshAuth"
import { useEffect } from "react"

export default function PersisAuth() {
    const location = useLocation()
    const { mutate, isPending, isError, isSuccess } = useRefreshAuth()

    useEffect(() => {
        mutate()
    }, [mutate])

    if (isError) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isSuccess) {
        return <Outlet />
    }
}
