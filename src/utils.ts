import * as crypto from 'crypto'
import env from "dotenv"



const MIN = 10


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

console.log(
    crypto.randomUUID()
)