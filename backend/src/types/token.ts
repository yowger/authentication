export const TOKEN_TYPE = {
    ACCESS_TOKEN: "ACCESS_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    EMAIL_VERIFY_TOKEN: "EMAIL_VERIFY_TOKEN",
    PASSWORD_RESET_TOKEN: "PASSWORD_RESET_TOKEN",
} as const

export type TokenType = keyof typeof TOKEN_TYPE
