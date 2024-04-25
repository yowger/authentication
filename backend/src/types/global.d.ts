import { EnvVars } from "@/config/env"

export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvVars {}
    }
}
