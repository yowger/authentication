export default abstract class CustomerError extends Error {
    abstract statusCode: number

    constructor(public message: string, public context?: any) {
        super()
    }
}
