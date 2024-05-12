import { useParams } from "react-router-dom"

import { useVerifyEmail } from "@/api/auth/useVerifyEmail"
import { invariant } from "@/utils/invariant"
import { useEffect } from "react"

export default function VerifyEmailPage() {
    const { id } = useParams()
    invariant(id)

    const verifyEmailMutation = useVerifyEmail()

    useEffect(() => {
        verifyEmailMutation.mutate({ id })
    }, [])
    // verifyEmailMutation.
    return <div>VerifyEmailPage</div>
}
