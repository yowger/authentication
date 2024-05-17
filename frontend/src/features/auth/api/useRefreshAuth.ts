import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios"

import useAuthContext from "@/hooks/useAuthContext"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/reactQuery"

export type RefreshAuthResponse = {
    accessToken: string
}
export const refreshAuth = (): Promise<RefreshAuthResponse> => {
    return axiosPublic.post("/api/refresh", null, {
        withCredentials: true,
    })
}

type UseRefreshAuthOptions = {
    config?: MutateConfig<RefreshAuthResponse>
}
export const useRefreshAuth = ({ config }: UseRefreshAuthOptions = {}) => {
    const { setAuth } = useAuthContext()

    return useMutation<RefreshAuthResponse, AxiosError>({
        onSuccess: (refreshAuthData) => {
            setAuth({ accessToken: refreshAuthData.accessToken })
        },
        ...config,
        mutationFn: refreshAuth,
    })
}
