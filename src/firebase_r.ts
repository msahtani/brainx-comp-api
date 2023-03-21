import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import env from "dotenv"

env.config()

const app = initializeApp({
    apiKey:            process.env.F_API_KEY,
    authDomain:        process.env.F_AUTH_DOMAIN,
    projectId:         process.env.F_PROJECT_ID,
    storageBucket:     process.env.F_STORAGE_BUCKET,
    messagingSenderId: process.env.F_MESSAGING_SENDER,
    appId:             process.env.F_APP_ID,
    measurementId:     process.env.F_MEASUREMENT_ID,
})

export const db = getFirestore(app)
