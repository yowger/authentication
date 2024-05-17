import { useNavigate } from "react-router-dom"

import LoginForm from "@/features/auth/components/forms/LoginForm"

export default function LoginPage() {
    const navigate = useNavigate()

    const onSuccess = () => {
        return navigate("/")
    }

    return (
        <div>
            <LoginForm onSuccess={onSuccess} />
        </div>
    )
}
