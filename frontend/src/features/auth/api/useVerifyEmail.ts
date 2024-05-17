import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/reactQuery"

export type VerifyEmailData = {
    id: string
}
export type VerifyResponse = {
    message: string
}
export const verifyEmail = ({
    id,
}: VerifyEmailData): Promise<VerifyResponse> => {
    return axiosPublic.post(`/api/verify/${id}`)
}

type UseVerifyEmailOptions = {
    config?: MutateConfig<VerifyResponse>
}
export const useVerifyEmail = ({ config }: UseVerifyEmailOptions = {}) => {
    return useMutation<VerifyResponse, AxiosError, VerifyEmailData>({
        ...config,
        mutationFn: verifyEmail,
    })
}
