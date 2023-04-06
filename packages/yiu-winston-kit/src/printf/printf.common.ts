export function getColorStr(context: string, styleStr?: string): string {
    if (!styleStr) return context
    return `\u001b[${styleStr}m${context}\u001b[39m`
}
