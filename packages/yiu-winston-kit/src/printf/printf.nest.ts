import { Format, TransformableInfo, format } from 'logform'
import { getColorStr } from './printf.common'

export class PrintfNest {
    appName = 'Nest'
    pid = `${process.pid}`.padEnd(6)
    boldStyle: string = '1'
    redColor: string = '31'
    greenColor: string = '32'
    yellowColor: string = '33'
    magentaBrightColor: string = '95'
    cyanBrightColor: string = '96'
    levelColorMap: Record<string, string> = {
        error: this.redColor,
        info: this.greenColor,
        warn: this.yellowColor,
        debug: this.magentaBrightColor,
        verbose: this.cyanBrightColor,
    }

    getAppName(info: TransformableInfo): string {
        return getColorStr(`[${this.appName}]`, this.levelColorMap[info.level])
    }

    getPidStr(info: TransformableInfo): string {
        return getColorStr(this.pid, this.levelColorMap[info.level])
    }

    getBarStr(info: TransformableInfo): string {
        return getColorStr('-', this.levelColorMap[info.level])
    }

    getTimestampStr(info: TransformableInfo): string {
        let result = '????-??-?? ??:??:??'
        const timestamp = info.timestamp as number | string
        if (!timestamp) return result
        try {
            if (timestamp === new Date(timestamp).toISOString()) {
                result = new Date(timestamp).toLocaleString()
            } else {
                result = `${timestamp}`
            }
        } catch (error) {}
        return result
    }

    getLevelStr(info: TransformableInfo): string {
        const { level } = info
        let result = ''
        const padLen = 7
        const colorStr = this.levelColorMap[info.level]
        switch (level) {
            case 'error': {
                result = 'ERROR'.padStart(padLen)
                break
            }
            case 'warn': {
                result = 'WARN'.padStart(padLen)
                break
            }
            case 'info': {
                result = 'LOG'.padStart(padLen)
                break
            }
            case 'http': {
                result = 'HTTP'.padStart(padLen)
                break
            }
            case 'verbose': {
                result = 'VERBOSE'.padStart(padLen)
                break
            }
            case 'debug': {
                result = 'DEBUG'.padStart(padLen)
                break
            }
            case 'silly': {
                result = 'SILLY'.padStart(padLen)
                break
            }
            default: {
                result = 'UNKNOWN'.padStart(padLen)
                break
            }
        }
        result = getColorStr(result, colorStr)
        return result
    }

    getContextStr(info: TransformableInfo): string {
        return getColorStr(
            `[${info.context || this.appName}]`,
            this.yellowColor
        )
    }

    getMessage(info: TransformableInfo): string {
        return getColorStr(info.message, this.levelColorMap[info.level])
    }

    getMetaStr(info: TransformableInfo): string {
        let { metadata } = info
        let result = ''
        try {
            result = JSON.stringify(metadata)
            if (result === '{}') return ''
        } catch (error) {}
        return getColorStr(result, this.levelColorMap[info.level])
    }

    getMsStr(info: TransformableInfo): string {
        const ms = info.ms as string
        if (!ms) return ''
        return getColorStr(ms, this.yellowColor)
    }

    printf(): Format {
        return format.printf((info: TransformableInfo) => {
            const appName = this.getAppName(info)
            const pidStr = this.getPidStr(info)
            const barStr = this.getBarStr(info)
            const timeStr = this.getTimestampStr(info)
            const levelStr = this.getLevelStr(info)
            const contextStr = this.getContextStr(info)
            const messageStr = this.getMessage(info)
            let result = `${appName} ${pidStr} ${barStr} ${timeStr} ${levelStr} ${contextStr} ${messageStr}`
            const mateStr = this.getMetaStr(info)
            if (mateStr) result += ` ${mateStr}`
            const msStr = this.getMsStr(info)
            if (msStr) result += ` ${msStr}`
            return result
        })
    }
}
