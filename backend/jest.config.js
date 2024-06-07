/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    rootDir: ".",
    roots: ["./src"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
}
