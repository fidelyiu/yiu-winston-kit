import { Format, FormatWrap, format } from 'logform'
import { LoggerOptions, createLogger, transport, transports } from 'winston'
import { YiuLogger } from '../logger'
import { errStack } from '../format/format.err.stack'

export type LoggerFactoryOpt = Partial<
    Pick<LoggerOptions, 'silent' | 'level' | 'exitOnError' | 'defaultMeta'> & {
        filename: string
        console: boolean
        file: boolean
    }
>

export class LoggerFactory {
    private commonFormat: Format[] = [
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

    private baseOpt: LoggerFactoryOpt = {
        level: 'error',
        exitOnError: false,
        filename: 'app.log',
        console: true,
        file: true,
    }

    private buildLogConfig(config?: LoggerFactoryOpt): LoggerFactoryOpt {
        return Object.assign({}, this.baseOpt, config)
    }

    build(consolePrintf: Format, config?: LoggerFactoryOpt): YiuLogger {
        const options = this.buildLogConfig(config)
        const transportsArr: Array<transport> = []
        if (options.console) {
            transportsArr.push(
                new transports.Console({
                    format: format.combine(...this.commonFormat, consolePrintf),
                })
            )
        }

        if (options.file) {
            transportsArr.push(
                new transports.File({
                    format: format.combine(
                        ...this.commonFormat,
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
                silent: options.silent,
                exitOnError: options.exitOnError,
                defaultMeta: options.defaultMeta,
                transports: transportsArr,
            })
        )
    }
}
