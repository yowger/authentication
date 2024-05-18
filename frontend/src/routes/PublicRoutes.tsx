import AuthRoutes from "@/features/auth/routes/AuthRoutes"

const PublicRoutes = [
    {
        path: "/*",
        element: <AuthRoutes />,
    },
]

export default PublicRoutes
