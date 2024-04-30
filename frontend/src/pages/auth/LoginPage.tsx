import LoginForm from "@/components/forms/LoginForm"

export default function LoginPage() {
    const onSuccess = () => {
        console.log("success")
    }

    return (
        <div>
            <LoginForm onSuccess={onSuccess} />
        </div>
    )
}
