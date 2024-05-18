import AuthRoutes from "@/features/auth/routes/AuthRoutes"

const PublicRoutes = [
    {
        path: "/auth/*",
        element: <AuthRoutes />,
    },
]

export default PublicRoutes
