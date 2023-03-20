import * as crypto from 'crypto'

export function generateId(bytes: number = 24): string {
    let result = "";
    // Can't use map as it returns another Uint8Array instead of array
    // of strings.
    for (let byte of crypto.getRandomValues(new Uint8Array(bytes))) {
        result += byte.toString(16);
    }
    return result;
}