import Axios from "axios"

import type { AxiosError } from "axios"

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const axiosPublic = Axios.create({
    baseURL: SERVER_URL,
})
axiosPublic.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export const axiosAuth = Axios.create({
    baseURL: SERVER_URL,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true,
})
