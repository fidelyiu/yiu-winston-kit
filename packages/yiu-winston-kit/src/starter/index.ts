import { format, Format } from 'logform'
import { YiuLogger } from '../logger'
import { transport, createLogger, LoggerOptions, transports } from 'winston'
import { PrintfYiu } from '../printf/printf.yiu'
import { errStack } from '../format/format.err.stack'

export type YiuLoggerStarterOpt = Partial<
    Pick<LoggerOptions, 'silent' | 'level' | 'exitOnError' | 'defaultMeta'> & {
        filename: string
        console: boolean
        file: boolean
    }
>

const baseOpt: YiuLoggerStarterOpt = {
    level: 'error',
    exitOnError: false,
    filename: 'main.log',
    console: true,
    file: true,
}
export function yiuLoggerStater(opt?: YiuLoggerStarterOpt): YiuLogger {
    const options = Object.assign({}, baseOpt, opt)
    const commonFormat: Format[] = [
        format.timestamp(),
        format.ms(),
        format.splat(),
        format.metadata({
            fillExcept: [
                'timestamp',
                'level',
                'context',
                'message',
                'ms',
                'splat',
                'error',
            ],
        }),
    ]
    const transportsArr: Array<transport> = []
    if (options.console) {
        const printfYiu = new PrintfYiu()
        transportsArr.push(
            new transports.Console({
                format: format.combine(...commonFormat, printfYiu.printf()),
            })
        )
    }

    if (options.file) {
        transportsArr.push(
            new transports.File({
                format: format.combine(
                    ...commonFormat,
                    errStack(),
                    format.json()
                ),
                filename: options.filename,
            })
        )
    }

    return new YiuLogger(
        createLogger({
            level: options.level,
            transports: transportsArr,
        })
    )
}
