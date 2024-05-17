import { useParams } from "react-router-dom"

import { useVerifyEmail } from "@/features/auth/api/useVerifyEmail"
import { invariant } from "@/utils/invariant"
import { useEffect } from "react"

export default function VerifyEmailPage() {
    const { id } = useParams()
    invariant(id)

    const verifyEmailMutation = useVerifyEmail()

    useEffect(() => {
        verifyEmailMutation.mutate({ id })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // verifyEmailMutation.
    return <div>VerifyEmailPage</div>
}
