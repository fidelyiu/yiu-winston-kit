import { FormatWrap, TransformableInfo, format } from 'logform'

export const errStack: FormatWrap = format((info: TransformableInfo) => {
    if (!info.error || !(info.error instanceof Error)) return info
    info.error = info.error.stack
    return info
})
