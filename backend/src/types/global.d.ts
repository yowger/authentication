import { EnvVars } from "@/config/env"

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvVars {}
    }
}

export {}
