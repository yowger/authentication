import React, { createContext, useState, ReactNode } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

type AuthContextType = {
    auth: { accessToken: string }
    setAuth: React.Dispatch<React.SetStateAction<{ accessToken: string }>>
    isLoggedIn: boolean
    setAuthStatus: (accessToken: string) => void
    removeAuthStatus: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<{ accessToken: string }>({
        accessToken: "",
    })

    const [isLoggedIn, setIsLoggedIn, removeIsLoggedIn] =
        useLocalStorage<boolean>("isLoggedIn", false)

    const setAuthStatus = (accessToken: string) => {
        setAuth({ accessToken })
        setIsLoggedIn(true)
    }

    const removeAuthStatus = () => {
        setAuth({ accessToken: "" })
        removeIsLoggedIn()
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                isLoggedIn,
                setAuthStatus,
                removeAuthStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
