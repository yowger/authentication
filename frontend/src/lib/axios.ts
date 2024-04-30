import Axios from "axios"

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const axios = Axios.create({
    baseURL: SERVER_URL,
})
axios.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const axiosPrivate = Axios.create({
    baseURL: SERVER_URL,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    withCredentials: true,
})
