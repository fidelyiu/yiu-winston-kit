import { YiuLogger } from '../logger'
import { PrintfYiu } from '../printf/printf.yiu'
import { LoggerFactory, LoggerFactoryOpt } from './starter.factory'

export function yiuLoggerStater(opt?: LoggerFactoryOpt): YiuLogger {
    const printfYiu = new PrintfYiu()
    const loggerFactory = new LoggerFactory()
    return loggerFactory.build(printfYiu.printf(), opt)
}
