import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"

import RootRoutes from "./routes/RootRoutes"

export default function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <RootRoutes />
            </BrowserRouter>
        </Suspense>
    )
}
