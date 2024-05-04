import { useMutation } from "@tanstack/react-query"

import { axios } from "@/lib/axios"

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
    return axios.post("/api/register", data)
}

export const useRegister = (config?: MutateConfig<RegisterResponse>) => {
    return useMutation<RegisterResponse, AxiosError, RegisterData>({
        mutationFn: register,
        ...config,
    })
}
