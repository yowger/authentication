import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/reactQuery"

export type RefreshAuthResponse = string
export const refreshAuth = (): Promise<RefreshAuthResponse> => {
    return axiosPublic.post("/api/refresh", null, {
        withCredentials: true,
    })
}

type UseRefreshAuthOptions = {
    config?: MutateConfig<RefreshAuthResponse>
}
export const useRefreshAuth = ({ config }: UseRefreshAuthOptions = {}) => {
    return useMutation<RefreshAuthResponse, AxiosError>({
        ...config,
        mutationFn: refreshAuth,
    })
}
// todo - set auth state if success
