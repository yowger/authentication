import RegisterForm from "@/components/forms/RegisterForm"

export default function RegisterPage() {
    const onSuccess = () => {
        console.log("success")
    }

    return (
        <div>
            <RegisterForm onSuccess={onSuccess} />
        </div>
    )
}
