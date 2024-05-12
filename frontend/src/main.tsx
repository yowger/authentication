import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "@/lib/reactQuery.ts"

import { AuthContextProvider } from "@/context/authContext"

import App from "@/App.tsx"

import "@/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AuthContextProvider>
    </React.StrictMode>
)
