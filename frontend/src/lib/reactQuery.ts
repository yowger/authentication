import { QueryClient } from "@tanstack/react-query"

import type { AxiosError } from "axios"
import { DefaultOptions, UseMutationOptions } from "@tanstack/react-query"

const queryConfig: DefaultOptions = {
    queries: {
        refetchOnWindowFocus: false,
        retry: false,
    },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type MutateConfig<Response, TVariables = unknown> = UseMutationOptions<
    Response,
    AxiosError,
    TVariables,
    unknown
>
