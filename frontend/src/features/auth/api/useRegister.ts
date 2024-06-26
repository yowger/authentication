import { useMutation } from "@tanstack/react-query"

import { axiosPublic } from "@/lib/axios"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/reactQuery"

export type RegisterData = {
    data: {
        name: string
        email: string
        password: string
    }
}
export type RegisterResponse = {
    message: string
}
export const register = ({ data }: RegisterData): Promise<RegisterResponse> => {
    return axiosPublic.post("/api/register", data)
}

type UseRegisterOptions = {
    config?: MutateConfig<RegisterResponse>
}
export const useRegister = ({ config }: UseRegisterOptions = {}) => {
    return useMutation<RegisterResponse, AxiosError, RegisterData>({
        ...config,
        mutationFn: register,
    })
}
