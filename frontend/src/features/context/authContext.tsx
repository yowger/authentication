import { createContext, useState } from "react"

type AuthContextType = {
    auth: {
        accessToken: string
    }
    setAuth: React.Dispatch<React.SetStateAction<{ accessToken: string }>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
    const [auth, setAuth] = useState<{ accessToken: string }>({
        accessToken: "",
    })

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
