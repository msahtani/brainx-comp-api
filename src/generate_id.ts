import * as crypto from 'crypto'

export function generateId(bytes: number = 24): string {
    
    let result = ""
    crypto.getRandomValues(new Uint8Array(bytes))
        .forEach(
            byte => result += byte.toString(16)
        )
    return result
}