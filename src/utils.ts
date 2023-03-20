import * as crypto from 'crypto'

const MIN = 10

export function generateId(bytes: number = 24): string {
    
    let result = ""
    crypto.getRandomValues(new Uint8Array(bytes))
        .forEach(
            byte => result += byte.toString(16)
        )
    return result
}

export function checkEmail(email: string): boolean{
    const pattern = /[a-zA-Z](\w|\.)+@\w{3,}\.\w{2,}/gi
    return pattern.test(email)
}

export function checkPhone(phone: string){
    const pattern = /(0|\+212)(6|7)\d{8}/gi
    return pattern.test(phone)
}

export function checkMessage(message: string){
    return message.length >= MIN
}