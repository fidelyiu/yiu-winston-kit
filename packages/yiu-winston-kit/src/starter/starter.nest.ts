import { YiuLogger } from '../logger'
import { PrintfNest } from '../printf/printf.nest'
import { LoggerFactory, LoggerFactoryOpt } from './starter.factory'

export function nestLoggerStater(opt?: LoggerFactoryOpt): YiuLogger {
    const printfNest = new PrintfNest()
    const loggerFactory = new LoggerFactory()
    return loggerFactory.build(printfNest.printf(), opt)
}
