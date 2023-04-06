import { Logger } from 'winston'

export interface LogWrapBase {
    message: any
    context: string
    error?: any
    [key: string]: any
}

export interface LogWrap extends LogWrapBase {
    level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
}

export class YiuLogger {
    constructor(logger: Logger) {
        this.logger = logger
    }

    logger: Logger
    log(log: LogWrap): void {
        this.logger.log(log)
    }

    error(log: LogWrapBase): void {
        this.logger.log('error', log)
    }

    warn(log: LogWrapBase): void {
        this.logger.log('warn', log)
    }

    info(log: LogWrapBase): void {
        this.logger.log('info', log)
    }

    http(log: LogWrapBase): void {
        this.logger.log('http', log)
    }

    verbose(log: LogWrapBase): void {
        this.logger.log('verbose', log)
    }

    debug(log: LogWrapBase): void {
        this.logger.log('debug', log)
    }

    silly(log: LogWrapBase): void {
        this.logger.log('silly', log)
    }
}
