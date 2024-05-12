import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/reactQuery"

export type LoginData = {
    data: {
        email: string
        password: string
    }
}
export type LoginResponse = {
    accessToken: string
    message: string
}
export const login = ({ data }: LoginData): Promise<LoginResponse> => {
    return axiosPublic.post("/api/login", data, {
        withCredentials: true,
    })
}

type UseLoginOptions = {
    config?: MutateConfig<LoginResponse>
}
export const useLogin = ({ config }: UseLoginOptions = {}) => {
    return useMutation<LoginResponse, AxiosError, LoginData>({
        ...config,
        mutationFn: login,
    })
}
