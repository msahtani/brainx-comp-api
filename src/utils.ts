import * as crypto from 'crypto'
import env from "dotenv"



const MIN = 10

export function generateId(): string {
    env.config()
    const ID_LENGTH = parseInt(process.env.ID_LENGTH!)
    
    return crypto.getRandomValues(new Uint8Array(ID_LENGTH))
        .reduce(
            (result, byte) => result += byte.toString(16), ""
        )
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