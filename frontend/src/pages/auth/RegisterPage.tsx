import { useNavigate } from "react-router-dom"

import RegisterForm from "@/components/forms/RegisterForm"

export default function RegisterPage() {
    const navigate = useNavigate()

    const onSuccess = () => {
        navigate(`/register-confirm`)
    }

    return (
        <div>
            <RegisterForm onSuccess={onSuccess} />
        </div>
    )
}
