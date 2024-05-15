import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/reactQuery"
import useAuthContext from "@/hooks/useAuthContext"

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
            console.log("settings auth")
            setAuth({ accessToken: refreshAuthData.accessToken })
        },
        ...config,
        mutationFn: refreshAuth,
    })
}
