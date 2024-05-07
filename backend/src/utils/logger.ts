import {
    createLogger,
    transports,
    format,
    addColors,
    Logger as WinstonLogger,
} from "winston"
import DailyRotateFile from "winston-daily-rotate-file"
import fs from "fs"

const logDir = process.env.LOG_DIR
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const config = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: "white",
        debug: "green",
        info: "green",
        warn: "yellow",
        error: "red",
        fatal: "red",
    },
}

const logLevel = process.env.NODE_ENV === "development" ? "trace" : "error"

const logFormat = format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.splat(),
    format.printf((info) => {
        const { timestamp, level, message, ...meta } = info

        return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
        }`
    })
)

const consoleTransport = new transports.Console({
    level: logLevel,
    format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint()
    ),
})

const dailyRotateFile = new DailyRotateFile({
    level: logLevel,
    filename: logDir + "/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    handleExceptions: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: logFormat,
})

addColors(config.colors)

const myLogger = createLogger({
    transports: [consoleTransport, dailyRotateFile],
    levels: config.levels,
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,
})

class Logger {
    private logger: WinstonLogger

    constructor() {
        this.logger = myLogger
    }

    trace(msg: any, meta?: any) {
        this.logger.log("trace", msg, meta)
    }

    debug(msg: any, meta?: any) {
        this.logger.debug(msg, meta)
    }

    info(msg: any, meta?: any) {
        this.logger.info(msg, meta)
    }

    warn(msg: any, meta?: any) {
        this.logger.warn(msg, meta)
    }

    error(msg: any, meta?: any) {
        this.logger.error(msg, meta)
    }

    fatal(msg: any, meta?: any) {
        this.logger.log("fatal", msg, meta)
    }
}

export const logger = new Logger()
