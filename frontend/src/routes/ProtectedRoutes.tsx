import { lazy } from "react"

import PostRoutes from "@/features/post/routes/PostRoutes"
const PersistAuth = lazy(() => import("@/features/auth/components/PersistAuth"))
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"))

const ProtectedRoutes = [
    {
        path: "/*",
        element: <PersistAuth />,
        children: [
            { path: "", element: <ProfilePage /> },
            { path: "post/*", element: <PostRoutes /> },
            { path: "*", element: <p>Page not found</p> },
        ],
    },
]

export default ProtectedRoutes
