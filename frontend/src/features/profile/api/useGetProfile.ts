import { useQuery } from "@tanstack/react-query"

import useAxiosAuth from "@/hooks/useAxiosAuth"

import type { AxiosError } from "axios"
import type { MutateConfig } from "@/lib/reactQuery"

export type Profile = {
    id: string
    name: string
    email: string
    verified: string
    createdAt: Date
}
// export

type UseLoginOptions = {
    config?: MutateConfig<Profile>
}
// todo - refactor
export const useGetProfile = ({ config }: UseLoginOptions = {}) => {
    const axiosPrivate = useAxiosAuth()
    const getProfile = (): Promise<Profile> => {
        return axiosPrivate.get("/api/user/me")
    }

    return useQuery<Profile, AxiosError>({
        queryKey: ["profile", "me"],
        queryFn: getProfile,
        ...config,
    })
}
