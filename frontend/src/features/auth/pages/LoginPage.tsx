import { useLocation, useNavigate } from "react-router-dom"

import LoginForm from "@/features/auth/components/forms/LoginForm"

export default function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const message = location.state?.message

    const onSuccess = () => {
        const origin = location.state?.from.pathname || "/"

        return navigate(origin)
    }

    return (
        <div>
            {message && <p>{message}</p>}
            <LoginForm onSuccess={onSuccess} />
        </div>
    )
}
