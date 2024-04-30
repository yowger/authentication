import { axios } from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"

export type RegisterData = {
    data: {
        name: string
        email: string
        password: string
    }
}

type Register = {
    message: string
}

export const register = ({ data }: RegisterData): Promise<Register> => {
    return axios.post("/api/register", data)
}

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    })
}
