import { TransformableInfo } from 'logform'
import { Format, format } from 'logform'
import { getColorStr } from './printf.common'

export class PrintfYiu {
    appName = 'winston'
    pid = `${process.pid}`.padEnd(5)
    subTextColor: string = '38;5;240'
    pidColor: string = '38;5;54'
    errorColor: string = '38;5;160'
    levelColorError: string = '38;5;160'
    levelColorWarn: string = '38;5;130'
    levelColorInfo: string = '38;5;32'
    levelColorHttp: string = '38;5;12'
    levelColorVerbose: string = '38;5;180'
    levelColorDebug: string = '38;5;220'
    levelColorSilly: string = '38;5;140'
    levelColorUnknown: string = '38;5;110'

    getTimestampStr(info: TransformableInfo): string {
        let result = '????-??-??T??:??:??.???Z'
        const timestamp = info.timestamp as number
        if (!timestamp) return result
        try {
            result = new Date(timestamp).toISOString()
        } catch {}
        return getColorStr(result, this.subTextColor)
    }

    getLevelStr(info: TransformableInfo): string {
        const { level } = info
        let result = ''
        const padLen = 7
        switch (level) {
            case 'error': {
                result = 'ERROR'.padEnd(padLen)
                result = getColorStr(result, this.levelColorError)
                break
            }
            case 'warn': {
                result = 'WARN'.padEnd(padLen)
                result = getColorStr(result, this.levelColorWarn)
                break
            }
            case 'info': {
                result = 'INFO'.padEnd(padLen)
                result = getColorStr(result, this.levelColorInfo)
                break
            }
            case 'http': {
                result = 'HTTP'.padEnd(padLen)
                result = getColorStr(result, this.levelColorHttp)
                break
            }
            case 'verbose': {
                result = 'VERBOSE'.padEnd(padLen)
                result = getColorStr(result, this.levelColorVerbose)
                break
            }
            case 'debug': {
                result = 'DEBUG'.padEnd(padLen)
                result = getColorStr(result, this.levelColorDebug)
                break
            }
            case 'silly': {
                result = 'SILLY'.padEnd(padLen)
                result = getColorStr(result, this.levelColorSilly)
                break
            }
            default: {
                result = 'UNKNOWN'.padEnd(padLen)
                result = getColorStr(result, this.levelColorUnknown)
                break
            }
        }
        return result
    }

    getPidStr(): string {
        return getColorStr(this.pid, this.pidColor)
    }

    getContextStr(info: TransformableInfo): string {
        let result = info.context || this.appName
        result = result.padStart(20)
        result = `--- [${result}]`
        result = getColorStr(result, this.subTextColor)
        return result
    }

    getColonStr(): string {
        return getColorStr(':', this.subTextColor)
    }

    getMetaStr(info: TransformableInfo): string {
        let { metadata } = info
        let result = ''
        try {
            result = JSON.stringify(metadata)
            if (result === '{}') return ''
        } catch (error) {}
        return getColorStr(result, this.subTextColor)
    }

    getMsStr(info: TransformableInfo): string {
        const ms = info.ms as string
        if (!ms) return ''
        return getColorStr(ms, this.subTextColor)
    }

    getErrorStr(info: TransformableInfo): string {
        const error = info.error as string | Error | any
        let result = ''
        if (!error) return result
        if (typeof error === 'string' || error instanceof String) {
            result = `${error}`
        } else if (error instanceof Error) {
            result = `${error.stack}`
        } else {
            result = `${error}`
        }
        if (!result) return ''
        return getColorStr(result, this.errorColor)
    }

    printf(): Format {
        return format.printf((info: TransformableInfo) => {
            const timeStr = this.getTimestampStr(info)
            const levelStr = this.getLevelStr(info)
            const pidStr = this.getPidStr()
            const contextStr = this.getContextStr(info)
            const colonStr = this.getColonStr()
            let result = `${timeStr} ${levelStr} ${pidStr} ${contextStr} ${colonStr} ${info.message}`
            const mateStr = this.getMetaStr(info)
            if (mateStr) result += ` ${mateStr}`
            const msStr = this.getMsStr(info)
            if (msStr) result += ` ${msStr}`
            const errorStr = this.getErrorStr(info)
            if (errorStr) result += `\n${errorStr}`
            return result
        })
    }
}
