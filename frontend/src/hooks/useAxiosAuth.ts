import { useEffect } from "react"

import { axiosAuth } from "@/lib/axios"

import { useRefreshAuth } from "@/api/auth/useRefreshAuth"

import useAuthContext from "@/hooks/useAuthContext"

const useAxiosAuth = () => {
    const { auth } = useAuthContext()
    const refreshAuthMutation = useRefreshAuth()

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

                if (
                    error.response &&
                    error.response.status === 403 &&
                    !refreshAuthMutation.isPending
                ) {
                    try {
                        const newAccessToken = await new Promise(
                            (resolve, reject) => {
                                refreshAuthMutation.mutate(undefined, {
                                    onSuccess: (data) => {
                                        resolve(data.accessToken)
                                    },
                                    onError: (error) => {
                                        reject(error)
                                    },
                                })
                            }
                        )

                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                        return axiosAuth(originalRequest)
                    } catch (refreshError) {
                        return Promise.reject(refreshError)
                    }
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor)
            axiosAuth.interceptors.response.eject(responseInterceptor)
        }
    }, [auth.accessToken, refreshAuthMutation])

    return axiosAuth
}

export default useAxiosAuth
