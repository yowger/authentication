import { useEffect } from "react"

import { axiosAuth } from "@/lib/axios"

import { refreshAuth } from "@/api/auth/useRefreshAuth"

import useAuthContext from "@/hooks/useAuthContext"

const useAxiosAuth = () => {
    const { auth, setAuth } = useAuthContext()

    useEffect(() => {
        const requestInterceptor = axiosAuth.interceptors.request.use(
            async (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers.Authorization = `Bearer ${auth.accessToken}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        const responseInterceptor = axiosAuth.interceptors.response.use(
            (response) => {
                return response.data
            },
            async (error) => {
                const originalRequest = error.config

                if (error.response && error.response.status === 403) {
                    const newAccessToken = await refreshAuth()
                    setAuth({ accessToken: newAccessToken })

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                    return axiosAuth(originalRequest)
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor)
            axiosAuth.interceptors.response.eject(responseInterceptor)
        }
    }, [auth.accessToken])
}

export default useAxiosAuth
