import { Link } from "react-router-dom"

export default function RegisterConfirmPage() {
    return (
        <div className="register-confirm">
            <h1>Registration Confirmation</h1>
            <p>
                We've sent a confirmation email to email address . Please click
                the link to verify your account.
            </p>

            <Link to="/resend-verification">
                Click here to send another email verification.
            </Link>
        </div>
    )
}
